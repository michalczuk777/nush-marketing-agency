import time
from app.database import SessionLocal
from app.models import ScheduleEntry
from app.services.meta.publishers import publish_dry_run
from app.config import settings
while True:
    db=SessionLocal()
    if settings.publishing_dry_run:
        for entry in db.query(ScheduleEntry).filter(ScheduleEntry.schedule_status=='SCHEDULED', ScheduleEntry.approval_status=='APPROVED').all():
            for publication in entry.publications: publish_dry_run(publication,entry.content)
            entry.schedule_status='COMPLETED'
        db.commit()
    db.close(); time.sleep(10)
