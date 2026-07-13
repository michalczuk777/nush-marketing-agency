import React from "react";

interface LogoProps {
  light?: boolean;
  className?: string;
  showIcon?: boolean;
}

export default function Logo({ light = false, className = "", showIcon = true }: LogoProps) {
  const textColor = light ? "text-bone" : "text-carbon";
  const blockColor = light ? "bg-bone" : "bg-carbon";

  return (
    <div className={`flex items-center gap-3 select-none font-sans ${className}`} id="nush-logo">
      {/* 3x3 Grid Logo Icon */}
      {showIcon && (
        <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-[18px] h-[18px] items-center" aria-hidden="true">
          {/* Row 1 */}
          <div className={`w-1.5 h-1.5 rounded-sm ${blockColor}`}></div>
          <div></div>
          <div className={`w-1.5 h-1.5 rounded-sm ${blockColor}`}></div>

          {/* Row 2 */}
          <div></div>
          <div className="w-1.5 h-1.5 rounded-sm bg-ember"></div>
          <div></div>

          {/* Row 3 */}
          <div className={`w-1.5 h-1.5 rounded-sm ${blockColor}`}></div>
          <div></div>
          <div className={`w-1.5 h-1.5 rounded-sm ${blockColor}`}></div>
        </div>
      )}
      <span className={`font-heading font-extrabold tracking-normal text-xl lowercase ${textColor}`}>
        nush
      </span>
    </div>
  );
}
