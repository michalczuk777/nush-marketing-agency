import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Usługi", href: "#uslugi" },
    { label: "Realizacje", href: "#realizacje" },
    { label: "Jak pracujemy", href: "#jak-pracujemy" },
    { label: "O nas", href: "#o-nas" },
    { label: "Wiedza", href: "#wiedza" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-carbon/95 border-b border-stone/20 backdrop-blur-md py-3.5"
            : "bg-transparent py-5"
        }`}
        id="app-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="focus:outline-none" onClick={(e) => handleLinkClick(e, "#")}>
            <Logo light={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Główne menu">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans font-medium text-xs tracking-wider uppercase text-stone hover:text-bone transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href="#kontakt" onClick={(e) => handleLinkClick(e, "#kontakt")}>
              <Button variant="primary" icon={true}>
                Porozmawiajmy
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-bone p-2 focus:outline-none"
            aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-carbon z-40 transition-all duration-300 md:hidden flex flex-col justify-between px-8 py-24 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-heading font-bold text-3xl text-bone tracking-tight hover:text-ember transition-colors duration-200"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div className="h-[1px] bg-stone/20"></div>
          <p className="font-mono text-xs text-stone uppercase tracking-widest">
            Embedded commerce & growth team
          </p>
          <a href="#kontakt" onClick={(e) => handleLinkClick(e, "#kontakt")} className="w-full">
            <Button variant="primary" icon={true} className="w-full py-4 text-base">
              Porozmawiajmy
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
