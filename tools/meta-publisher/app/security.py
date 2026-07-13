from cryptography.fernet import Fernet
from .config import settings
def _fernet():
    if not settings.token_encryption_key: raise RuntimeError('TOKEN_ENCRYPTION_KEY is required before saving Meta tokens')
    return Fernet(settings.token_encryption_key.encode())
def encrypt(value: str) -> str: return _fernet().encrypt(value.encode()).decode()
def decrypt(value: str) -> str: return _fernet().decrypt(value.encode()).decode()
