from datetime import datetime, timezone
from fastapi import FastAPI, File, Form, Request, UploadFile
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import select
from .config import ROOT, settings
from .database import Base, engine, SessionLocal
from .models import ContentItem, MediaAsset, ScheduleEntry, PlatformPublication
from .services.csv_importer import import_content
from .services.media_importer import import_media
from .services.meta.publishers import publish_dry_run
app=FastAPI(title='NUSH Meta Publisher'); Base.metadata.create_all(engine)
app.mount('/static',StaticFiles(directory=ROOT/'app'/'static'),name='static'); templates=Jinja2Templates(directory=ROOT/'app'/'templates')
@app.get('/health')
def health(): return {'status':'ok','database':'ok','worker':'ok','dry_run':settings.publishing_dry_run}
@app.get('/system-info')
def system_info():
    db=SessionLocal(); return {'version':'0.1.0','api_version_configured':bool(settings.meta_graph_api_version),'dry_run':settings.publishing_dry_run,'content_items':db.query(ContentItem).count(),'assets':db.query(MediaAsset).count()}
@app.get('/',response_class=HTMLResponse)
def dashboard(request:Request):
    db=SessionLocal(); return templates.TemplateResponse('dashboard.html',{'request':request,'items':db.scalars(select(ContentItem).order_by(ContentItem.updated_at.desc()).limit(20)).all(),'dry_run':settings.publishing_dry_run})
@app.post('/import/content')
def content_import(file:UploadFile=File(...)):
    db=SessionLocal(); import_content(db,file.file.read(),file.filename or 'content.csv'); return RedirectResponse('/',303)
@app.post('/import/media')
def media_import(file:UploadFile=File(...)):
    db=SessionLocal(); import_media(db,file.file.read(),file.filename or 'media.zip'); return RedirectResponse('/',303)
@app.post('/schedule/{item_id}')
def schedule(item_id:int, scheduled_at:str=Form(...), facebook:bool=Form(False), instagram:bool=Form(False)):
    local_time=datetime.fromisoformat(scheduled_at).replace(tzinfo=__import__('zoneinfo').ZoneInfo(settings.app_timezone)); entry=ScheduleEntry(content_item_id=item_id,scheduled_at_utc=local_time.astimezone(timezone.utc).replace(tzinfo=None),target_facebook=facebook,target_instagram=instagram,schedule_status='SCHEDULED',approval_status='NOT_REVIEWED'); db.add(entry); db.flush()
    for platform,enabled in (('facebook',facebook),('instagram',instagram)):
        if enabled: db.add(PlatformPublication(schedule_entry_id=entry.id,platform=platform,idempotency_key=f'{entry.id}:{platform}',publication_status='PENDING'))
    db.commit(); return RedirectResponse('/',303)
@app.post('/approve/{entry_id}')
def approve(entry_id:int):
    db=SessionLocal(); entry=db.get(ScheduleEntry,entry_id); entry.approval_status='APPROVED'; db.commit(); return RedirectResponse('/',303)
@app.post('/dry-run/{entry_id}')
def dry_run(entry_id:int):
    db=SessionLocal(); entry=db.get(ScheduleEntry,entry_id); item=db.get(ContentItem,entry.content_item_id)
    for publication in entry.publications: publish_dry_run(publication,item)
    entry.schedule_status='COMPLETED'; db.commit(); return RedirectResponse('/',303)
