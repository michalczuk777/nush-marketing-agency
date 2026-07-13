import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, BarChart3 } from 'lucide-react';

const metrics = [
  { value: '+227%', label: 'kliknięć z Google', width: '92%' },
  { value: '+175%', label: 'wyświetleń w wynikach wyszukiwania', width: '76%' },
  { value: '+19%', label: 'współczynnika kliknięć', width: '36%' },
  { value: '425', label: 'podstron generujących ruch organiczny', width: '64%' },
];

export default function CaseStudy() {
  const [expanded, setExpanded] = useState(false);
  return <section id="realizacja" className="relative overflow-hidden border-b border-white/10 bg-[#0a0a0a] px-6 py-24 md:px-10">
    <div className="relative mx-auto max-w-7xl">
      <div className="grid min-w-0 gap-14 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-end">
        <motion.div className="min-w-0" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[.22em] text-neon"><BarChart3 size={16} /><span>[04] NASZA OSTATNIA REALIZACJA</span></div>
          <h2 className="max-w-xl break-words text-4xl font-black uppercase leading-[.95] md:text-5xl xl:text-6xl">Z katalogu produktów do przewidywalnego źródła wzrostu</h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/60">Porządek w architekturze katalogu, techniczne SEO i skalowalna publikacja podstron w okresie trzech miesięcy.</p>
          <button type="button" onClick={() => setExpanded(!expanded)} className="mt-10 inline-flex items-center gap-3 border border-neon px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-neon transition-all hover:-translate-y-1 hover:bg-neon hover:text-black">{expanded ? 'Zwiń realizację' : 'Poznaj pełną realizację'}<ArrowUpRight size={16} /></button>
        </motion.div>
        <div className="grid min-w-0 gap-3 sm:grid-cols-2">{metrics.map((metric, index) => <motion.div key={metric.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="min-w-0 border border-white/10 bg-black/40 p-5 hover:border-neon/60 transition-colors"><div className="mb-8 flex justify-between gap-3"><span className="font-mono text-4xl font-bold md:text-5xl">{metric.value}</span><span className="font-mono text-[10px] text-neon/60">0{index + 1}</span></div><div className="mb-3 text-sm uppercase leading-snug text-white/60">{metric.label}</div><div className="h-px bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: metric.width }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-px bg-neon shadow-[0_0_12px_rgba(0,255,0,.8)]" /></div></motion.div>)}</div>
      </div>
      {expanded && <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-12 grid gap-4 border-t border-neon/30 pt-8 md:grid-cols-3"><div><p className="font-mono text-xs text-neon">PROBLEM</p><p className="mt-3 text-white/60">Duży katalog bez spójnej architektury i powtarzalnego mechanizmu publikacji.</p></div><div><p className="font-mono text-xs text-neon">WDROŻENIE</p><p className="mt-3 text-white/60">Uporządkowanie struktury, szablonów, danych i technicznego SEO.</p></div><div><p className="font-mono text-xs text-neon">REZULTAT</p><p className="mt-3 text-white/60">Więcej widocznych podstron i stabilny wzrost organicznego kanału.</p></div></motion.div>}
      <p className="mt-10 font-mono text-[10px] uppercase tracking-wider text-white/35">Dane Google Search Console. Porównanie pierwszych i ostatnich 30 dni okresu 12.04–11.07.2026.</p>
    </div>
  </section>;
}
