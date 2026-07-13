import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "../types";
import SectionLabel from "./SectionLabel";
import Button from "./Button";

export default function CaseStudyShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeCaseStudy = CASE_STUDIES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % CASE_STUDIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  return (
    <section id="realizacje" className="bg-carbon text-bone py-24 sm:py-32 overflow-hidden border-b border-stone/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-6">
            <div className="mb-6">
              <SectionLabel number="02" text="EFEKTY, KTÓRE MAJĄ ZNACZENIE" light={true} />
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-bone uppercase">
              Prawdziwi partnerzy.
              <br />
              <span className="text-stone">Realne wyniki.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-10">
            <p className="font-sans text-stone/80 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
              Pokazujemy nie tylko to, co wdrożyliśmy, ale przede wszystkim, co zmieniło się w biznesie klienta. Nasze wdrożenia przynoszą mierzalne zyski.
            </p>
            
            {/* Carousel Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-stone/30 hover:border-bone hover:bg-white/5 flex items-center justify-center transition-all duration-200 cursor-pointer text-stone hover:text-bone"
                aria-label="Poprzedni case study"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-stone/30 hover:border-bone hover:bg-white/5 flex items-center justify-center transition-all duration-200 cursor-pointer text-stone hover:text-bone"
                aria-label="Następny case study"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-stone tracking-widest uppercase ml-2">
                {String(currentIndex + 1).padStart(2, "0")} / {String(CASE_STUDIES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Case Study Detailed Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Brand details, description and buttons */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCaseStudy.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                {/* Brand & tag */}
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs px-2.5 py-1 bg-ember text-bone rounded-sm uppercase tracking-wider font-semibold">
                    Case Study
                  </span>
                  <span className="font-heading font-extrabold text-xl tracking-wide text-bone uppercase">
                    {activeCaseStudy.brand}
                  </span>
                </div>

                {/* Case Study Title */}
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-bone leading-tight uppercase">
                  {activeCaseStudy.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-stone/80 text-sm sm:text-base leading-relaxed">
                  {activeCaseStudy.description}
                </p>

                {/* CTA Link */}
                <div className="pt-4 border-t border-stone/20 mt-2">
                  <a href="#kontakt" className="inline-block">
                    <Button variant="primary">
                      Zobacz realizacje
                    </Button>
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Picture and giant metrics overlay */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCaseStudy.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="relative h-[360px] sm:h-[420px] lg:h-[460px] w-full rounded-sm overflow-hidden border border-stone/20 bg-stone/5 group"
              >
                {/* Product/Retail Photography */}
                <img
                  src={activeCaseStudy.imageUrl}
                  alt={`Realizacja dla ${activeCaseStudy.brand}`}
                  className="w-full h-full object-cover filter desaturate contrast-[1.1] brightness-50 transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Absolute overlay gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-carbon/20" />

                {/* Metrics Box (Sits perfectly in overlay) */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 grid grid-cols-3 gap-4 border-t border-stone/30 pt-6">
                  {activeCaseStudy.metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ember tracking-tight leading-none mb-1">
                        {metric.value}
                      </span>
                      <span className="font-sans text-[10px] sm:text-xs text-stone uppercase tracking-wide">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Small indicator label that this is demo data */}
                <div className="absolute top-4 right-4 bg-carbon/80 backdrop-blur-md px-3 py-1 rounded-full border border-stone/30">
                  <span className="font-mono text-[9px] text-stone tracking-[0.15em] uppercase font-semibold">
                    Układ demonstracyjny
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
