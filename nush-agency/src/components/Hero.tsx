import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-40 md:pb-24 px-6 md:px-10 overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      <div className="relative max-w-5xl mx-auto flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm mb-6 text-neon font-bold tracking-[0.3em] uppercase flex items-center gap-4"
        >
          // AGENCJA MARKETINGOWO-TECHNOLOGICZNA
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-8"
        >
          Przestań <br />
          przepalać <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px #00FF00' }}>
            budżet.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12 leading-relaxed"
        >
          Łączymy twardą technologię z marketingiem direct-response. Budujemy maszyny sprzedażowe, które skalują biznes bez armii handlowców.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a 
            href="#audyt"
            className="inline-block border-2 border-neon text-neon px-8 py-4 font-black uppercase tracking-tighter hover:bg-neon hover:text-black transition-all"
          >
            Zdobądź techniczny audyt swojej firmy
          </a>
        </motion.div>
      </div>
    </section>
  );
}
