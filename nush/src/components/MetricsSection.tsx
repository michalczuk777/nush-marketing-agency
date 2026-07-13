import React from "react";
import { CORE_METRICS } from "../types";
import SectionLabel from "./SectionLabel";

export default function MetricsSection() {
  return (
    <section id="wiedza" className="bg-bone py-24 sm:py-32 border-b border-stone/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Heading Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-6">
            <div className="mb-6">
              <SectionLabel number="05" text="MIERZYMY TO, CO ISTOTNE" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-carbon uppercase">
              Wynik biznesowy ponad
              <br />
              <span className="text-stone">marketingowy hałas.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-10">
            <p className="font-sans text-stone-700 text-base sm:text-lg max-w-xl leading-relaxed">
              Nie kończymy raportu na kliknięciach, zasięgach i liczbie przygotowanych materiałów. Mierzymy wpływ działań na sprzedaż, marżę, efektywność operacyjną i oszczędność czasu Twojego zespołu.
            </p>
          </div>
        </div>

        {/* 4 KPIs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {CORE_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="border border-stone-300 p-8 rounded-sm bg-bone flex flex-col justify-between min-h-[180px] transition-all duration-300 hover:border-stone-500 hover:shadow-sm"
            >
              {/* Giant Metric Number */}
              <div>
                <span className="font-heading font-extrabold text-4xl sm:text-5xl text-ember tracking-tight leading-none block mb-3">
                  {metric.value}
                </span>
                <span className="font-heading font-bold text-sm text-carbon uppercase tracking-wide block mb-1">
                  {metric.label}
                </span>
              </div>
              
              {/* Metric Description */}
              <p className="font-sans text-stone-600 text-xs sm:text-sm leading-relaxed mt-4">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footnote about demonstration data */}
        <div className="flex justify-end">
          <span className="font-mono text-[9px] text-stone tracking-[0.15em] uppercase font-semibold">
            *UKŁAD DEMONSTRACYJNY — DANE MAJĄ CHARAKTER PRZYKŁADOWY
          </span>
        </div>

      </div>
    </section>
  );
}
