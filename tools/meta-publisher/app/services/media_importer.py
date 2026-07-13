import hashlib, io, json, zipfile
from pathlib import Path
from PIL import Image
from sqlalchemy import select
from ..config import DATA
from ..models import ContentItem, MediaAsset
def _match(name):
    stem=Path(name).stem; return stem.split('_')[0], ('instagram' if stem.endswith('_ig') else 'facebook' if stem.endswith('_fb') else None), int(stem.split('_')[1]) if '_' in stem and stem.split('_')[1].isdigit() else 1
def import_media(session, raw: bytes, filename: str):
    files={filename:raw}
    if filename.lower().endswith('.zip'):
        archive=zipfile.ZipFile(io.BytesIO(raw)); files={name:archive.read(name) for name in archive.namelist() if not name.endswith('/')}
    count=0
    for original,data in files.items():
        if Path(original).suffix.lower() not in ('.png','.jpg','.jpeg','.webp'): continue
        external,override,position=_match(original); item=session.scalar(select(ContentItem).where(ContentItem.external_id==external))
        if not item: continue
        target=DATA/'media'; target.mkdir(exist_ok=True); safe=Path(original).name; path=target/safe; path.write_bytes(data)
        try:
            with Image.open(io.BytesIO(data)) as image: width,height=image.size; mime=Image.MIME.get(image.format); status='VALID'; messages=[]
        except Exception as exc: width=height=None; mime=None; status='INVALID'; messages=[str(exc)]
        session.add(MediaAsset(content_item_id=item.id,platform_override=override,position=position,original_filename=safe,local_path=str(path),sha256=hashlib.sha256(data).hexdigest(),mime_type=mime,width=width,height=height,aspect_ratio=f'{width}:{height}' if width and height else None,file_size=len(data),validation_status=status,validation_messages_json=json.dumps(messages))) ; count+=1
    session.commit(); return count
