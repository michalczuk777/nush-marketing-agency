import { ArrowRight, Check, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
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
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#050505] font-sans text-white">
      <Seo title={title} description={description} path={path} schema={schema} />
      <Navbar />

      <main className="pt-20">
        <section className="relative overflow-hidden border-b border-white/10 px-5 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:py-28">
          <div className="pointer-events-none absolute inset-0 hero-grid opacity-35" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <nav aria-label="Okruszki" className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35 sm:tracking-[0.18em]">
              <a href="/" className="transition-colors hover:text-neon">NUSH</a>
              <span>/</span>
              <span className="break-words">Agencja marketingowa {city.name}</span>
            </nav>

            <div className="mt-9 grid gap-10 lg:mt-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
              <div className="min-w-0">
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="break-words font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-neon sm:text-xs sm:tracking-widest"
                >
                  [AGENCJA MARKETINGOWA / {city.name}]
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className="mt-5 max-w-5xl break-words text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.96] tracking-tight [overflow-wrap:anywhere]"
                >
                  Agencja marketingowa
                  <br className="hidden sm:block" />
                  <span className="text-neon sm:ml-0"> {city.name}</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.16 }}
                  className="mt-7 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg md:mt-8 md:text-xl"
                >
                  {hero}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.24 }}
                  className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap"
                >
                  <a
                    href="#kontakt"
                    className="group inline-flex w-full items-center justify-center gap-3 border-2 border-neon px-5 py-4 text-center text-xs font-black uppercase tracking-tight text-neon transition-all duration-200 hover:bg-neon hover:text-black sm:w-auto sm:px-6 sm:text-sm"
                  >
                    Umów bezpłatną diagnozę
                    <ArrowRight size={18} className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                  <a
                    href="#zakres"
                    className="inline-flex w-full items-center justify-center border border-white/20 px-5 py-4 text-center text-xs font-black uppercase tracking-tight text-white/80 transition-all duration-200 hover:border-neon hover:text-neon sm:w-auto sm:px-6 sm:text-sm"
                  >
                    Zobacz zakres
                  </a>
                </motion.div>
              </div>

              <motion.aside
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="border border-white/10 bg-black/70 p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 shrink-0 text-neon" size={20} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="break-words font-mono text-[11px] font-bold uppercase tracking-wider text-white sm:text-xs">
                      Dostępni dla firm w {city.locative}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      Pracujemy zdalnie i nie udajemy fizycznego biura w mieście. Dostajesz bezpośredni kontakt
                      z zespołem, jasny zakres i rozwiązania pozostające po Twojej stronie.
                    </p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <section id="zakres" className="border-b border-white/10 px-5 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10">
              <div className="min-w-0">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">[01] ZAKRES</p>
                <h2 className="mt-5 break-words text-[clamp(2rem,6vw,3.75rem)] font-black uppercase leading-[1.02] [overflow-wrap:anywhere]">
                  Nie sprzedajemy
                  <br />
                  <span className="text-neon">jednego kanału.</span>
                </h2>
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg lg:pt-10">
                Szukamy miejsca, w którym marketing, dane albo sprzedaż przestają się ze sobą łączyć.
                Następnie wdrażamy rozwiązanie możliwe do zmierzenia i przejęcia przez Twój zespół.
              </p>
            </div>

            <div className="mt-10 grid sm:mt-14 md:grid-cols-2">
              {services.map((service, index) => (
                <article
                  key={service.name}
                  className="border border-white/10 p-6 sm:p-7 md:min-h-[220px] md:p-9 md:odd:border-r-0 md:[&:nth-child(n+3)]:border-t-0"
                >
                  <span className="font-mono text-xs text-neon/70">0{index + 1}</span>
                  <h3 className="mt-7 break-words text-xl font-black uppercase sm:mt-8 sm:text-2xl">{service.name}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-white/55">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#080808] px-5 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div className="min-w-0">
              <p className="break-words font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-neon sm:text-xs sm:tracking-widest">
                [02] FIRMY Z {city.genitive.toUpperCase()}
              </p>
              <h2 className="mt-5 break-words text-[clamp(2rem,6vw,3.75rem)] font-black uppercase leading-[1.02] [overflow-wrap:anywhere]">
                Lokalny rynek.
                <br />
                <span className="text-neon">Realny kontekst.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:mt-8 sm:text-lg">{city.context}</p>
            </div>

            <div className="grid min-w-0 content-start gap-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/35">Najczęściej pomagamy</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {city.industries.map((industry) => (
                    <span key={industry} className="max-w-full break-words border border-white/15 px-3 py-2 text-xs font-bold uppercase text-white/70">
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
                      <span className="min-w-0 break-words">{priority}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 px-5 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">[03] SPOSÓB PRACY</p>
            <div className="mt-8 grid lg:grid-cols-3">
              {[
                ['Diagnoza', 'Sprawdzamy dane, stronę, narzędzia i proces. Wybieramy problem, który kosztuje najwięcej.'],
                ['Sprint', 'Ustalamy rezultat, odpowiedzialność i kryteria odbioru. Następnie wdrażamy konkretną zmianę.'],
                ['Przekazanie', 'Konta, dane, automatyzacje i dokumentacja zostają po Twojej stronie. Możemy rozwijać system dalej.'],
              ].map(([stepTitle, stepDescription], index) => (
                <article key={stepTitle} className="border border-white/10 p-6 sm:p-7 lg:min-h-[260px] lg:border-r-0 lg:last:border-r">
                  <span className="font-mono text-xs text-neon">0{index + 1}</span>
                  <h3 className="mt-9 break-words text-2xl font-black uppercase sm:mt-12 sm:text-3xl">{stepTitle}</h3>
                  <p className="mt-5 leading-relaxed text-white/55">{stepDescription}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#080808] px-5 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="break-words font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-neon sm:text-xs sm:tracking-widest">
              [04] PYTANIA / {city.name.toUpperCase()}
            </p>
            <h2 className="mt-5 break-words text-[clamp(2rem,6vw,3.75rem)] font-black uppercase leading-[1.02] [overflow-wrap:anywhere]">
              Konkretnie, bez ukrytych założeń.
            </h2>
            <div className="mt-8 border-b border-white/15 sm:mt-10">
              {faq.map((item) => (
                <details key={item.question} className="group border-t border-white/15">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-sm font-bold uppercase sm:gap-6 sm:py-6 sm:text-base md:text-lg">
                    <span className="min-w-0 break-words">{item.question}</span>
                    <span className="shrink-0 font-mono text-neon transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-2 text-sm leading-relaxed text-white/60 sm:pr-8 sm:text-base">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 px-5 py-14 sm:px-6 sm:py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">INNE MIASTA</p>
                <h2 className="mt-3 break-words text-2xl font-black uppercase sm:text-3xl">Pracujemy w całej Polsce.</h2>
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
                  className="group flex min-w-0 items-center justify-between gap-3 border border-white/10 p-5 transition-all duration-200 hover:border-neon hover:bg-neon/[0.03]"
                >
                  <span className="min-w-0 break-words font-bold uppercase">{related.name}</span>
                  <ArrowRight size={16} className="shrink-0 text-white/25 transition-all duration-200 group-hover:translate-x-1 group-hover:text-neon" aria-hidden="true" />
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
