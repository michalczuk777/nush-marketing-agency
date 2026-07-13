from urllib.parse import urlparse
import ipaddress, socket
def normalize_url(value: str | None) -> str | None:
    if not value: return None
    value = value.strip(); value = value if '://' in value else 'https://' + value
    parsed = urlparse(value)
    if parsed.scheme not in ('http', 'https') or not parsed.netloc: return None
    return parsed.geturl().rstrip('/')
def domain_for(value: str | None) -> str | None:
    url = normalize_url(value)
    return urlparse(url).hostname.lower().removeprefix('www.') if url else None
def is_safe_host(host: str) -> bool:
    try:
        for item in socket.getaddrinfo(host, None):
            address = ipaddress.ip_address(item[4][0])
            if address.is_private or address.is_loopback or address.is_link_local: return False
        return True
    except OSError: return False
