import { motion } from 'motion/react';

type Capability = {
  number: string;
  title: string;
  services: string[];
  link?: { href: string; label: string };
};

const capabilities: Capability[] = [
  {
    number: '01',
    title: 'E-commerce i katalogi produktowe',
    services: ['Konfiguracja i rozwój sklepów', 'Migracja oraz import produktów', 'Kategorie, warianty i atrybuty', 'Opisy i dane produktowe', 'Feedy produktowe', 'Google Merchant Center', 'Automatyzacja publikacji ofert'],
  },
  {
    number: '02',
    title: 'SEO i widoczność',
    services: ['Audyty techniczne SEO', 'Architektura kategorii i produktów', 'Indeksacja oraz crawl budget', 'Linkowanie wewnętrzne', 'Metadane i dane strukturalne', 'Landingi SEO', 'Google Search Console', 'Rozwój ruchu organicznego', 'Widoczność w wyszukiwarkach AI — GEO', 'Audyt obecności marki w odpowiedziach AI', 'Architektura treści przygotowana do cytowania', 'Spójność informacji o marce i usługach', 'Dane strukturalne i entity SEO', 'Monitoring widoczności w Google i narzędziach AI'],
    link: { href: '/widocznosc-w-ai', label: 'Sprawdź widoczność w AI' },
  },
  {
    number: '03',
    title: 'Automatyzacje i integracje',
    services: ['Automatyzacja procesów', 'Integracje API i webhooki', 'Synchronizacja danych', 'Automatyczne generowanie treści i ofert', 'Importy oraz eksporty danych', 'Workflow wykorzystujące AI', 'Alerty, raporty i powiadomienia'],
  },
  {
    number: '04',
    title: 'Strony i landing page’e',
    services: ['Projektowanie UX/UI', 'Strony firmowe', 'Landing page’e sprzedażowe', 'Formularze pozyskiwania leadów', 'Development front-end i back-end', 'Optymalizacja szybkości', 'Wdrożenie analityki i SEO'],
  },
  {
    number: '05',
    title: 'Dane i analityka',
    services: ['GA4 i Google Tag Manager', 'Dashboardy i raportowanie', 'Analiza lejka sprzedażowego', 'Pomiar źródeł leadów', 'Łączenie marketingu ze sprzedażą', 'Monitoring wyników', 'Rekomendacje oparte na danych'],
  },
  {
    number: '06',
    title: 'Strategia i growth',
    services: ['Badania rynku i konkurencji', 'Pozycjonowanie marki', 'Strategia marketingowa', 'Strategia wejścia na rynek', 'Optymalizacja oferty', 'Plan eksperymentów', 'Roadmapa wzrostu i wdrożeń'],
  },
];

const stack = ['React', 'TypeScript', 'Node.js', 'REST API', 'Webhooks', 'Cloudflare', 'Railway', 'GitHub', 'Shoper', 'WooCommerce', 'Google Search Console', 'Google Merchant Center', 'GA4', 'GTM', 'Looker Studio', 'Schema.org', 'SEO techniczne', 'Automatyzacje AI'];

const outcomes = ['Działający sklep', 'Uporządkowany katalog', 'Wdrożona automatyzacja', 'Gotowy landing', 'Pomiar i dashboard', 'Dokumentacja', 'Kod i dostępy po stronie klienta'];

export default function Capabilities() {
  return (
    <section id="kompetencje" className="border-b border-white/10 bg-[#080808] px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-neon">[03] CO ROBIMY</p>
            <h2 className="max-w-3xl text-4xl font-black uppercase leading-[.95] md:text-6xl">Od strategii do<br />działającego wdrożenia.</h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-relaxed text-white/60 md:text-lg">Nie kończymy na audycie i prezentacji. Projektujemy, budujemy, integrujemy i uruchamiamy rozwiązania, które zostają w firmie.</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability, index) => (
            <motion.article key={capability.number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.06, duration: 0.45 }} whileHover={{ y: -4 }} className="group border border-white/10 p-6 transition-colors hover:border-neon/70">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5 transition-colors group-hover:border-neon/40"><span className="font-mono text-2xl font-bold text-neon">{capability.number}</span><span className="font-mono text-[10px] uppercase tracking-widest text-white/35">Zakres</span></div>
              <h3 className="mt-6 max-w-sm text-xl font-black uppercase leading-tight">{capability.title}</h3>
              <ul className="mt-6 space-y-2 text-sm leading-relaxed text-white/60">
                {capability.services.map((service) => <li key={service} className="flex gap-2"><span className="font-mono text-neon" aria-hidden="true">+</span><span>{service}</span></li>)}
              </ul>
              {capability.link && <a href={capability.link.href} className="mt-7 inline-flex border-t border-neon/40 pt-4 font-mono text-xs uppercase tracking-wider text-neon hover:text-white">{capability.link.label} →</a>}
            </motion.article>
          ))}
        </div>

        <div className="mt-4 border border-white/10 p-6 md:p-8">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">[STACK / NARZĘDZIA]</p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3 font-mono text-xs uppercase leading-relaxed text-white/60 md:text-sm">{stack.map((item) => <span key={item}>{item}</span>)}</div>
        </div>

        <div className="mt-4 border-t border-neon/50 pt-10">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">CO ZOSTAJE PO NASZEJ PRACY?</p>
          <ul className="mt-7 grid gap-x-8 gap-y-3 text-base font-bold uppercase sm:grid-cols-2 lg:grid-cols-4">{outcomes.map((outcome) => <li key={outcome} className="flex gap-3 text-white/85"><span className="font-mono text-neon" aria-hidden="true">+</span><span>{outcome}</span></li>)}</ul>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-white/60 md:text-lg">Nie uzależniamy klienta od NUSH. Budujemy rozwiązania, które może dalej rozwijać samodzielnie.</p>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[.2em] text-white/35">Built like it’s ours. Made to remain yours.</p>
        </div>
      </div>
    </section>
  );
}
