import { motion } from 'motion/react';

export default function Hero() {
  return <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 px-6 md:px-10 overflow-hidden border-b border-white/10">
    <div className="hero-grid absolute inset-0" />
    <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
      <div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="font-mono text-[11px] md:text-sm mb-6 text-neon font-bold tracking-[0.22em] uppercase">// SYSTEMY SPRZEDAŻY · E-COMMERCE · AUTOMATYZACJA</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .1 }} className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-8">Przestań <br />przepalać <br /><span className="font-bold text-neon" style={{ color: '#050505', WebkitTextStroke: '1px rgba(0, 255, 0, 0.72)' }}>budżet</span></motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .2 }} className="text-lg md:text-2xl text-white/70 max-w-2xl mb-8 leading-relaxed">Łączymy e-commerce, marketing, dane i automatyzację, żeby firmy handlowe sprzedawały więcej bez dokładania chaosu i ręcznej pracy.</motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }} className="text-base md:text-lg text-white/55 max-w-xl mb-8">Projektujemy i wdrażamy systemy, które można mierzyć, rozwijać i skalować.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .3 }}>
          <a href="#kontakt" className="inline-flex border-2 border-neon text-neon px-6 py-4 font-black uppercase tracking-tight hover:bg-neon hover:text-black transition-all">Umów bezpłatną diagnozę</a>
          <a href="#realizacja" className="ml-4 inline-flex border border-white/20 px-6 py-4 font-black uppercase tracking-tight text-white/80 hover:border-neon hover:text-neon transition-all">Zobacz realizację</a>
        </motion.div>
      </div>
      <div className="hidden lg:block" aria-hidden="true" />
    </div>
    <div className="relative max-w-7xl mx-auto mt-10 grid gap-3 sm:grid-cols-3 text-[10px] font-mono uppercase tracking-widest text-white/55"><span className="border border-white/10 px-4 py-3">Diagnoza oparta na danych</span><span className="border border-white/10 px-4 py-3">Wdrożenie, nie tylko strategia</span><span className="border border-white/10 px-4 py-3">System pozostaje u klienta</span></div>
  </section>;
}
