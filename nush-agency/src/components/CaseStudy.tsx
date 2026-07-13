import { motion } from 'motion/react';
import { ArrowUpRight, BarChart3 } from 'lucide-react';

const metrics = [
  { value: '+227%', label: 'kliknięć z Google', width: '92%' },
  { value: '+175%', label: 'wyświetleń w wynikach wyszukiwania', width: '76%' },
  { value: '+19%', label: 'współczynnika kliknięć', width: '36%' },
  { value: '425', label: 'podstron generujących ruch organiczny', width: '64%' },
];

export default function CaseStudy() {
  return (
    <section id="realizacja" className="relative overflow-hidden border-b border-white/10 bg-[#0a0a0a] px-6 py-24 md:px-10">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-30 [background-image:linear-gradient(rgba(0,255,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.12)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(90deg,transparent,black)]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-neon">
            <BarChart3 size={16} aria-hidden="true" />
            <span>[03] NASZA OSTATNIA REALIZACJA</span>
          </div>
          <h2 className="max-w-xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
            Od katalogu produktów do rosnącego kanału organicznego.
          </h2>
          <a
            href="#audyt"
            className="mt-10 inline-flex items-center gap-3 border border-neon px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-neon transition-all hover:-translate-y-1 hover:bg-neon hover:text-black"
          >
            Zbudujmy podobny wzrost
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border border-white/10 bg-black/40 p-5 transition-colors hover:border-neon/60"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <span className="font-mono text-4xl font-bold tracking-tight text-white md:text-5xl">{metric.value}</span>
                <span className="font-mono text-[10px] text-neon/60">0{index + 1}</span>
              </div>
              <div className="mb-3 text-sm uppercase leading-snug text-white/60">{metric.label}</div>
              <div className="h-px bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: metric.width }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.25 + index * 0.1, ease: 'easeOut' }}
                  className="h-px bg-neon shadow-[0_0_12px_rgba(0,255,0,0.8)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
