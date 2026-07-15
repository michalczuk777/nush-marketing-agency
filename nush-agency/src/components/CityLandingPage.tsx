import { ArrowRight, Check, MapPin } from 'lucide-react';
import BrandQuote from './BrandQuote';
import Footer from './Footer';
import LeadForm from './LeadForm';
import Navbar from './Navbar';
import Seo, { SITE_URL } from './Seo';
import type { CityPage } from '../data/cities';
import { getCityDescription, getCityHero, getCityTitle, getRelatedCities } from '../data/cities';

type CityLandingPageProps = {
  city: CityPage;
};

const services = [
  {
    name: 'E-commerce i katalog',
    description: 'Architektura sklepu, dane produktowe, feedy, integracje i procesy potrzebne do skalowania sprzedaży.',
  },
  {
    name: 'Marketing i konwersja',
    description: 'Kampanie oraz landing pages spięte z konkretną intencją, pomiarem i następnym krokiem użytkownika.',
  },
  {
    name: 'SEO techniczne',
    description: 'Indeksacja, struktura serwisu, kategorie, linkowanie i dane, które pozwalają rozwijać widoczność.',
  },
  {
    name: 'Analityka i automatyzacja',
    description: 'Jedna wersja danych, sprawny przepływ leadów, automatyczne raporty i mniej pracy kopiuj–wklej.',
  },
];

