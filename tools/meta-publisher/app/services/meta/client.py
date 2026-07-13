import httpx
from ...config import settings
class MetaClient:
    def __init__(self, token=''): self.token=token
    def configured(self): return bool(settings.meta_graph_api_version and self.token)
    def get(self, path, params=None):
        if not self.configured(): raise RuntimeError('META_GRAPH_API_VERSION and token are required')
        url=f'https://graph.facebook.com/{settings.meta_graph_api_version}/{path.lstrip("/")}'; response=httpx.get(url,params={**(params or {}),'access_token':self.token},timeout=20); response.raise_for_status(); return response.json()
