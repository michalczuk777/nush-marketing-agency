import React from "react";
import { TRUSTED_BRANDS } from "../types";

export default function TrustedBrands() {
  // Map of unique typographic styles for each brand to make them look like real high-end monochrome logos
  const brandStyles: { [key: string]: React.ReactNode } = {
    nordly: (
      <span className="font-heading font-extrabold tracking-[0.2em] text-lg uppercase text-carbon/60">
        NORDLY
      </span>
    ),
    motivo: (
      <span className="font-sans font-light text-xl tracking-tight text-carbon/60">
        m<span className="font-semibold text-ember">o</span>tivo
      </span>
    ),
    plantwear: (
      <span className="font-sans font-semibold tracking-[0.1em] text-base uppercase text-carbon/60 flex items-center gap-1.5">
        <span className="w-2 h-2 bg-carbon/40 rounded-full"></span>PLANTWEAR
      </span>
    ),
    verto: (
      <span className="font-mono text-base font-semibold tracking-widest uppercase text-carbon/60">
        VE.RTO
      </span>
    ),
    komodo: (
      <span className="font-heading font-bold text-lg tracking-normal lowercase text-carbon/60">
        komodo
      </span>
    ),
  };

  return (
    <section id="trusted-brands" className="bg-bone border-y border-stone/20 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Label */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-1.5 h-1.5 bg-ember rounded-full"></span>
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-carbon/60 uppercase font-semibold">
              ZAUFALI NAM AMBITNI PARTNERZY
            </h2>
          </div>

          {/* Monochrome Brands Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-12 items-center justify-items-start lg:justify-items-center w-full">
            {TRUSTED_BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="transition-all duration-300 hover:brightness-50 flex items-center justify-center select-none"
                title={`Logotyp firmy ${brand.name}`}
              >
                {brandStyles[brand.id] || (
                  <span className="font-sans font-bold text-carbon/50 uppercase">{brand.name}</span>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
