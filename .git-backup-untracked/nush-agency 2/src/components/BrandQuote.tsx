import { motion } from 'motion/react';

export default function BrandQuote() {
  return <section className="relative overflow-hidden border-b border-white/10 bg-neon px-6 py-20 text-black md:px-10 md:py-28">
    <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,rgba(0,0,0,.35)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.35)_1px,transparent_1px)] [background-size:32px_32px]" />
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .65 }} className="relative mx-auto max-w-7xl">
      <p className="font-mono text-xs font-bold uppercase tracking-[.25em]">NUSH / PRINCIPLE</p>
      <blockquote className="mt-8 max-w-6xl text-4xl font-black uppercase leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">BUDUJEMY JAK DLA SIEBIE. WDRAŻAMY, BY SŁUŻYŁO TOBIE.</blockquote>
      <div className="mt-10 flex items-center gap-4 font-mono text-xs uppercase tracking-widest"><span className="h-px w-16 bg-black" />System, który zostaje po wdrożeniu</div>
    </motion.div>
  </section>;
}
