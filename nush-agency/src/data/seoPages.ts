export type SeoPageData = {
  title: string;
  category: 'E-COMMERCE I STRONY WWW' | 'AUTOMATYZACJE I API' | 'ANALITYKA I SEO';
  slug: string;
  metaDescription: string;
  problemText: string;
  solutionText: string;
};

export const seoPages: SeoPageData[] = [
  // KATEGORIA 1: E-COMMERCE I STRONY WWW
  {
    title: 'Tworzenie szybkich stron WWW',
    slug: 'tworzenie-szybkich-stron-www',
    category: 'E-COMMERCE I STRONY WWW',
    metaDescription: 'Budujemy błyskawiczne, konwertujące strony WWW. Dowiedz się, jak techniczna optymalizacja wpływa na sprzedaż.',
    problemText: 'Klienci uciekają z Twojej strony, zanim zdąży się załadować. Gotowe szablony i ciężkie wtyczki sprawiają, że witryna działa opornie na telefonach, a Google ucina Ci zasięgi organiczne z powodu słabych wyników Core Web Vitals.',
    solutionText: 'Przepisujemy architekturę na nowoczesne standardy. W NUSH tworzymy strony wolne od tzw. technologicznego długu. Eliminujemy zbędny kod, skracamy czas ładowania poniżej sekundy i gwarantujemy płynne doświadczenie, które wprost przekłada się na mniejszy wskaźnik odrzuceń i więcej zapytań ofertowych.'
  },
  {
    title: 'Optymalizacja sklepu e-commerce',
    slug: 'optymalizacja-sklepu-e-commerce',
    category: 'E-COMMERCE I STRONY WWW',
    metaDescription: 'Przyspieszamy WooCommerce, Shopify i PrestaShop. Skaluj sprzedaż bez technicznych awarii.',
    problemText: 'Twój e-commerce "zacina się" w najgorszych momentach – podczas kampanii reklamowych, Black Friday lub gdy masz wysyp klientów. Proces składania zamówienia jest skomplikowany, koszyk działa wolno, a Ty tracisz setki złotych dziennie na porzuconych transakcjach.',
    solutionText: 'Wdrażamy inżynieryjną optymalizację koszyka i ścieżki zakupowej. Odbudowujemy zapytania do bazy danych, czyścimy mechanizmy obliczania wysyłek i wdrażamy inteligentny cache. Zamieniamy powolny sklep w maszynę odporną na ogromny ruch.'
  },
  {
    title: 'Dlaczego strona wolno działa?',
    slug: 'dlaczego-strona-wolno-dziala',
    category: 'E-COMMERCE I STRONY WWW',
    metaDescription: 'Zdiagnozuj i napraw problemy z wydajnością strony. Darmowy audyt szybkości WWW i optymalizacja kodu.',
    problemText: 'Czujesz, że coś jest nie tak. Konkurencja wyświetla się wyżej w Google, a Twoja witryna mieli i mieli. Zastanawiasz się, czy to wina serwera, za dużych zdjęć, czy niechlujnego kodu napisanego przez poprzednią agencję.',
    solutionText: 'W NUSH nie wróżymy ze szklanej kuli. Przeprowadzamy bezlitosny audyt technologiczny, namierzamy dokładnie te skrypty lub błędy infrastrukturalne, które "duszą" stronę. Następnie wchodzimy do kodu i chirurgicznie je usuwamy.'
  },
  {
    title: 'Sklep na WooCommerce B2B',
    slug: 'sklep-na-woocommerce-b2b',
    category: 'E-COMMERCE I STRONY WWW',
    metaDescription: 'Zaawansowane wdrożenia WooCommerce dla B2B. Ukryte ceny, zintegrowane hurtownie i limity zamówień.',
    problemText: 'Tradycyjny sklep to za mało, gdy sprzedajesz do firm. Potrzebujesz ukrywania cen przed zalogowaniem, limitów kredytowych, skomplikowanych tabel progowych lub zaawansowanych cenników indywidualnych podpiętych pod system ERP.',
    solutionText: 'Konfigurujemy i wdrażamy dedykowaną logikę hurtową na WooCommerce. Łączymy systemy PIM/ERP z front-endem sklepu, automatyzując zniżki, koszty transportu gabarytowego i fakturowanie, tak aby portal obsługiwał klientów bez ręcznej ingerencji handlowca.'
  },
  {
    title: 'Migracja z WooCommerce na Shopify',
    slug: 'migracja-z-woocommerce-na-shopify',
    category: 'E-COMMERCE I STRONY WWW',
    metaDescription: 'Bezpieczna migracja e-commerce z WooCommerce na Shopify. Przenieś produkty, zamówienia i pozycje SEO.',
    problemText: 'Koszty utrzymania własnego serwera rosną, platforma ciągle się psuje przy aktualizacjach wtyczek, a Ty spędzasz więcej czasu na łataniu błędów administracyjnych niż na sprzedawaniu produktów. Chcesz bezbolesnego przejścia na Shopify.',
    solutionText: 'Przeprowadzamy migrację struktury z chirurgiczną precyzją. Przenosimy mapowanie URL (aby nie stracić SEO), eksportujemy bazę klientów i historii zamówień oraz odbudowujemy frontend. Szybkie odpięcie, szybki start na stabilnym środowisku SaaS.'
  },
  {
    title: 'Naprawa błędów na stronie',
    slug: 'naprawa-bledow-na-stronie',
    category: 'E-COMMERCE I STRONY WWW',
    metaDescription: 'Zlecenia programistyczne, poprawa błędów i rozwój stron WWW. Bierzemy odpowiedzialność za Twój kod.',
    problemText: 'Formularze kontaktowe nagle przestały działać. Elementy strony rozjeżdżają się na telefonach najnowszej generacji, albo wyświetla się groźny błąd serwera. Nie masz w firmie dewelopera, który "po prostu by to naprawił".',
    solutionText: 'Rozwiązujemy "pożary" technologiczne. Analizujemy błędy konsoli, naprawiamy konflikty skryptów, łatamy luki w zabezpieczeniach i aktualizujemy zależności. Jesteśmy technologicznym ramieniem ratunkowym Twojego zespołu.'
  },
  {
    title: 'Headless E-commerce (Next.js)',
    slug: 'headless-e-commerce-next-js',
    category: 'E-COMMERCE I STRONY WWW',
    metaDescription: 'Architektura Headless dla sklepów o dużym ruchu. Oddzielenie front-endu w React (Next.js) od backendu magazynowego.',
    problemText: 'Twój sklep urósł do skali, w której tradycyjny monolit jest zbyt ociężały. Potrzebujesz ekstremalnej wydajności dla użytkowników (React/Next.js) z zachowaniem potężnego zaplecza CMS/ERP (Shopify/Magento/Sylius) w tle.',
    solutionText: 'Wdrażamy rozwiązania Headless E-commerce. Budujemy zwinny front-end oparty o nowoczesne frameworki JavaScript łączący się przez API z Twoim systemem zarządzania. To najwyższa półka wydajności dla poważnych graczy rynkowych.'
  },
  {
    title: 'Optymalizacja konwersji (CRO)',
    slug: 'optymalizacja-konwersji-cro',
    category: 'E-COMMERCE I STRONY WWW',
    metaDescription: 'Przemień ruch w płacących klientów. Techniczna i UX/UI optymalizacja współczynnika konwersji sklepu.',
    problemText: 'Pompujesz tysiące złotych w kampanie Meta i Google Ads. Ruch jest ogromny, ale sprzedaż stoi w miejscu. Użytkownicy dodają produkty do koszyka, po czym "magicznie" rezygnują z zapłaty.',
    solutionText: 'Instalujemy śledzenie zachowań (heatmapy, nagrania sesji), diagnozujemy momenty porzucenia koszyka i optymalizujemy przyciski CTA, formularze adresowe i check-out. Często jedna techniczna zmiana podnosi sprzedaż o kilkadziesiąt procent w tym samym budżecie reklamowym.'
  },

  // KATEGORIA 2: AUTOMATYZACJE I API
  {
    title: 'Integracja BaseLinker z księgowością',
    slug: 'integracja-baselinker-z-ksiegowoscia',
    category: 'AUTOMATYZACJE I API',
    metaDescription: 'Połącz BaseLinker z Fakturownią, wFirmą, czy Subiektem. Pełna automatyzacja dokumentów sprzedaży.',
    problemText: 'Twój zespół spędza godziny na ręcznym przepisywaniu paragonów i faktur z BaseLinkera do programu księgowego. To żmudna praca niosąca ogromne ryzyko pomyłek podatkowych.',
    solutionText: 'Wykorzystujemy API i webhooki do postawienia mostu. Kiedy zamówienie zmienia status na "Wysłane", system sam generuje fakturę, przypisuje właściwe stawki VAT, wrzuca ją do księgowości i automatycznie wysyła PDF na e-mail klienta.'
  },
  {
    title: 'Automatyzacja obsługi zamówień',
    slug: 'automatyzacja-obslugi-zamowien',
    category: 'AUTOMATYZACJE I API',
    metaDescription: 'Automatyzacja procesów e-commerce. Generowanie etykiet, statusy SMS i delegacja do magazynu.',
    problemText: 'Gdy wpada kilkadziesiąt zamówień dziennie, gubisz się w paczkach. Pracownicy ręcznie generują etykiety kurierskie, kopiują numery śledzenia i odpisują na telefony klientów: "Kiedy moja paczka wyjdzie?".',
    solutionText: 'Budujemy lejki statusowe (Status Workflow). Integrujemy systemy ERP z kurierami. W momencie spakowania paczki przez magazyniera skanerem, system zamawia kuriera i generuje SMS do klienta z precyzyjnym linkiem śledzenia.'
  },
  {
    title: 'Zarządzanie stanami magazynowymi',
    slug: 'zarzadzanie-stanami-magazynowymi',
    category: 'AUTOMATYZACJE I API',
    metaDescription: 'Synchronizacja stanów w wielu kanałach (Allegro, Amazon, sklep, hurt). Unikaj braków towarowych.',
    problemText: 'Sprzedałeś produkt na Allegro, ale zapomniałeś zdjąć stan w sklepie starym i na Amazonie. Kolejny klient kupuje coś, czego już fizycznie nie ma na półce. Tracisz nerwy i musisz przepraszać zdezorientowanych kupujących.',
    solutionText: 'Wdrażamy "Single Source of Truth" (Jedno Źródło Prawdy). Niezależnie od tego, w którym z 5 kanałów padnie sprzedaż, nasze skrypty ułamki sekund później aktualizują stany magazynowe w pozostałych kanałach.'
  },
  {
    title: 'Pisanie skryptów (Python / Node)',
    slug: 'pisanie-skryptow-python-node',
    category: 'AUTOMATYZACJE I API',
    metaDescription: 'Autorskie skrypty i boty automatyzujące powtarzalne czynności w biznesie.',
    problemText: 'Masz specyficzny problem biznesowy (np. konieczność wyciągania cen od konkurencji, automatyczna zmiana plików produktowych od dostawców co noc, parsowanie gigantycznych plików XML), którego nie rozwiązuje żadna wtyczka ani gotowy system.',
    solutionText: 'Piszemy dedykowane aplikacje i skrypty serwerowe w środowiskach Python oraz Node.js. Odbieramy Twoje pliki, formatujemy dane o 3:00 w nocy na serwerze i podajemy rano na tacy w idealnym formacie dla Twojego zespołu.'
  },
  {
    title: 'Tworzenie i integracja API',
    slug: 'tworzenie-i-integracja-api',
    category: 'AUTOMATYZACJE I API',
    metaDescription: 'Budowa i spinanie REST API. Przesyłanie danych między zamkniętymi systemami.',
    problemText: 'Korzystasz z zewnętrznego narzędzia branżowego (np. logistyka medyczna, unikalny CRM nieruchomości), ale nie ma do niego wtyczki "podłącz to do mojej strony". Systemy nie rozmawiają ze sobą, a Ty tracisz elastyczność operacyjną.',
    solutionText: 'Jesteśmy architektami mostów API. Piszemy tzw. middleware, który pobiera obiekty JSON z jednego systemu, tłumaczy je na logikę biznesową i wrzuca metodą POST/PUT do systemu drugiego. Spinamy niekompatybilne środowiska w jedną sieć.'
  },
  {
    title: 'Make / Zapier Automatyzacje',
    slug: 'make-zapier-automatyzacje',
    category: 'AUTOMATYZACJE I API',
    metaDescription: 'Budowa złożonych lejków operacyjnych (nocode/lowcode) w Make.com (Integromat) i Zapier.',
    problemText: 'Twoje zadania marketingowe wymagają setek kliknięć. Po wpłynięciu leada z Facebooka musisz go wpisać w Excela, wysłać powiadomienie na firmowego Slacka i dodać gościa do listy e-mail w MailChimp.',
    solutionText: 'Wykorzystujemy narzędzia Low-Code (Make.com/Zapier), budując i testując wielowątkowe scenariusze oszczędzające po 40 godzin miesięcznie. Dodatkowo uzbrajamy je w filtry błędów, by nigdy nie przerwały ciągłości Twojego biznesu.'
  },
  {
    title: 'Automatyzacja cenników hurtowych',
    slug: 'automatyzacja-cennikow-hurtowych',
    category: 'AUTOMATYZACJE I API',
    metaDescription: 'Skrypty walidujące marże i synchronizujące masowe tabele cen u dostawców w dropshippingu.',
    problemText: 'Otrzymujesz od 10 dostawców pliki XML. Każdy z nich codziennie przesyła nowe ceny, często ucinając Twoją marżę poniżej rentowności. Aktualizacja cennika z uwzględnieniem narzutów zajmuje cały dzień.',
    solutionText: 'Budujemy agregator danych połączony z cennikami. Skrypt w locie czyta 10 plików, przelicza reguły warunkowe zysku i wypycha gotowy plik wyjściowy do Twojego e-commerce. Przewidywalność zysku w 100% zautomatyzowana.'
  },
  {
    title: 'Wdrożenie CRM dla B2B',
    slug: 'wdrozenie-crm-dla-b2b',
    category: 'AUTOMATYZACJE I API',
    metaDescription: 'Wdrożenia i techniczna konfiguracja HubSpot, Pipedrive i Salesforce. Zwiększ widoczność lejka handlowego.',
    problemText: 'Twój dział handlowy działa na "zeszytach", Excelu i w pamięci. Często zapominacie oddzwonić do ciepłego leada. Raportowanie jest czasochłonne, a manager nie widzi, dlaczego sprzedaż zwalnia.',
    solutionText: 'Wdrażamy system CRM dopasowany do realiów Twoich handlowców (np. Pipedrive). Mapujemy etapy sprzedaży (Deal Stages), dodajemy zautomatyzowane e-maile Follow-up, łączymy system z systemem telefonii VoIP i budujemy krystaliczne dashboardy.'
  },

  // KATEGORIA 3: ANALITYKA I SEO
  {
    title: 'Poprawa widoczności w Google',
    slug: 'poprawa-widocznosci-w-google',
    category: 'ANALITYKA I SEO',
    metaDescription: 'Dominacja wyników wyszukiwania (SEO). Konwertuj ruch z zapytań o konkretne problemy.',
    problemText: 'Jesteś na 3 stronie Google na frazy związane z Twoim biznesem. Płacisz agencji za linki, ale nie widać efektów. Klient, który jest gotowy kupić natychmiast – trafia do Twojej konkurencji, po prostu dlatego, że była wyżej.',
    solutionText: 'Realizujemy model Performance SEO (często zwany Programmatic SEO). Optymalizujemy techniczne fundamenty kodu i wprowadzamy architekturę zorientowaną wokół problemów Twoich klientów. Wyciągamy na światło dzienne ruch z kalorycznego "długiego ogona".'
  },
  {
    title: 'Wdrażanie GA4 i GTM',
    slug: 'wdrazanie-ga4-i-gtm',
    category: 'ANALITYKA I SEO',
    metaDescription: 'Konfiguracja śledzenia zdarzeń, Google Analytics 4, Tag Manager oraz Server-Side tracking.',
    problemText: 'Google Analytics pokazuje, że "ktoś był na stronie", ale nie wiesz skąd dokładnie przychodzą najbardziej rentowni kupcy. Gubisz śledzenie przy płatnościach ratalnych i nie masz zliczonego wskaźnika konwersji ze swoich reklam.',
    solutionText: 'Budujemy infrastrukturę danych Data Layer. Skrupulatnie mapujemy zdarzenia (od dodania do koszyka po zapis do newslettera) i spinamy je w tagach GTM. Dostajesz panel, na którym dokładnie widzisz, że "Złotówka włożona w tę reklamę przyniosła 4 złote wczoraj".'
  },
  {
    title: 'Techniczne Audyty SEO',
    slug: 'techniczne-audyty-seo',
    category: 'ANALITYKA I SEO',
    metaDescription: 'Prześwietlamy kod witryny, nagłówki canonical, mapy serwisu i indeksację by usunąć filtry wyszukiwarek.',
    problemText: 'Liczba wizyt na stronie z miesiąca na miesiąc spada po dziwnych zmianach u dostawcy hostingu. Chcesz zmienić lub przenieść witrynę, ale nie wiesz jak to zrobić, żeby nie stracić dotychczasowego ruchu wypracowywanego latami.',
    solutionText: 'Zaglądamy głęboko pod maskę. Analizujemy błędy 404, zapętlenia przekierowań (Redirect Loops), błędne linkowania wewnętrzne i puste strony (Thin Content). Przygotowujemy inżynieryjną, punktową listę działań naprawczych ratujących ruch.'
  },
  {
    title: 'Programmatic SEO',
    slug: 'programmatic-seo',
    category: 'ANALITYKA I SEO',
    metaDescription: 'Skalowalne generowanie setek podstron zoptymalizowanych pod unikalne kombinacje zapytań lokalnych lub usługowych.',
    problemText: 'Twoja firma świadczy usługi lub dowozi towar na ogromną skalę w wielu miastach i branżach. Jednak tworzenie podstron "Księgowość dla mechaników w Krakowie" ręcznie, jedna po drugiej, zajęłoby Twojemu zespołowi lata.',
    solutionText: 'Wdrażamy potęgę pSEO. Łączymy kod witryny z zewnętrznymi bazami danych (np. Airtable), tworząc systemy, które generują automatycznie setki przemyślanych, bezpiecznych architektonicznie stron. Zgarniasz mikrozapytania, które sumują się w potężny kanał darmowych wejść.'
  },
  {
    title: 'Naprawa Google Search Console',
    slug: 'naprawa-google-search-console',
    category: 'ANALITYKA I SEO',
    metaDescription: 'Usuwanie błędów "Strona zawiera błędy przekierowań", Core Web Vitals i wykluczeń indeksowania.',
    problemText: 'Otrzymujesz maile od Google, że "Strony nie zindeksowano", "Wykryto problem z czytelnością na urządzeniach mobilnych", "Błąd struktury Schema.org" – i ignorujesz to, zrzucając winę na wadliwe powiadomienia systemu.',
    solutionText: 'Oczyszczamy profil witryny. Badamy raporty z Google Search Console i usuwamy techniczne usterki, takie jak wstrzykiwane przez złośliwy kod linki czy błędnie zakodowane menu mobilne. Odzyskujemy autorytet Twojej domeny w oczach silnika wyszukiwarki.'
  },
  {
    title: 'Integracja Consent Mode (Cookies)',
    slug: 'integracja-consent-mode-cookies',
    category: 'ANALITYKA I SEO',
    metaDescription: 'Wdrożenie trybu zgody Google v2 (Consent Mode) zapewniające legalne śledzenie bez utraty danych AI.',
    problemText: 'Unia Europejska grozi karami, a znikające z rynku "ciasteczka" sprawiły, że Twoje kampanie remarketingowe przestały dowozić konwersje. Boisz się instalacji bannerów, które usuną 50% zebranych danych analitycznych.',
    solutionText: 'Wdrażamy w pełni legalny standard Google Consent Mode v2. Chronimy prywatność użytkowników bez drastycznego ucinania danych dla systemów maszynowego uczenia Google Ads, wykorzystując tzw. modelowanie konwersji pings.'
  },
  {
    title: 'Pulpity analityczne w Looker Studio',
    slug: 'pulpity-analityczne-looker-studio',
    category: 'ANALITYKA I SEO',
    metaDescription: 'Zbuduj jednolity panel łączący zyski z Google Ads, Facebook Ads i wewnętrznych CRM (BI).',
    problemText: 'Rozliczasz się z 3 agencjami reklamowymi. Każda raportuje ogromne zyski ze "swojego" kanału w swoich tabelkach, ale kiedy patrzysz na stan konta firmowego, kwoty się absolutnie nie sumują (tzw. konflikt atrybucji).',
    solutionText: 'Stawiamy bezlitosne dashboardy Data Studio (Looker). Wyciągamy po API realne wydatki i kliknięcia, zestawiamy to z rzeczywistą sprzedażą w CRM i budujemy ekran, który zarząd firmy ma przed oczami na co dzień, widząc na bieżąco faktyczny ROMI (Zwrot z inwestycji).'
  }
];
