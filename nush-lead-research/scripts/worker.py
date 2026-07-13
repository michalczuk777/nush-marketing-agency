import time
from app.database import SessionLocal
from app.models import Company
from app.services.analyzer import analyze
while True:
    db = SessionLocal()
    for company in db.query(Company).filter(Company.domain.is_not(None)).limit(1).all():
        if not company.analysis or company.analysis.status in ('PENDING', 'FAILED'): analyze(db, company)
    db.close(); time.sleep(10)
