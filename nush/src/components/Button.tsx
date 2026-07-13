import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  icon?: boolean;
  light?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  variant = "primary",
  children,
  icon = true,
  light = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3.5 font-sans font-medium text-sm tracking-wide transition-all duration-300 rounded-sm cursor-pointer select-none outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ember";
  
  const variants = {
    primary: "bg-ember text-bone hover:bg-[#e04e30] hover:shadow-lg hover:shadow-ember/10",
    secondary: light
      ? "border border-stone/30 text-bone hover:bg-white/10 hover:border-bone/60"
      : "border border-stone/50 text-carbon hover:bg-carbon/5 hover:border-carbon/60",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
      )}
    </button>
  );
}
