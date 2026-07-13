import csv, io, json
from sqlalchemy import select
from ..models import ContentItem, ImportBatch
FIELDS = {'id':'external_id','external_id':'external_id','seria':'series','series':'series','header':'title','title':'title','podtytul':'subtitle','subtitle':'subtitle','caption':'caption_default','caption_default':'caption_default','caption_facebook':'caption_facebook','caption_instagram':'caption_instagram','link':'link','alt_text':'alt_text','notes':'notes'}
def import_content(session, raw: bytes, filename: str):
    text=raw.decode('utf-8-sig'); sample=text[:4096]; dialect=csv.Sniffer().sniff(sample, delimiters=',;\t'); rows=list(csv.DictReader(io.StringIO(text),dialect=dialect)); batch=ImportBatch(source_filename=filename,source_type='CSV',row_count=len(rows)); session.add(batch)
    for row in rows:
        mapped={FIELDS[k.strip().lower()]:v.strip() for k,v in row.items() if k and k.strip().lower() in FIELDS and v and v.strip()}; external=mapped.get('external_id')
        if not external: batch.error_count+=1; continue
        item=session.scalar(select(ContentItem).where(ContentItem.external_id==external))
        if not item: item=ContentItem(external_id=external); session.add(item); batch.new_count+=1
        else: batch.updated_count+=1
        for key,value in mapped.items(): setattr(item,key,value)
        item.content_status='READY' if item.caption_default or item.caption_facebook or item.caption_instagram else 'NEEDS_CAPTION'
    session.commit(); return batch