export default function CityLandingPage({ city }: CityLandingPageProps) {
  const relatedCities = getRelatedCities(city);
  const path = `/agencja-marketingowa/${city.slug}`;
  const title = getCityTitle(city);
  const description = getCityDescription(city);
  const hero = getCityHero(city);
  const faq = [
    {
      question: `Czy obsługujecie firmy z ${city.genitive} bez lokalnego biura?`,
      answer: `Tak. Współpracę z firmami z ${city.genitive} prowadzimy zdalnie. Nie udajemy fizycznej placówki w mieście — zapewniamy bezpośredni dostęp do zespołu wdrożeniowego.`,
    },
    {
      question: `Jakie problemy najczęściej rozwiązujecie dla firm z ${city.genitive}?`,
      answer: `Najczęściej zaczynamy od takich obszarów jak: ${city.priorities.join(', ')}. Dokładny priorytet wybieramy dopiero po diagnozie.`,
    },
    {
      question: `Jak wygląda współpraca z firmą z ${city.genitive}?`,
      answer:
        'Najpierw przeprowadzamy krótką diagnozę. Następnie wybieramy jedno wąskie gardło, ustalamy rezultat oraz zakres sprintu. Po wdrożeniu przekazujemy dostęp, dokumentację i ustalamy dalsze priorytety.',
    },
    {
      question: 'Czy NUSH wymaga długiej umowy?',
      answer:
        'Nie. Możemy zacząć od zamkniętego audytu albo sprintu wdrożeniowego. Stała współpraca ma sens dopiero wtedy, gdy obie strony widzą wartość dalszego rozwoju.',
    },
  ];

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: `${SITE_URL}${path}`,
      inLanguage: 'pl-PL',
      about: {
        '@type': 'Service',
        name: `Usługi marketingowe dla firm z ${city.genitive}`,
        areaServed: { '@type': 'City', name: city.name },
        provider: {
          '@type': 'Organization',
          name: 'NUSH',
          url: SITE_URL,
          email: 'kontakt@nush.pl',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'NUSH', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: `Agencja marketingowa ${city.name}`,
          item: `${SITE_URL}${path}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ];

  return (
    <div id="top" className="min-h-screen bg-[#050505] font-sans text-white">
      <Seo title={title} description={description} path={path} schema={schema} />
      <Navbar />

      <main className="pt-20">
        <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 md:px-10 md:py-28">
          <div className="pointer-events-none absolute inset-0 hero-grid opacity-35" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <nav aria-label="Okruszki" className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              <a href="/" className="transition-colors hover:text-neon">NUSH</a>
              <span className="mx-2">/</span>
              <span>Agencja marketingowa {city.name}</span>
            </nav>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">
                  [AGENCJA MARKETINGOWA / {city.name}]
                </p>
                <h1 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.96] tracking-tight md:text-7xl lg:text-8xl">
                  Agencja marketingowa
                  <br />
                  <span className="text-neon">{city.name}</span>
                </h1>
                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">{hero}</p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#kontakt"
                    className="inline-flex items-center justify-center gap-3 bg-neon px-6 py-4 text-sm font-black uppercase text-black transition-colors hover:bg-white"
                  >
                    Umów bezpłatną diagnozę
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                  <a
                    href="#zakres"
                    className="inline-flex items-center justify-center border border-white/20 px-6 py-4 text-sm font-black uppercase transition-colors hover:border-neon hover:text-neon"
                  >
                    Zobacz zakres
                  </a>
                </div>
              </div>

              <aside className="border border-white/10 bg-black/70 p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 shrink-0 text-neon" size={20} aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                      Dostępni dla firm w {city.locative}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      Pracujemy zdalnie i nie udajemy fizycznego biura w mieście. Dostajesz bezpośredni kontakt
                      z zespołem, jasny zakres i rozwiązania pozostające po Twojej stronie.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="zakres" className="border-b border-white/10 px-6 py-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">[01] ZAKRES</p>
                <h2 className="mt-5 text-4xl font-black uppercase leading-[1.05] md:text-6xl">
                  Nie sprzedajemy
                  <br />
                  <span className="text-neon">jednego kanału.</span>
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-relaxed text-white/65 lg:pt-10">
                Szukamy miejsca, w którym marketing, dane albo sprzedaż przestają się ze sobą łączyć.
                Następnie wdrażamy rozwiązanie możliwe do zmierzenia i przejęcia przez Twój zespół.
              </p>
            </div>

            <div className="mt-14 grid md:grid-cols-2">
              {services.map((service, index) => (
                <article
                  key={service.name}
                  className="border border-white/10 p-7 md:min-h-[220px] md:p-9 md:odd:border-r-0 md:[&:nth-child(n+3)]:border-t-0"
                >
                  <span className="font-mono text-xs text-neon/70">0{index + 1}</span>
                  <h3 className="mt-8 text-2xl font-black uppercase">{service.name}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-white/55">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#080808] px-6 py-24 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">
                [02] FIRMY Z {city.genitive.toUpperCase()}
              </p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[1.05] md:text-6xl">
                Lokalny rynek.
                <br />
                <span className="text-neon">Realny kontekst.</span>
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65">{city.context}</p>
            </div>

            <div className="grid content-start gap-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/35">Najczęściej pomagamy</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {city.industries.map((industry) => (
                    <span key={industry} className="border border-white/15 px-3 py-2 text-xs font-bold uppercase text-white/70">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/35">Typowe priorytety</p>
                <ul className="mt-4 space-y-3">
                  {city.priorities.map((priority) => (
                    <li key={priority} className="flex gap-3 text-sm leading-relaxed text-white/70">
                      <Check size={17} className="mt-0.5 shrink-0 text-neon" aria-hidden="true" />
                      <span>{priority}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 px-6 py-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">[03] SPOSÓB PRACY</p>
            <div className="mt-8 grid lg:grid-cols-3">
              {[
                ['Diagnoza', 'Sprawdzamy dane, stronę, narzędzia i proces. Wybieramy problem, który kosztuje najwięcej.'],
                ['Sprint', 'Ustalamy rezultat, odpowiedzialność i kryteria odbioru. Następnie wdrażamy konkretną zmianę.'],
                ['Przekazanie', 'Konta, dane, automatyzacje i dokumentacja zostają po Twojej stronie. Możemy rozwijać system dalej.'],
              ].map(([title, description], index) => (
                <article key={title} className="border border-white/10 p-7 lg:min-h-[260px] lg:border-r-0 lg:last:border-r">
                  <span className="font-mono text-xs text-neon">0{index + 1}</span>
                  <h3 className="mt-12 text-3xl font-black uppercase">{title}</h3>
                  <p className="mt-5 leading-relaxed text-white/55">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#080808] px-6 py-24 md:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">
              [04] PYTANIA / {city.name.toUpperCase()}
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-[1.05] md:text-6xl">Konkretnie, bez ukrytych założeń.</h2>
            <div className="mt-10 border-b border-white/15">
              {faq.map((item) => (
                <details key={item.question} className="group border-t border-white/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-bold uppercase md:text-lg">
                    <span>{item.question}</span>
                    <span className="font-mono text-neon transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-8 leading-relaxed text-white/60">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 px-6 py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">INNE MIASTA</p>
                <h2 className="mt-3 text-3xl font-black uppercase">Pracujemy w całej Polsce.</h2>
              </div>
              <a href="/#obszar-dzialania" className="font-mono text-xs uppercase tracking-wider text-white/45 transition-colors hover:text-neon">
                Zobacz pełną mapę →
              </a>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4">
              {relatedCities.map((related) => (
                <a
                  key={related.slug}
                  href={`/agencja-marketingowa/${related.slug}`}
                  className="group flex items-center justify-between border border-white/10 p-5 transition-colors hover:border-neon"
                >
                  <span className="font-bold uppercase">{related.name}</span>
                  <ArrowRight size={16} className="text-white/25 transition-colors group-hover:text-neon" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <LeadForm />
        <BrandQuote />
      </main>

      <Footer />
    </div>
  );
}
