from app.services.domains import domain_for, normalize_url
from app.services.scoring import calculate_score
def test_domain_normalization():
    assert normalize_url('www.example.com/') == 'https://www.example.com'
    assert domain_for('https://www.example.com/path') == 'example.com'
def test_score_is_bounded():
    class C: status='ACTIVE'; phone='123'
    class A: ecommerce_detected=True; catalog_detected=True; product_url_estimate=600; title=None; meta_description=None; viewport_present=False
    class E: preferred=True; excluded=False
    score, reasons = calculate_score(C(), A(), [E()])
    assert 0 <= score <= 100 and reasons
