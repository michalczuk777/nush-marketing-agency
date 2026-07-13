from app.services.media_importer import _match
from app.services.meta.publishers import publish_dry_run
def test_carousel_matching_is_numeric():
    assert _match('001_02.png') == ('001', None, 2)
def test_dry_run_never_uses_remote_id():
    class Publication: publication_status='PENDING'; published_at=None; remote_post_id=None
    result=publish_dry_run(Publication(), None)
    assert result.publication_status == 'PUBLISHED'
    assert result.remote_post_id == 'DRY_RUN_ONLY'
