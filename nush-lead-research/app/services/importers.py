import csv, gzip, zipfile
from pathlib import Path
from lxml import etree
from sqlalchemy import select
from ..models import Company, LeadQualification
from .domains import domain_for, normalize_url
def _text(node, names):
    for name in names:
        found = node.find('.//' + name)
        if found is not None and found.text: return found.text.strip()
    return None
def _upsert(session, data, source_file):
    company = None
    for field in ('nip', 'regon'):
        if data.get(field): company = session.scalar(select(Company).where(getattr(Company, field) == data[field]));
        if company: break
    if not company and data.get('domain'): company = session.scalar(select(Company).where(Company.domain == data['domain']))
    if not company: company = Company(company_name=data.get('company_name') or 'Bez nazwy'); session.add(company)
    for key, value in data.items(): setattr(company, key, value)
    company.source_file = source_file; company.website_normalized = normalize_url(company.website_original); company.domain = domain_for(company.website_original)
    if not company.qualification: company.qualification = LeadQualification()
def import_csv(session, path: Path):
    count = 0
    with path.open(encoding='utf-8-sig', newline='') as stream:
        for row in csv.DictReader(stream): _upsert(session, {'company_name': row.get('company_name'), 'website_original': row.get('website'), 'province': row.get('province'), 'city': row.get('city'), 'nip': row.get('nip')}, path.name); count += 1
    session.commit(); return count
def import_xml(session, path: Path):
    raw = gzip.open(path, 'rb') if path.suffix == '.gz' else path.open('rb')
    if path.suffix == '.zip':
        archive = zipfile.ZipFile(path); raw = archive.open(next(name for name in archive.namelist() if name.lower().endswith('.xml')))
    count = 0
    for _, node in etree.iterparse(raw, events=('end',), recover=True):
        if etree.QName(node).localname.lower() in ('firma', 'company', 'wpis', 'entry'):
            _upsert(session, {'company_name': _text(node, ['Nazwa','CompanyName','company_name']), 'nip': _text(node, ['NIP','nip']), 'regon': _text(node, ['REGON','regon']), 'website_original': _text(node, ['AdresStronyInternetowej','Website','website']), 'province': _text(node, ['Wojewodztwo','Province','province']), 'city': _text(node, ['Miejscowosc','City','city']), 'pkd_main': _text(node, ['PKD','pkd_main'])}, path.name); count += 1; node.clear()
    raw.close(); session.commit(); return count
