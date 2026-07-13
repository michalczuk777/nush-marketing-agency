import csv, io, sys
from datetime import datetime
from fastapi import FastAPI, File, Request, UploadFile
from fastapi.responses import HTMLResponse, RedirectResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import func, select
from .config import ROOT, DATA_DIR
from .database import Base, engine, SessionLocal
from .models import Company, LeadQualification
from .services.importers import import_csv, import_xml
from .services.analyzer import analyze

app = FastAPI(title='NUSH Lead Research')
Base.metadata.create_all(engine)
app.mount('/static', StaticFiles(directory=ROOT / 'app' / 'static'), name='static')
templates = Jinja2Templates(directory=ROOT / 'app' / 'templates')

@app.get('/health')
def health():
    return {'status': 'ok', 'database': 'ok', 'worker': 'ok'}

@app.get('/system-info')
def system_info():
    db = SessionLocal()
    return {'version': '0.1.0', 'python': sys.version.split()[0], 'database': str(DATA_DIR / 'nush_leads.db'), 'companies': db.query(Company).count()}

@app.get('/', response_class=HTMLResponse)
def dashboard(request: Request):
    db = SessionLocal()
    data = {'companies': db.query(Company).count(), 'websites': db.query(Company).filter(Company.domain.is_not(None)).count(), 'analyzed': db.query(Company).join(Company.analysis).count(), 'qualified': db.query(LeadQualification).filter(LeadQualification.fit_score >= 70, LeadQualification.do_not_contact == False).count(), 'provinces': db.query(Company.province, func.count(Company.id)).group_by(Company.province).all()}
    return templates.TemplateResponse('dashboard.html', {'request': request, 'data': data})

@app.get('/companies', response_class=HTMLResponse)
def companies(request: Request, q: str = '', province: str = '', min_score: int = 0, page: int = 1):
    db = SessionLocal(); query = select(Company).outerjoin(LeadQualification).where(Company.company_name.ilike(f'%{q}%'))
    if province: query = query.where(Company.province == province)
    rows = db.scalars(query.where(func.coalesce(LeadQualification.fit_score, 0) >= min_score).order_by(Company.company_name).offset((page - 1) * 50).limit(50)).all()
    return templates.TemplateResponse('companies.html', {'request': request, 'companies': rows, 'q': q, 'province': province, 'min_score': min_score})

@app.get('/companies/{company_id}', response_class=HTMLResponse)
def company_detail(request: Request, company_id: int):
    db = SessionLocal(); return templates.TemplateResponse('company.html', {'request': request, 'company': db.get(Company, company_id)})

@app.post('/import')
def upload_import(file: UploadFile = File(...)):
    target = DATA_DIR / 'imports' / (file.filename or 'upload').replace('..', '_').replace('/', '_').replace('\\', '_'); target.write_bytes(file.file.read()); db = SessionLocal(); count = import_csv(db, target) if target.suffix.lower() == '.csv' else import_xml(db, target); return RedirectResponse('/companies', 303)

@app.post('/companies/{company_id}/analyze')
def analyze_company(company_id: int):
    db = SessionLocal(); analyze(db, db.get(Company, company_id)); return RedirectResponse(f'/companies/{company_id}', 303)

@app.post('/companies/{company_id}/dnc')
def dnc(company_id: int):
    db = SessionLocal(); company = db.get(Company, company_id); qualification = company.qualification or LeadQualification(company_id=company_id); qualification.do_not_contact = True; qualification.lead_status = 'DO_NOT_CONTACT'; qualification.do_not_contact_reason = 'MANUAL'; db.add(qualification); db.commit(); return RedirectResponse(f'/companies/{company_id}', 303)

@app.get('/export.csv')
def export_csv():
    db = SessionLocal(); output = io.StringIO(); writer = csv.writer(output, delimiter=';'); writer.writerow(['company_name', 'nip', 'province', 'city', 'website', 'domain', 'fit_score', 'lead_status', 'do_not_contact'])
    for company in db.scalars(select(Company).join(Company.qualification).where(LeadQualification.do_not_contact == False)).all(): writer.writerow([company.company_name, company.nip, company.province, company.city, company.website_original, company.domain, company.qualification.fit_score, company.qualification.lead_status, company.qualification.do_not_contact])
    return StreamingResponse(iter([('\ufeff' + output.getvalue()).encode('utf-8')]), media_type='text/csv', headers={'Content-Disposition': f'attachment; filename=nush_leads_{datetime.now():%Y-%m-%d}.csv'})
