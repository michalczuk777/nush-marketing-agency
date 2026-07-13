# NUSH Lead Research

Lokalna aplikacja FastAPI do importu publicznych rekordów CEIDG, filtrowania firm, ostrożnej analizy stron i przygotowania shortlisty leadów. Nie wysyła wiadomości i nie integruje systemów mailingowych.

## Uruchomienie przez Docker

Wymagany jest Docker Desktop. W Windows kliknij `start.cmd` albo uruchom `docker compose up --build -d`, a następnie otwórz `http://localhost:8000`. Zatrzymanie: `stop.cmd`, logi: `logs.cmd`, backup: `backup.cmd`, restart: `restart.cmd`. Dane są w `data/`, baza w `data/nush_leads.db`, importy w `data/imports`.

## PyCharm

W PyCharm wybierz `File > Open` i wskaż folder `nush-lead-research`. Otwórz terminal (`View > Tool Windows > Terminal`), wpisz `docker compose up --build` i przejdź do `http://localhost:8000`. Nie musisz konfigurować interpretera Python, bo aplikacja działa w kontenerze.

## Workflow

Pobierz ręcznie plik XML województwa z Hurtowni Danych CEIDG, otwórz dashboard i dodaj plik. MVP obsługuje XML, XML.GZ, ZIP zawierający XML oraz CSV z kolumnami `company_name,website,province,city,nip`. Import działa strumieniowo i aktualizuje rekordy po NIP, REGON lub domenie. Analiza działa tylko na publicznej stronie firmy, respektuje ochronę hostów prywatnych i nie wysyła e-maili. Eksport CSV ma UTF-8 BOM i separator średnik.

## Testy i ograniczenia

Uruchom `docker compose run --rm web pytest`. Worker jest prostym lokalnym procesem SQLite. Parser XML zależy od nazw pól w dostarczonym pliku, dlatego zacznij od małej próbki i sprawdź wyniki ręcznie. Adapter API CEIDG nie jest aktywny bez konfiguracji tokena.
