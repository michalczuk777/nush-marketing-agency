import React from "react";
import { Linkedin, Instagram, ArrowUp } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import { BRAND_INFO } from "../types";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const servicesLinks = [
    { label: "Strategia wzrostu", href: "#uslugi" },
    { label: "E-commerce", href: "#uslugi" },
    { label: "Performance marketing", href: "#uslugi" },
    { label: "Dane i analityka", href: "#uslugi" },
    { label: "Optymalizacja konwersji", href: "#uslugi" },
    { label: "Automatyzacje", href: "#uslugi" },
  ];

  const companyLinks = [
    { label: "O nas", href: "#o-nas" },
    { label: "Realizacje", href: "#realizacje" },
    { label: "Jak pracujemy", href: "#jak-pracujemy" },
    { label: "Wiedza", href: "#wiedza" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  return (
    <footer className="bg-carbon text-bone pt-20 pb-10 border-t border-stone/20 relative" aria-label="Stopka strony">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand descriptor & slogan */}
          <div className="lg:col-span-4 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="mb-4">
                <Logo light={true} />
              </div>
              <p className="font-mono text-xs text-stone uppercase tracking-widest mb-4">
                {BRAND_INFO.descriptor}
              </p>
              <p className="font-sans text-xs sm:text-sm text-stone/80 max-w-xs">
                {BRAND_INFO.slogan}
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-ember transition-colors duration-200"
                aria-label="Profil NUSH na LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-ember transition-colors duration-200"
                aria-label="Profil NUSH na Instagramie"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Usługi */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-stone mb-6">
              Usługi
            </h3>
            <ul className="flex flex-col gap-3">
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="font-sans text-xs sm:text-sm text-stone/80 hover:text-bone transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Firma */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-stone mb-6">
              Firma
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="font-sans text-xs sm:text-sm text-stone/80 hover:text-bone transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact card & CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between min-h-[160px] bg-white/5 border border-stone/20 p-6 rounded-sm">
            <div>
              <h3 className="font-heading font-extrabold text-base text-bone uppercase mb-1">
                Porozmawiajmy o Twoim biznesie.
              </h3>
              <p className="font-sans text-xs text-stone mb-4">
                Ustalmy dogodny termin na wideorozmowę wstępną.
              </p>
              <a
                href={`mailto:${BRAND_INFO.contactEmail}`}
                className="font-mono text-xs text-ember hover:underline block mb-4"
              >
                {BRAND_INFO.contactEmail}
              </a>
            </div>

            <a href="#kontakt" onClick={(e) => handleScrollTo(e, "#kontakt")}>
              <Button variant="primary" icon={true} className="w-full text-xs py-3">
                Porozmawiajmy
              </Button>
            </a>
          </div>

        </div>

        {/* Divider line */}
        <div className="h-[1px] bg-stone/20 w-full mb-8" />

        {/* Bottom Bar: Copyright and Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 order-2 md:order-1">
            <span className="font-sans text-xs text-stone">
              © {new Date().getFullYear()} NUSH. Wszelkie prawa zastrzeżone.
            </span>
            <span className="text-stone/30">|</span>
            <a href="#" className="font-sans text-xs text-stone hover:text-bone transition-colors duration-200">
              Polityka prywatności
            </a>
            <a href="#" className="font-sans text-xs text-stone hover:text-bone transition-colors duration-200">
              Pliki cookies
            </a>
            <a href="#" className="font-sans text-xs text-stone hover:text-bone transition-colors duration-200">
              Warunki współpracy
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={handleScrollToTop}
            className="w-10 h-10 border border-stone/30 hover:border-bone hover:bg-white/10 flex items-center justify-center rounded-sm text-stone hover:text-bone transition-all duration-200 cursor-pointer order-1 md:order-2"
            aria-label="Wróć na górę strony"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
