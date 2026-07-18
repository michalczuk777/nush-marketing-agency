import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { trackEvent } from '../analytics';

const areas = [
  { number: '01', title: 'Techniczna dostępność', description: 'Dbamy o indeksację, crawlability, strukturę HTML, sitemapę i dostęp crawlerów wyszukiwarek.' },
  { number: '02', title: 'Treść i architektura informacji', description: 'Budujemy strony usługowe, odpowiedzi, case studies i materiały eksperckie, które rozwiązują konkretne problemy klientów.' },
  { number: '03', title: 'Spójność marki i danych', description: 'Porządkujemy informacje o firmie, usługach, autorach, doświadczeniu i realizacjach w całym serwisie.' },
  { number: '04', title: 'Pomiar i rozwój', description: 'Monitorujemy widoczność organiczną, ruch z systemów AI i pytania, dla których marka powinna być obecna.' },
];

export default function GeoModule() {
  const handleCtaClick = () => {
    trackEvent('geo_cta_click', { location: 'landing_geo_module' });
    trackEvent('geo_contact_start', { location: 'landing_geo_module' });
  };

  return (
    <section id="geo" className="border-b border-white/10 bg-black px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-20">
          <div>
            <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[.22em] text-neon">[AI SEARCH / GEO]</p>
            <h2 className="max-w-4xl text-4xl font-black uppercase leading-[.95] md:text-6xl">Twoja marka powinna być odpowiedzią, nie tylko wynikiem.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-white/65">Przygotowujemy serwisy, treści i dane marek tak, aby były łatwiejsze do odnalezienia, zrozumienia i przywołania przez Google AI Overviews, ChatGPT, Gemini, Copilot i Perplexity.</p>
            <a href="/widocznosc-w-ai" onClick={handleCtaClick} className="mt-8 inline-flex items-center gap-3 border border-neon px-5 py-4 font-mono text-xs font-bold uppercase tracking-wider text-neon transition-all hover:-translate-y-1 hover:bg-neon hover:text-black">Sprawdź widoczność marki w AI <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {areas.map((area, index) => (
            <motion.article key={area.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }} whileHover={{ y: -4 }} className="group border border-white/10 p-6 transition-colors hover:border-neon/70 md:p-8">
              <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5 group-hover:border-neon/40"><span className="font-mono text-2xl font-bold text-neon">{area.number}</span><span className="font-mono text-[10px] uppercase tracking-widest text-white/30">AI SEARCH</span></div>
              <h3 className="mt-7 text-xl font-black uppercase leading-tight">{area.title}</h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">{area.description}</p>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[.18em] text-white/35">SEO · GEO · AI SEARCH · ENTITY DATA · SCHEMA.ORG · CONTENT ARCHITECTURE</p>
      </div>
    </section>
  );
}
