# Monitoring widoczności NUSH w wyszukiwaniu

## Cel

Mierzymy widoczność marki w klasycznych wynikach wyszukiwania i w odpowiedziach systemów AI jako trend. Pojedyncza odpowiedź modelu nie jest samodzielnym dowodem wyniku.

## Zestaw pytań

Utrzymuj stały zestaw pytań w języku polskim, podzielony na:

- pytania o usługę i problem klienta
- pytania porównawcze i zakupowe
- pytania lokalne
- pytania, w których marka powinna być rozpoznana jako źródło lub wykonawca

Zapisuj datę, narzędzie, tryb wyszukiwania, lokalizację, pytanie, obecność marki, przywołane źródła i widocznych konkurentów. Nie zmieniaj pytań w trakcie serii bez oznaczenia nowej wersji.

## Klasyczny pomiar

- Google Search Console: zapytania, kliknięcia, wyświetlenia, CTR i średnia pozycja
- Bing Webmaster Tools: indeksowanie, zapytania i błędy crawlability
- analityka strony: landing page, źródło, kampania, rozpoczęcie kontaktu i wysłanie formularza

Interpretuj dane razem z sezonowością, zmianami oferty i zmianami technicznymi. UTM-y opisują źródło linku, ale nie wymagają osobnej bazy danych.

## Pomiar AI Search

Raz w miesiącu wykonaj ten sam zestaw pytań w wybranych narzędziach. Raportuj:

- udział odpowiedzi, w których marka jest wymieniona
- udział odpowiedzi ze źródłem prowadzącym do domeny
- liczbę i typy przywołanych stron
- widoczność konkurencji
- zmiany w czasie oraz istotne różnice między narzędziami

Wyniki są zależne od modelu, konta, lokalizacji, czasu i dostępnych źródeł. Nie porównuj bezpośrednio liczb z różnych narzędzi bez opisania metodologii.

## Zdarzenia analityczne

Panel strony wysyła zdarzenia tylko wtedy, gdy istnieje już `gtag` lub `dataLayer`. Bez konfiguracji analityki funkcja jest bezczynna.

- `geo_service_view` - otwarcie podstrony GEO
- `geo_cta_click` - kliknięcie CTA w module GEO
- `geo_contact_start` - przejście do formularza z modułu GEO
- `geo_contact_submit` - wysłanie formularza kontaktowego

Nie wysyłaj do analityki imienia, adresu e-mail, treści wiadomości ani innych danych osobowych.

## Rytm i odpowiedzialność

- po wdrożeniu: sprawdzenie techniczne i indeksowanie
- co tydzień: Search Console, Bing i błędy crawlability
- co miesiąc: zestaw pytań AI, źródła i konkurencja
- co kwartał: przegląd architektury treści, danych strukturalnych i priorytetów

Plik `llms.txt` nie jest częścią domyślnego wdrożenia. Najpierw utrzymujemy crawlable HTML, sitemapę, linkowanie i treści oparte na faktach.
