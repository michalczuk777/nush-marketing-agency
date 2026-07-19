import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';

// Helper to capitalize and format slug to human readable title
const formatSlug = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function SeoLandingPage() {
  const { slug } = useParams();
  const title = slug ? formatSlug(slug) : 'E-commerce & B2B Solutions';
  const pageTitle = `${title} | NUSH`;
  const metaDesc = `Sprawdź, jak ${title.toLowerCase()} wpływa na wzrost sprzedaży i automatyzację w Twojej firmie. Rozwiązujemy konkretne problemy z technologią i marketingiem B2B.`;

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#050505] text-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-neon mb-5">
            [ WIEDZA I ROZWIĄZANIA ]
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-[1.1] mb-8">
            {title}
          </h1>
          <div className="prose prose-invert prose-lg max-w-none text-white/70">
            <p className="text-xl md:text-2xl font-semibold text-white mb-6">
              Jeśli Twój biznes napotyka wyzwania w tym obszarze, prawdopodobnie tracisz czas na ręczną pracę lub przepalasz budżet na nieskuteczne rozwiązania.
            </p>
            <p>
              W NUSH nie tworzymy teorii. Podchodzimy do problemów czysto inżynieryjnie. Zamiast oferować gotowe paczki usług, audytujemy to konkretne wąskie gardło i wdrażamy dedykowane skrypty, integracje API lub optymalizujemy architekturę obecnego systemu.
            </p>
            <p className="mt-4">
              Nasze podejście opiera się na twardych danych: mierzymy obecny stan, wdrażamy zmiany w krótkich, zwinnych sprintach i raportujemy konkretny wpływ na konwersję i czas pracy Twojego zespołu.
            </p>
          </div>
        </div>
      </main>

      <LeadForm />
      <Footer />
    </div>
  );
}
