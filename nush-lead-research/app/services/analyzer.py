import json, re, time
from urllib.parse import urljoin
import httpx
from bs4 import BeautifulSoup
from .domains import is_safe_host
from .scoring import calculate_score
from ..models import WebsiteAnalysis, EmailAddress, LeadQualification
EMAIL_RE = re.compile(r'[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}', re.I)
def analyze(session, company):
    if not company.website_normalized or not company.domain or not is_safe_host(company.domain): return None
    started = time.perf_counter(); headers = {'User-Agent': 'NUSHLeadResearch/1.0 (local business research tool)'}
    try:
        with httpx.Client(follow_redirects=True, timeout=15, headers=headers) as client: response = client.get(company.website_normalized)
        soup = BeautifulSoup(response.text[:5_000_000], 'html.parser'); text = soup.get_text(' ', strip=True)
        title = soup.title.get_text(strip=True) if soup.title else None; meta = soup.find('meta', attrs={'name': 'description'}); viewport = soup.find('meta', attrs={'name': 'viewport'}) is not None
        links = [urljoin(str(response.url), a.get('href')) for a in soup.select('a[href]')]; emails = set(EMAIL_RE.findall(text)) | {href[7:] for href in links if href.lower().startswith('mailto:')}
        for email in emails:
            role = email.split('@')[0].lower(); excluded = role in {'noreply','no-reply','rodo','iod','dpo','privacy','billing','faktury','jobs'}; kind = 'ROLE' if role in {'kontakt','biuro','office','hello','sales','sprzedaz','marketing','ecommerce','support'} else 'UNKNOWN'
            if not session.query(EmailAddress).filter_by(company_id=company.id, email=email.lower()).first(): session.add(EmailAddress(company_id=company.id, email=email, email_type='EXCLUDED' if excluded else kind, email_role=role, source_url=str(response.url), source_method='html', excluded=excluded, preferred=not excluded and kind == 'ROLE'))
        platform = next((name for name, signal in {'WooCommerce':'woocommerce','Shopify':'shopify','WordPress':'wp-content','PrestaShop':'prestashop','Shoper':'shoper'}.items() if signal in response.text.lower()), 'custom / unknown')
        ecommerce = any(key in text.lower() for key in ('koszyk','cart','checkout','dodaj do koszyka','add to cart')) or soup.find('script', string=re.compile('Product')) is not None
        catalog = ecommerce or bool(soup.select('[itemtype*="Product"], .product, .products'))
        analysis = session.query(WebsiteAnalysis).filter_by(company_id=company.id).first() or WebsiteAnalysis(company_id=company.id); analysis.status='ANALYZED'; analysis.final_url=str(response.url); analysis.http_status=response.status_code; analysis.https_enabled=str(response.url).startswith('https'); analysis.title=title; analysis.meta_description=meta.get('content') if meta else None; analysis.viewport_present=viewport; analysis.platform=platform; analysis.ecommerce_detected=ecommerce; analysis.catalog_detected=catalog; analysis.product_url_estimate=len(soup.select('[itemtype*="Product"], .product')) or None; session.add(analysis); session.flush()
        score, reasons = calculate_score(company, analysis, list(company.emails)); qualification = company.qualification or LeadQualification(company_id=company.id); qualification.fit_score=score; qualification.score_reasons_json=json.dumps(reasons, ensure_ascii=False); qualification.reason_to_contact='; '.join(reasons); session.add(qualification); session.commit(); return round((time.perf_counter()-started)*1000)
    except Exception as exc:
        session.rollback(); analysis = session.query(WebsiteAnalysis).filter_by(company_id=company.id).first() or WebsiteAnalysis(company_id=company.id); analysis.status='FAILED'; session.add(analysis); session.commit(); return None
