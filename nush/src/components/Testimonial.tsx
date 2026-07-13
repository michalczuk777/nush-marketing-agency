import React from "react";
import { Quote } from "lucide-react";
import { TESTIMONIAL } from "../types";

export default function Testimonial() {
  return (
    <section className="bg-bone py-24 sm:py-32 border-b border-stone/20 relative overflow-hidden">
      {/* Editorial aesthetic: quotes background */}
      <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none select-none">
        <Quote className="w-96 h-96 text-carbon" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        
        {/* Quote Icon */}
        <div className="mb-10 text-ember p-3 bg-carbon/5 rounded-full">
          <Quote className="w-8 h-8 fill-ember text-ember" />
        </div>

        {/* The Quote itself */}
        <blockquote className="mb-10">
          <p className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-carbon tracking-tight leading-snug">
            „{TESTIMONIAL.quote}”
          </p>
        </blockquote>

        {/* Divider line */}
        <div className="w-12 h-[1px] bg-stone-400 mb-8" />

        {/* Signature */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-heading font-bold text-base text-carbon uppercase tracking-wider">
            {TESTIMONIAL.author}
          </span>
          <span className="font-sans text-xs text-stone uppercase tracking-widest font-semibold">
            {TESTIMONIAL.role} — {TESTIMONIAL.company}
          </span>
        </div>

        {/* Client logo representation */}
        <div className="mt-8 opacity-40 select-none">
          <span className="font-sans font-black tracking-[0.2em] text-lg text-carbon">
            {TESTIMONIAL.logoPlaceholder}
          </span>
        </div>

        {/* Footer label indicating placeholder status */}
        <div className="mt-12 bg-stone-300/40 px-3 py-1 rounded-full border border-stone/30 select-none">
          <span className="font-mono text-[9px] text-stone tracking-[0.15em] uppercase font-semibold">
            Opinia demonstracyjna — placeholder do zastąpienia prawdziwą rekomendacją
          </span>
        </div>

      </div>
    </section>
  );
}
