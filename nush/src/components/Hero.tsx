import React from "react";
import { motion } from "motion/react";
import Button from "./Button";
import { BRAND_INFO } from "../types";

export default function Hero() {
  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] md:min-h-screen bg-carbon text-bone flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Decorative subtle background mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(85,98,76,0.1),transparent_45%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Editorial Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Etykieta nad nagłówkiem */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 bg-ember rounded-full"></span>
            <span className="font-mono text-xs tracking-[0.2em] text-stone uppercase font-semibold">
              E-COMMERCE · MARKETING · SYSTEMY WZROSTU
            </span>
          </motion.div>

          {/* Główny nagłówek (H1) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-bone mb-6 uppercase"
          >
            Built like it’s ours.
            <br />
            <span className="text-stone">Made to remain yours.</span>
          </motion.h1>

          {/* Opis */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-stone/90 max-w-xl leading-relaxed mb-10"
          >
            Wchodzimy do biznesu jak część wewnętrznego zespołu. Porządkujemy sprzedaż, e-commerce, marketing, dane i procesy, a następnie budujemy systemy, które pomagają firmie rosnąć.
          </motion.p>

          {/* Przyciski CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a href="#kontakt" onClick={(e) => handleScrollTo(e as any, "#kontakt")}>
              <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-base">
                Porozmawiajmy
              </Button>
            </a>
            <a href="#jak-pracujemy" onClick={(e) => handleScrollTo(e as any, "#jak-pracujemy")}>
              <Button variant="secondary" light={true} className="w-full sm:w-auto px-8 py-4 text-base">
                Zobacz, jak pracujemy
              </Button>
            </a>
          </motion.div>

          {/* Trzy krótkie wyróżniki */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-stone/20 pt-8"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-ember tracking-widest uppercase">01 / TEAM</span>
              <span className="font-sans text-sm font-medium text-bone">Zespół osadzony w biznesie</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-ember tracking-widest uppercase">02 / OWNER</span>
              <span className="font-sans text-sm font-medium text-bone">Pełna odpowiedzialność</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-ember tracking-widest uppercase">03 / ASSET</span>
              <span className="font-sans text-sm font-medium text-bone">Rozwiązania, które zostają u Ciebie</span>
            </div>
          </motion.div>

        </div>

        {/* Right Side: Brutalist Architectural Composition */}
        <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[480px] lg:h-[580px] flex items-center justify-center">
          
          {/* Main Architectural Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full h-full bg-stone/5 overflow-hidden rounded-sm border border-stone/10"
          >
            {/* The Concrete Image */}
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
              alt="Brutalist concrete block architecture with strong light and shadow"
              className="w-full h-full object-cover filter desaturate contrast-[1.2] brightness-75 select-none"
              referrerPolicy="no-referrer"
            />

            {/* Dark artistic vignette and gradients overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-carbon/40 via-transparent to-carbon/40" />

            {/* Simulated structural light ray overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
              style={{
                background: "linear-gradient(135deg, transparent 30%, rgba(244,240,232,0.4) 45%, rgba(244,240,232,0.8) 50%, rgba(244,240,232,0.4) 55%, transparent 70%)"
              }}
            />

            {/* Cienka linia Ember przecinająca kompozycję */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "140%" }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
              className="absolute h-[1.5px] bg-ember origin-left top-1/2 left-[-20%] -rotate-30 shadow-[0_0_8px_rgba(244,90,60,0.4)]"
            />

            {/* Floating architectural abstract accent block */}
            <div className="absolute bottom-10 right-10 p-4 border border-stone/20 bg-carbon/80 backdrop-blur-sm rounded-sm">
              <span className="font-mono text-[9px] text-stone tracking-[0.2em] block mb-1">SYSTEM COORD</span>
              <span className="font-heading text-xs font-bold text-bone">EMBEDDED OPERATIONAL</span>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
