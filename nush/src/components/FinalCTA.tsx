import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowRight, Check } from "lucide-react";
import Button from "./Button";
import { BRAND_INFO } from "../types";

export default function FinalCTA() {
  const [selectedTopic, setSelectedTopic] = useState("ecommerce");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const topics = [
    { id: "ecommerce", label: "Skalowanie E-commerce" },
    { id: "marketing", label: "Performance Marketing" },
    { id: "analytics", label: "Dane i automatyzacja" },
    { id: "full", label: "Pełny audyt wzrostu" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", company: "", message: "" });
      }, 5000);
    }
  };

  return (
    <section id="kontakt" className="bg-carbon text-bone py-24 sm:py-32 relative overflow-hidden border-b border-stone/20">
      
      {/* Giant subtle background wordmark */}
      <div className="absolute bottom-[-15%] left-[5%] right-[5%] text-[15vw] font-black font-heading leading-none text-white/[0.015] select-none pointer-events-none tracking-tighter lowercase text-center">
        nush
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-ember rounded-full animate-pulse"></span>
            <span className="font-mono text-xs tracking-[0.2em] text-stone uppercase font-semibold">
              KONSULTACJA I ROZMOWA
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] text-bone uppercase mb-6">
            Zbudujmy to, co będzie
            <br />
            <span className="text-stone">napędzać Twój biznes dalej.</span>
          </h2>

          <p className="font-sans text-stone/80 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
            Zacznijmy od rozmowy o tym, gdzie jesteś, co dziś ogranicza sprzedaż i jaki system jest potrzebny, żeby ruszyć dalej. Analizujemy bez zbędnych zobowiązań.
          </p>

          <div className="flex flex-col gap-4 border-t border-stone/20 pt-8 max-w-md">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-ember" />
              <div>
                <span className="font-mono text-[9px] text-stone uppercase tracking-widest block">BEZPOŚREDNI ADRES EMAIL</span>
                <a href={`mailto:${BRAND_INFO.contactEmail}`} className="font-sans font-medium text-sm text-bone hover:text-ember transition-colors duration-200">
                  {BRAND_INFO.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Discovery Form */}
        <div className="lg:col-span-6">
          <div className="bg-bone text-carbon p-8 rounded-sm border border-stone/30 shadow-2xl shadow-carbon/40 relative">
            
            <h3 className="font-heading font-extrabold text-xl text-carbon uppercase mb-4 tracking-wide">
              Umów rozmowę wstępną
            </h3>
            <p className="font-sans text-stone-600 text-xs sm:text-sm mb-6 leading-relaxed">
              Wypełnij krótki formularz, a nasz partner operacyjny skontaktuje się z Tobą w ciągu 24 godzin.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 border border-green-400 text-green-900 p-6 rounded-sm flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-12 h-12 bg-green-200 text-green-800 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold uppercase text-sm mb-2">Dziękujemy za kontakt!</h4>
                <p className="font-sans text-xs max-w-xs text-green-800 leading-relaxed">
                  Twój formularz został wysłany. Nasz zespół skontaktuje się z Tobą na podany adres e-mail wkrótce.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Topic Select */}
                <div>
                  <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest block mb-2 font-semibold">
                    Co jest głównym wyzwaniem?
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {topics.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTopic(t.id)}
                        className={`text-left px-3 py-2.5 rounded-sm text-xs font-medium border transition-all duration-200 cursor-pointer ${
                          selectedTopic === t.id
                            ? "bg-carbon text-bone border-carbon"
                            : "bg-carbon/5 text-stone-700 border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="font-mono text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
                    Imię i nazwisko *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="np. Jan Kowalski"
                    className="px-4 py-3 bg-carbon/5 text-carbon text-xs rounded-sm border border-stone-200 focus:border-stone-400 focus:bg-bone focus:outline-none transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-mono text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
                    Adres e-mail *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="np. jan@twojafirma.pl"
                    className="px-4 py-3 bg-carbon/5 text-carbon text-xs rounded-sm border border-stone-200 focus:border-stone-400 focus:bg-bone focus:outline-none transition-all duration-200"
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="company" className="font-mono text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
                    Nazwa firmy / URL sklepu
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="np. www.sklep.pl"
                    className="px-4 py-3 bg-carbon/5 text-carbon text-xs rounded-sm border border-stone-200 focus:border-stone-400 focus:bg-bone focus:outline-none transition-all duration-200"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="font-mono text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
                    Dodaj komentarz (opcjonalnie)
                  </label>
                  <textarea
                    id="message"
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Opisz krótko obecną sytuację lub wyzwania..."
                    className="px-4 py-3 bg-carbon/5 text-carbon text-xs rounded-sm border border-stone-200 focus:border-stone-400 focus:bg-bone focus:outline-none transition-all duration-200 resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <Button type="submit" variant="primary" icon={true} className="w-full mt-2 py-4">
                  Porozmawiajmy
                </Button>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
