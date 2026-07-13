import { motion } from 'motion/react';
import { ArrowUpRight, Search, Workflow, Rocket } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'AUDYT',
    description: 'Znajdujemy miejsca, w których uciekają leady, czas i budżet',
    icon: Search,
  },
  {
    num: '02',
    title: 'ARCHITEKTURA',
    description: 'Projektujemy system, który łączy marketing, dane i sprzedaż',
    icon: Workflow,
  },
  {
    num: '03',
    title: 'SKALA',
    description: 'Uruchamiamy wzrost i rozwijamy kanały, które pracują stale',
    icon: Rocket,
  },
];

export default function Process() {
  return (
    <section id="proces" className="relative overflow-hidden border-b border-white/10 bg-neon/5 px-6 py-24 md:px-10">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_20%_50%,rgba(0,255,0,0.08),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 font-mono text-xs font-bold uppercase tracking-widest text-neon"
        >
          [04] JAK DZIAŁAMY
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.num} className="contents">
                <motion.article
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: index * 0.14 }}
                  className="group relative border border-white/10 bg-black/20 p-6 transition-colors hover:border-neon/60 md:min-h-[220px]"
                >
                  <div className="mb-12 flex items-start justify-between">
                    <span className="font-mono text-3xl font-bold text-white transition-colors group-hover:text-neon">{step.num}</span>
                    <Icon size={21} className="text-neon/60 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:text-neon" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 font-mono text-sm font-bold uppercase tracking-widest text-white">{step.title}</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-white/50 transition-colors group-hover:text-white/75">{step.description}</p>
                  <ArrowUpRight className="absolute bottom-5 right-5 text-white/20 transition-all duration-300 group-hover:bottom-6 group-hover:right-4 group-hover:text-neon" size={17} aria-hidden="true" />
                </motion.article>

                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.35 + index * 0.14 }}
                    className="hidden h-px w-14 origin-left self-center bg-gradient-to-r from-neon/70 to-white/10 md:block"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
