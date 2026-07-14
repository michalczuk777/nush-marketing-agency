export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  tags: string[];
  blocks: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'techniczne-seo-w-e-commerce',
    title: 'Techniczne SEO w e-commerce: jak uporządkować katalog produktów',
    description: 'Praktyczny model porządkowania katalogu, indeksowania i danych produktowych, który pomaga budować powtarzalny wzrost organiczny.',
    category: 'SEO techniczne', publishedAt: '2026-07-14', updatedAt: '2026-07-14', readTime: '8 min czytania',
    tags: ['e-commerce', 'SEO', 'katalog produktów'],
    blocks: [
      { type: 'paragraph', text: 'W e-commerce wzrost organiczny rzadko zaczyna się od napisania kolejnego tekstu na blogu. Zaczyna się od uporządkowania informacji o produktach, kategorii i intencji użytkownika. Jeśli wyszukiwarka nie rozumie struktury katalogu, nawet dobry asortyment będzie pracował poniżej swoich możliwości.' },
      { type: 'heading', text: 'Najpierw architektura, później skala' },
      { type: 'paragraph', text: 'Dobrze zaprojektowany katalog prowadzi użytkownika od szerokiej potrzeby do konkretnego produktu. Kategorie powinny odpowiadać na realne sposoby wyszukiwania, a filtry nie mogą bez kontroli tworzyć tysięcy niemal identycznych adresów URL.' },
      { type: 'list', items: ['zdefiniuj hierarchię kategorii i podkategorii', 'ustal, które kombinacje filtrów mają własny potencjał wyszukiwania', 'zadbaj o czytelne adresy URL bez parametrów śledzących', 'zaprojektuj linkowanie z kategorii do produktów i między powiązanymi kategoriami'] },
      { type: 'heading', text: 'Indeksowanie powinno być decyzją biznesową' },
      { type: 'paragraph', text: 'Nie każda strona wygenerowana przez sklep powinna trafić do indeksu. Warto rozdzielić strony, które mają pozyskiwać ruch, od widoków pomocniczych: wyników filtrowania, sortowania, koszyka czy porównań. To ogranicza duplikację i pozwala skupić sygnały na adresach, które mają znaczenie dla sprzedaży.' },
      { type: 'paragraph', text: 'W praktyce potrzebujesz spójnej polityki dla canonicali, mapy witryny, kodów odpowiedzi i przekierowań. Sam canonical nie naprawi błędnej architektury, ale dobrze wdrożony zestaw reguł chroni katalog przed chaosem przy kolejnych zmianach asortymentu.' },
      { type: 'heading', text: 'Dane produktowe, które pracują na widoczność' },
      { type: 'paragraph', text: 'Nazwy produktów, opisy, dostępność, cena i zdjęcia powinny być dostępne zarówno dla użytkownika, jak i w danych strukturalnych. Schema.org nie zastępuje dobrej strony, ale pomaga wyszukiwarce zinterpretować jej zawartość i może wzbogacić sposób prezentacji wyniku.' },
      { type: 'list', items: ['utrzymuj zgodność ceny i dostępności między stroną a danymi strukturalnymi', 'unikaj masowo powielonych opisów dla wariantów', 'dodaj breadcrumbs i informacje o organizacji', 'monitoruj błędy danych w narzędziach dla webmasterów'] },
      { type: 'heading', text: 'Jak mierzyć efekt porządkowania katalogu' },
      { type: 'paragraph', text: 'Nie patrz tylko na liczbę zaindeksowanych adresów. Lepszy zestaw to widoczność stron kategorii, kliknięcia z zapytań niebrandowych, liczba podstron generujących ruch oraz przejścia do kluczowych kroków sprzedaży. Takie dane pokazują, czy architektura pomaga biznesowi, a nie tylko robotom.' },
    ],
  },
  {
    slug: 'automatyzacja-sprzedazy-b2b',
    title: 'Automatyzacja sprzedaży B2B: od formularza do kwalifikowanego leada',
    description: 'Jak zaprojektować przepływ leadów B2B, który łączy formularze, dane, kwalifikację i pracę handlowca bez dokładania chaosu.',
    category: 'Automatyzacja sprzedaży', publishedAt: '2026-07-14', updatedAt: '2026-07-14', readTime: '7 min czytania',
    tags: ['B2B', 'lead generation', 'automatyzacja'],
    blocks: [
      { type: 'paragraph', text: 'Formularz kontaktowy jest dopiero początkiem procesu. W wielu firmach lead wpada do skrzynki, ktoś ręcznie przepisuje go do arkusza, a po kilku dniach trudno ustalić, skąd przyszedł i co wydarzyło się dalej. Automatyzacja sprzedaży B2B ma sens wtedy, gdy porządkuje ten przepływ od pierwszego sygnału do konkretnej decyzji.' },
      { type: 'heading', text: 'Zdefiniuj, co naprawdę oznacza dobry lead' },
      { type: 'paragraph', text: 'Zanim połączysz formularz z CRM-em, ustal kryteria kwalifikacji. Dla jednej firmy będzie to wielkość katalogu, dla innej potencjał zakupowy, region, termin wdrożenia albo używany system. Bez tej definicji automatyzacja tylko szybciej przesyła przypadkowe kontakty.' },
      { type: 'list', items: ['ustal minimalny zestaw danych potrzebnych do pierwszej rozmowy', 'rozróżnij zapytanie ofertowe, audyt i pytanie informacyjne', 'zdefiniuj priorytety oraz właściciela kolejnego kroku', 'zapisuj źródło i kampanię, ale zbieraj tylko dane potrzebne do celu'] },
      { type: 'heading', text: 'Jeden przepływ danych zamiast kilku skrzynek' },
      { type: 'paragraph', text: 'Dobre wdrożenie nie musi być rozbudowane. Formularz powinien przekazać dane do jednego miejsca, nadać zgłoszeniu status i uruchomić powiadomienie. Zespół musi widzieć historię kontaktu, termin odpowiedzi i następne zadanie bez szukania informacji w mailach, komunikatorze i arkuszu jednocześnie.' },
      { type: 'paragraph', text: 'Ważne jest też rozdzielenie automatycznych działań od decyzji człowieka. System może sprawdzić kompletność danych, przypisać tagi, wysłać potwierdzenie i utworzyć zadanie. Nie powinien udawać, że rozumie kontekst biznesowy lepiej niż handlowiec.' },
      { type: 'heading', text: 'Pomiar kończy się na jakości, nie na liczbie formularzy' },
      { type: 'paragraph', text: 'Liczba wysłanych formularzy jest prostym wskaźnikiem, ale nie odpowiada na pytanie, czy marketing dostarcza sprzedaży właściwe rozmowy. Warto śledzić przejście od źródła ruchu do kwalifikacji, spotkania, oferty i wygranej szansy.' },
      { type: 'list', items: ['czas od wysłania formularza do pierwszej odpowiedzi', 'odsetek leadów spełniających kryteria kwalifikacji', 'konwersja kwalifikowanych leadów do spotkań i ofert', 'wartość pipeline’u według źródła oraz kampanii'] },
      { type: 'heading', text: 'Automatyzuj dopiero po uporządkowaniu procesu' },
      { type: 'paragraph', text: 'Najlepszy pierwszy sprint nie zaczyna się od wyboru narzędzia. Zaczyna się od mapy procesu, pól, statusów i odpowiedzialności. Kiedy ten model jest jasny, integracja formularza, CRM-u i analityki staje się technicznym wdrożeniem, a nie kolejnym projektem bez właściciela.' },
    ],
  },
  {
    slug: 'analityka-marketingowa-bez-chaosu',
    title: 'Analityka marketingowa bez chaosu: co mierzyć, żeby podejmować lepsze decyzje',
    description: 'Model analityki, który łączy źródła ruchu, zachowanie użytkownika i wynik sprzedażowy w jeden użyteczny obraz.',
    category: 'Dane i analityka', publishedAt: '2026-07-14', updatedAt: '2026-07-14', readTime: '6 min czytania',
    tags: ['analityka', 'marketing', 'dane'],
    blocks: [
      { type: 'paragraph', text: 'Dane nie pomagają tylko dlatego, że jest ich dużo. Pomagają wtedy, gdy zespół potrafi na ich podstawie podjąć decyzję: zmienić kampanię, poprawić stronę, skrócić proces albo zatrzymać inwestycję w kanał, który nie dowozi jakości.' },
      { type: 'heading', text: 'Zacznij od pytań, nie od dashboardu' },
      { type: 'paragraph', text: 'Najpierw spisz decyzje, które firma podejmuje regularnie. Czy zwiększyć budżet? Które zapytania są wartościowe? Gdzie gubimy użytkowników? Który etap procesu wymaga poprawy? Dopiero potem dobierz metryki. Dashboard pełen wykresów bez właściciela i kontekstu szybko staje się dekoracją.' },
      { type: 'list', items: ['ustal jeden główny cel dla każdego kanału', 'zdefiniuj metryki jakości i metryki wolumenu', 'połącz dane marketingowe z etapem sprzedaży', 'opisz, kto i jak często podejmuje decyzję na podstawie raportu'] },
      { type: 'heading', text: 'Połącz źródło ruchu z wynikiem' },
      { type: 'paragraph', text: 'Sesja, kliknięcie czy wyświetlenie nie są wynikiem biznesowym. Są sygnałami po drodze. Sensowny pomiar powinien pozwolić prześledzić użytkownika od kanału i kampanii do działania na stronie, zgłoszenia, kwalifikacji i sprzedaży, z zachowaniem właściwych zgód i zasad prywatności.' },
      { type: 'paragraph', text: 'Nie zawsze da się przypisać sprzedaż do jednego źródła z pełną pewnością. Tym bardziej warto opisać model atrybucji, zakres danych i ograniczenia pomiaru. Jasne zastrzeżenie jest bardziej użyteczne niż pozorna precyzja.' },
      { type: 'heading', text: 'Trzy warstwy dobrego pomiaru' },
      { type: 'list', items: ['aktywność: ruch, widoczność, kliknięcia i zaangażowanie', 'intencja: przejścia do oferty, zapytania, pobrania i kontakt', 'wynik: kwalifikacja, szansa sprzedaży, przychód i marża'] },
      { type: 'heading', text: 'Raport ma prowadzić do działania' },
      { type: 'paragraph', text: 'W praktyce wystarczy kilka widoków: pozyskanie, zachowanie, konwersja i sprzedaż. Każdy powinien kończyć się listą obserwacji oraz decyzji do sprawdzenia. Taki rytm pozwala budować kulturę eksperymentu bez uzależnienia od ręcznego przeklejania danych przed każdym spotkaniem.' },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
