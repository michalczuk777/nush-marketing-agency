import React from "react";
import { PROCESS_STEPS } from "../types";
import SectionLabel from "./SectionLabel";

export default function ProcessSteps() {
  return (
    <section id="o-nas" className="bg-bone py-24 sm:py-32 border-b border-stone/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="max-w-xl mb-16 sm:mb-20">
          <div className="mb-6">
            <SectionLabel number="04" text="PROCES" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-carbon uppercase">
            Od problemu do
            <br />
            <span className="text-stone">działającego systemu.</span>
          </h2>
        </div>

        {/* 5 Steps Grid: Responsive row on desktop, vertical list on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 gap-x-4 relative">
          
          {/* Subtle horizontal connecting line on desktop */}
          <div className="absolute top-[40px] left-0 right-0 h-[1.5px] bg-stone-300/60 hidden lg:block z-0" />

          {PROCESS_STEPS.map((step) => {
            const isSpecial = step.isSpecial;

            return (
              <div
                key={step.id}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-sm transition-all duration-300 z-10 ${
                  isSpecial
                    ? "bg-carbon text-bone border-2 border-ember shadow-xl shadow-ember/5 lg:translate-y-[-10px]"
                    : "bg-bone text-carbon border border-stone-200 hover:border-stone-400"
                }`}
              >
                {/* Step Header */}
                <div className="flex items-center justify-between mb-8">
                  {/* Step index number */}
                  <span
                    className={`font-mono text-xs font-bold tracking-widest ${
                      isSpecial ? "text-ember" : "text-stone"
                    }`}
                  >
                    KROK {step.number}
                  </span>
                  
                  {/* Visual bullet indicator */}
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isSpecial ? "bg-ember animate-pulse" : "bg-stone-400"
                    }`}
                  ></span>
                </div>

                {/* Step Content */}
                <div>
                  <h3
                    className={`font-heading font-extrabold text-lg uppercase tracking-wide mb-3 ${
                      isSpecial ? "text-bone" : "text-carbon"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`font-sans text-xs sm:text-sm leading-relaxed ${
                      isSpecial ? "text-stone" : "text-stone-600"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Realize the brand promise on the highlighted block */}
                {isSpecial && (
                  <div className="mt-6 pt-4 border-t border-stone/30">
                    <span className="font-mono text-[9px] text-ember uppercase tracking-widest block font-semibold">
                      MADE TO REMAIN YOURS
                    </span>
                    <span className="font-sans text-[10px] text-stone">
                      Wszystko pozostaje Twoją własnością.
                    </span>
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
