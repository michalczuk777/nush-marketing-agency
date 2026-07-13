import React from "react";

interface SectionLabelProps {
  number?: string;
  text: string;
  light?: boolean;
}

export default function SectionLabel({ number, text, light = false }: SectionLabelProps) {
  const numberColor = "text-ember";
  const textColor = light ? "text-stone/80" : "text-carbon/60";

  return (
    <div className="flex items-center gap-2 select-none tracking-[0.15em] font-mono text-xs uppercase" id={`label-${text.toLowerCase().replace(/\s+/g, "-")}`}>
      {number && <span className={`${numberColor} font-semibold`}>{number}</span>}
      {number && <span className={light ? "text-stone/40" : "text-stone"}>·</span>}
      <span className={`${textColor} font-medium`}>{text}</span>
    </div>
  );
}
