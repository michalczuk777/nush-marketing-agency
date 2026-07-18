import { motion } from 'motion/react';

const showFounders = false;
const founders: Array<{ name: string; role: string }> = [];

export default function AboutSection() {
  return <section id="o-nas" className="border-b border-white/10 px-6 py-24 md:px-10"><div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">[07] KIM JESTEŚMY</p><div><motion.h2 initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-4xl font-black uppercase leading-[1.1] md:text-7xl max-w-4xl break-words lg:pr-12">Nowa marka.<br /><span className="text-neon">Nie nowe kompetencje.</span></motion.h2><p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70">NUSH to nowa marka zbudowana na doświadczeniu w e-commerce, marketingu, technologii i automatyzacji. Łączymy te kompetencje w jeden zespół, który dowozi działające systemy.</p><p className="mt-5 max-w-3xl text-base leading-relaxed text-white/50">Pracujemy blisko biznesu. Rozumiemy, że dobry pomysł ma wartość dopiero wtedy, gdy działa w codziennej pracy firmy.</p>{showFounders && <div className="mt-10 grid gap-4 sm:grid-cols-2">{founders.map((founder) => <div key={founder.name} className="border border-white/10 p-4">{founder.name}<span className="block text-sm text-white/50">{founder.role}</span></div>)}</div>}</div></div></section>;
}
