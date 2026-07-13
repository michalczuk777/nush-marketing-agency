# NUSH Meta Publisher

Izolowany, lokalny panel do importu treści i grafik, przygotowania harmonogramu oraz kontrolowanego publikowania na firmowej stronie Facebook i profesjonalnym koncie Instagram przez oficjalne API Meta. Landing NUSH nie jest przez ten projekt modyfikowany.

## Start

Wymagany Docker Desktop. Skopiuj `.env.example` do `.env`, wygeneruj klucz przez `python scripts/generate_encryption_key.py`, wpisz go do `TOKEN_ENCRYPTION_KEY`, a następnie uruchom:

```powershell
docker compose up --build
```

Panel: `http://localhost:8000`. Domyślnie `PUBLISHING_DRY_RUN=true`; prawdziwa publikacja nie jest wykonywana przez testy ani przez start bez jawnego przełączenia.

## CSV i grafiki

CSV może używać przecinka, średnika lub tabulatora. Minimalna kolumna to `id` albo `external_id`; opcjonalnie mapowane są `seria`, `header`, `podtytul`, `caption_facebook`, `caption_instagram`, `link` i `alt_text`. Grafiki importuj jako pojedyncze pliki lub ZIP. Nazwa `001.png` dopasowuje się do `external_id=001`, a `001_01.png` rozpoczyna karuzelę.

## Meta

Panel nie zgaduje wersji Graph API ani endpointów. Uzupełnij `META_GRAPH_API_VERSION` zgodnie z aktualną oficjalną dokumentacją Meta, App ID, App Secret i tokeny wyłącznie w `.env`. Nie commituj `.env`. Dla Instagrama potrzebny jest publiczny URL grafiki, dlatego do trybu live skonfiguruj adapter Cloudflare R2 przez zmienne `R2_*` i `R2_PUBLIC_BASE_URL`.

## Bezpieczeństwo i ograniczenia

Panel działa wyłącznie lokalnie, port jest publikowany na `127.0.0.1`, tokeny są projektowane do szyfrowania Fernet, a tryb dry-run jest domyślnie aktywny. Ta wersja obejmuje scaffold, import, matching, podstawowy harmonogram i dry-run. OAuth Meta, pełne publikatory Facebook/Instagram, R2, retry/idempotencja i App Review wymagają dalszego etapu oraz weryfikacji aktualnych wymagań Meta.
