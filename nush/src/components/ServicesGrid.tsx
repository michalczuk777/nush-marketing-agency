import React from "react";
import { motion } from "motion/react";
import { Compass, ShoppingBag, Target, Database, Zap, Cpu, ArrowRight } from "lucide-react";
import { SERVICES } from "../types";
import SectionLabel from "./SectionLabel";

export default function ServicesGrid() {
  // Mapping icons to service IDs
  const serviceIcons: { [key: string]: React.ReactNode } = {
    strategy: <Compass className="w-6 h-6 text-ember" />,
    ecommerce: <ShoppingBag className="w-6 h-6 text-ember" />,
    marketing: <Target className="w-6 h-6 text-ember" />,
    analytics: <Database className="w-6 h-6 text-ember" />,
    cro: <Zap className="w-6 h-6 text-ember" />,
    automation: <Cpu className="w-6 h-6 text-ember" />,
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="uslugi" className="bg-bone py-24 sm:py-32 border-b border-stone/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left Column: Context & Editorial intro */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="sticky top-28">
              {/* Section Label */}
              <div className="mb-6">
                <SectionLabel number="01" text="CO ROBIMY" />
              </div>

              {/* Main Heading */}
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-carbon uppercase mb-6">
                Budujemy systemy,
                <br />
                które napędzają sprzedaż.
              </h2>

              {/* Description */}
              <p className="font-sans text-stone-700 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Nie dokładamy kolejnych przypadkowych działań do istniejącego chaosu. Łączymy strategię, technologię, marketing i egzekucję w jeden uporządkowany system wzrostu.
              </p>

              {/* Contact Button / Link */}
              <a
                href="#kontakt"
                onClick={(e) => handleScrollTo(e, "#kontakt")}
                className="group inline-flex items-center gap-2 font-sans font-medium text-xs tracking-wider uppercase text-carbon hover:text-ember transition-colors duration-200"
              >
                <span>Poznaj pełny zakres usług</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: 2x3 Services Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-stone/20 border border-stone/20 rounded-sm overflow-hidden">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-bone p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 group hover:bg-stone/10"
                >
                  {/* Top: Icon and service number */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-2.5 bg-carbon/5 rounded-sm group-hover:bg-carbon group-hover:text-bone transition-all duration-300">
                      {serviceIcons[service.id] || <Compass className="w-6 h-6 text-ember" />}
                    </div>
                    <span className="font-mono text-xs text-stone group-hover:text-ember transition-colors duration-300 font-semibold">
                      {service.number}
                    </span>
                  </div>

                  {/* Bottom: Title & description */}
                  <div>
                    <h3 className="font-heading font-bold text-lg text-carbon mb-2 uppercase group-hover:text-ember transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="font-sans text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
