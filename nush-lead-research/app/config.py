from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
class Settings(BaseSettings):
    database_url: str = f"sqlite:///{DATA_DIR / 'nush_leads.db'}"
    ceidg_api_enabled: bool = False
    ceidg_api_token: str = ""
    ceidg_api_base_url: str = ""
    crawler_timeout: int = 15
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
settings = Settings()
for path in (DATA_DIR, DATA_DIR / "imports", DATA_DIR / "exports", DATA_DIR / "logs", ROOT / "backups"):
    path.mkdir(parents=True, exist_ok=True)
