from datetime import datetime
from ...config import settings
def publish_dry_run(publication, content):
    publication.publication_status='PUBLISHED'; publication.published_at=datetime.utcnow(); publication.remote_post_id='DRY_RUN_ONLY'; return publication
def require_live_mode():
    if settings.publishing_dry_run: raise RuntimeError('Dry-run is enabled; live publication requires explicit PUBLISHING_DRY_RUN=false')
