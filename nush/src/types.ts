/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface CaseStudyItem {
  id: string;
  brand: string;
  title: string;
  description: string;
  metrics: {
    value: string;
    label: string;
  }[];
  imageUrl: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  isSpecial?: boolean;
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  logoPlaceholder: string;
}

export interface TrustedBrand {
  name: string;
  id: string;
}

// Structured brand content
export const BRAND_INFO = {
  name: "NUSH",
  slogan: "Built like it’s ours. Made to remain yours.",
  descriptor: "Embedded commerce & growth team",
  descriptorPl: "Zintegrowany zespół e-commerce i wzrostu",
  contactEmail: "hello@nush.pl",
};

export const TRUSTED_BRANDS: TrustedBrand[] = [
  { name: "Nordly", id: "nordly" },
  { name: "Motivo", id: "motivo" },
  { name: "Plantwear", id: "plantwear" },
  { name: "Verto", id: "verto" },
  { name: "Komodo", id: "komodo" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "strategy",
    number: "01",
    title: "Strategia wzrostu",
    description: "Porządkujemy cele, ofertę, kanały i priorytety. Budujemy roadmapę opartą na danych i realnych możliwościach biznesu.",
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-commerce",
    description: "Projektujemy, rozwijamy i optymalizujemy sklepy oraz procesy zakupowe pod kątem konwersji, wydajności i skalowania.",
  },
  {
    id: "marketing",
    number: "03",
    title: "Performance marketing",
    description: "Prowadzimy kampanie nastawione na sprzedaż i wartościowe leady, a nie na puste zasięgi i wskaźniki próżności.",
  },
  {
    id: "analytics",
    number: "04",
    title: "Dane i analityka",
    description: "Łączymy dane z różnych źródeł, konfigurujemy pomiar i zamieniamy liczby w czytelne decyzje biznesowe.",
  },
  {
    id: "cro",
    number: "05",
    title: "Optymalizacja konwersji",
    description: "Usuwamy bariery na ścieżce klienta, testujemy rozwiązania i poprawiamy efektywność obecnego ruchu.",
  },
  {
    id: "automation",
    number: "06",
    title: "Automatyzacje i integracje",
    description: "Łączymy narzędzia, usprawniamy procesy i eliminujemy ręczne zadania, które niepotrzebnie zabierają czas zespołu.",
  },
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "cs-1",
    brand: "Plantwear",
    title: "Skalowanie e-commerce i automatyzacja operacji",
    description: "Przeprowadziliśmy kompleksowy audyt, uporządkowaliśmy analitykę i wdrożyliśmy zautomatyzowane procesy obsługi zamówień, co pozwoliło uwolnić zasoby zespołu i zoptymalizować koszty pozyskania klienta.",
    metrics: [
      { value: "+52%", label: "Wzrost przychodu" },
      { value: "2,1×", label: "Współczynnik konwersji" },
      { value: "3 mies.", label: "Do pierwszego przełomu" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "cs-2",
    brand: "Nordly",
    title: "Nowa architektura systemów sprzedaży i analityki",
    description: "Zbudowaliśmy stabilną architekturę danych integrującą system ERP, e-sklep oraz kanały performance marketingu. Zastąpiliśmy ręczne raportowanie dynamicznymi dashboardami decyzyjnymi.",
    metrics: [
      { value: "+38%", label: "Wyższa efektywność reklam" },
      { value: "-15h", label: "Pracy zespołu tygodniowo" },
      { value: "98%", label: "Utrzymania klientów" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "p1",
    number: "01",
    title: "Poznajemy",
    description: "Rozumiemy biznes, klientów, produkty, dane, ograniczenia i cele.",
  },
  {
    id: "p2",
    number: "02",
    title: "Porządkujemy",
    description: "Ustalamy priorytety, zakres, wskaźniki oraz roadmapę działań.",
  },
  {
    id: "p3",
    number: "03",
    title: "Budujemy",
    description: "Projektujemy, wdrażamy i łączymy potrzebne elementy systemu.",
  },
  {
    id: "p4",
    number: "04",
    title: "Skalujemy",
    description: "Wzmacniamy to, co działa, i usuwamy elementy ograniczające wzrost.",
  },
  {
    id: "p5",
    number: "05",
    title: "Przekazujemy",
    description: "Dokumentacja, konta, dane i wdrożone rozwiązania pozostają po stronie klienta.",
    isSpecial: true, // realization of "Made to remain yours"
  },
];

export const CORE_METRICS: MetricItem[] = [
  {
    id: "m1",
    value: "+38%",
    label: "Wzrost przychodu",
    description: "Średni wzrost u naszych stałych partnerów rok do roku.",
  },
  {
    id: "m2",
    value: "3,4×",
    label: "Zwrot z wydatków (ROAS)",
    description: "Utrzymywany z płatnych kanałów przy zwiększaniu skali.",
  },
  {
    id: "m3",
    value: "-12 h",
    label: "Mniej ręcznej pracy",
    description: "Tygodniowo zaoszczędzone u każdego klienta dzięki automatyzacji.",
  },
  {
    id: "m4",
    value: "98%",
    label: "Retention Rate",
    description: "Wskaźnik utrzymania klientów i zadowolenia ze współpracy.",
  },
];

export const TESTIMONIAL: TestimonialItem = {
  quote: "NUSH szybko przestał być dla nas zewnętrznym wykonawcą. Zespół przejął odpowiedzialność, uporządkował priorytety i zbudował rozwiązania, których sami nie bylibyśmy w stanie wdrożyć w takim tempie.",
  author: "Mateusz Zając",
  role: "CEO",
  company: "X-Gamer",
  logoPlaceholder: "X-GAMER",
};
