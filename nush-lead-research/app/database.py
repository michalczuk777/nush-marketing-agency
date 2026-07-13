from sqlalchemy import create_engine, event
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from .config import settings
class Base(DeclarativeBase): pass
engine = create_engine(settings.database_url, connect_args={"check_same_thread": False})
@event.listens_for(engine, "connect")
def enable_wal(dbapi_connection, _):
    cursor = dbapi_connection.cursor(); cursor.execute("PRAGMA journal_mode=WAL"); cursor.close()
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)
