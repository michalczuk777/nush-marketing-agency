import React from "react";
import { motion } from "motion/react";
import { Users, Target, ShieldCheck, ArrowRight, ArrowDown } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function CollaborationModel() {
  const pillars = [
    {
      id: "embedded",
      title: "Embedded",
      icon: <Users className="w-5 h-5 text-ember" />,
      description: "Wchodzimy głęboko w kontekst firmy i pracujemy jak część wewnętrznego zespołu.",
    },
    {
      id: "aligned",
      title: "Aligned",
      icon: <Target className="w-5 h-5 text-ember" />,
      description: "Łączymy działania z celami biznesowymi, marżą, sprzedażą i realnymi możliwościami operacyjnymi.",
    },
    {
      id: "accountable",
      title: "Accountable",
      icon: <ShieldCheck className="w-5 h-5 text-ember" />,
      description: "Bierzemy odpowiedzialność nie tylko za wykonanie zadań, ale również za jakość wdrożenia i efekt.",
    },
  ];

  return (
    <section id="jak-pracujemy" className="bg-bone py-24 sm:py-32 border-b border-stone/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-6">
            <div className="mb-6">
              <SectionLabel number="03" text="JAK PRACUJEMY" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-carbon uppercase">
              Nie obok firmy.
              <br />
              <span className="text-stone">W środku jej działania.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-10">
            <p className="font-sans text-stone-700 text-base sm:text-lg max-w-xl leading-relaxed">
              Nie czekamy na kolejną listę zadań. Poznajemy model biznesowy, porządkujemy priorytety i wspólnie odpowiadamy za wdrożenie oraz rezultat.
            </p>
          </div>
        </div>

        {/* 1. Structural Interaction Scheme */}
        <div className="mb-24 bg-carbon/5 rounded-sm border border-stone/20 p-8 md:p-12 relative overflow-hidden">
          
          {/* Schematic Title */}
          <div className="flex items-center gap-2 mb-10 border-b border-stone/20 pb-4">
            <span className="font-mono text-xs text-stone uppercase tracking-widest font-semibold">
              SCHEMAT PRZEPŁYWU I SYNERGII
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 items-center gap-6 relative">
            
            {/* Twój Biznes */}
            <div className="lg:col-span-3 bg-bone border border-stone-300 p-6 rounded-sm flex flex-col justify-between min-h-[140px] z-10">
              <div>
                <span className="font-mono text-[9px] text-stone tracking-widest uppercase block mb-1">STRONA KLIENTA</span>
                <h4 className="font-heading font-bold text-base text-carbon uppercase">Twój biznes</h4>
              </div>
              <p className="font-sans text-stone-600 text-xs mt-2">
                Zrozumienie marży, logistyki, celów sprzedażowych oraz wewnętrznych procesów.
              </p>
            </div>

            {/* Connection 1 */}
            <div className="lg:col-span-1 flex justify-center items-center z-10">
              <ArrowRight className="w-5 h-5 text-stone hidden lg:block" />
              <ArrowDown className="w-5 h-5 text-stone lg:hidden" />
            </div>

            {/* Central Joint Module: Wspólna Odpowiedzialność */}
            <div className="lg:col-span-3 bg-carbon border-2 border-ember p-6 rounded-sm flex flex-col justify-between min-h-[160px] relative overflow-hidden shadow-lg shadow-ember/5 z-10">
              {/* Corner Ember indicator dot */}
              <span className="absolute top-3 right-3 w-2 h-2 bg-ember rounded-full animate-pulse"></span>
              
              <div>
                <span className="font-mono text-[9px] text-ember tracking-widest uppercase block mb-1">STREFA SYNERGII</span>
                <h4 className="font-heading font-bold text-base text-bone uppercase">Wspólna odpowiedzialność</h4>
              </div>
              <p className="font-sans text-stone text-xs mt-2">
                Embedded integration: jeden zespół, jeden cel, pełna transparentność działań i wyników.
              </p>
            </div>

            {/* Connection 2 */}
            <div className="lg:col-span-1 flex justify-center items-center z-10">
              <ArrowRight className="w-5 h-5 text-stone hidden lg:block" />
              <ArrowDown className="w-5 h-5 text-stone lg:hidden" />
            </div>

            {/* Nasze Kompetencje */}
            <div className="lg:col-span-3 bg-bone border border-stone-300 p-6 rounded-sm flex flex-col justify-between min-h-[140px] z-10">
              <div>
                <span className="font-mono text-[9px] text-stone tracking-widest uppercase block mb-1">ZESPÓŁ NUSH</span>
                <h4 className="font-heading font-bold text-base text-carbon uppercase">Nasze kompetencje</h4>
              </div>
              <p className="font-sans text-stone-600 text-xs mt-2">
                Strategia, e-commerce, performance marketing, integracje, analityka i automatyzacje.
              </p>
            </div>

            {/* Custom Background connection line on desktop */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-300/60 hidden lg:block z-0" />

          </div>
        </div>

        {/* 2. Three Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="border-t border-stone-300 pt-8 flex flex-col justify-between min-h-[160px] group"
            >
              <div>
                {/* Icon and title header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-carbon/5 rounded-sm group-hover:bg-ember/10 group-hover:text-ember transition-colors duration-300">
                    {pillar.icon}
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-carbon uppercase tracking-wide group-hover:text-ember transition-colors duration-300">
                    {pillar.title}
                  </h3>
                </div>

                <p className="font-sans text-stone-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
