# Operacje

Przed planowaniem większej paczki sprawdź import, grafiki, timezone i dry-run. Komputer, Docker, web i worker muszą działać w chwili publikacji. Po restarcie sprawdź `/health` i logi. Nie przełączaj `PUBLISHING_DRY_RUN=false`, dopóki jeden rekord nie przejdzie ręcznego przeglądu.
