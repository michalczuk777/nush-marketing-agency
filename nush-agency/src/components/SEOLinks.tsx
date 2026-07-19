export default function SEOLinks() {
  const links = [
    "Tworzenie szybkich stron WWW",
    "Optymalizacja sklepu e-commerce",
    "Integracja BaseLinker z księgowością",
    "Dlaczego strona wolno działa?",
    "Automatyzacja obsługi zamówień",
    "Poprawa widoczności w Google",
    "Analityka i wdrażanie GA4",
    "Wsparcie techniczne dla B2B Wrocław"
  ];

  return (
    <section className="bg-black py-12 px-6 md:px-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-gray-500 text-xs font-mono font-bold uppercase tracking-widest mb-6">
          POPULARNE PROBLEMY, KTÓRE ROZWIĄZUJEMY:
        </h3>
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-gray-600 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
