import { Link } from 'react-router-dom';

const generateSlug = (text: string) => {
  return text.toLowerCase()
    .replace(/[ąćęłńóśźż]/g, c => ({ 'ą':'a', 'ć':'c', 'ę':'e', 'ł':'l', 'ń':'n', 'ó':'o', 'ś':'s', 'ź':'z', 'ż':'z' })[c as string] || c)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

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
            <Link
              key={link}
              to={`/${generateSlug(link)}`}
              className="text-sm text-gray-600 hover:text-white transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
