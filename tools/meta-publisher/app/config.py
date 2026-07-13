from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / 'data'; DATA.mkdir(exist_ok=True)
class Settings(BaseSettings):
    app_env: str = 'local'; app_host: str = '0.0.0.0'; app_port: int = 8000; app_public_url: str = 'http://localhost:8000'; app_timezone: str = 'Europe/Warsaw'
    database_url: str = f'sqlite:///{DATA / "app.db"}'; token_encryption_key: str = ''
    meta_app_id: str = ''; meta_app_secret: str = ''; meta_graph_api_version: str = ''; meta_oauth_redirect_uri: str = 'http://localhost:8000/auth/meta/callback'
    media_storage_provider: str = 'local'; r2_account_id: str = ''; r2_access_key_id: str = ''; r2_secret_access_key: str = ''; r2_bucket_name: str = ''; r2_endpoint_url: str = ''; r2_public_base_url: str = ''; r2_region: str = 'auto'
    publishing_dry_run: bool = True; missed_job_grace_minutes: int = 180; meta_api_concurrency: int = 1; delete_remote_media_after_days: int = 14; max_upload_file_mb: int = 25
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')
settings = Settings()
