import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';
import { seoPages } from '../data/seoPages';

const formatSlugFallback = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function SeoLandingPage() {
  const { slug } = useParams();
  
  // Znajdź stronę w bazie (lub użyj fallbacka, jeśli slug to stary adres)
  const pageData = slug ? seoPages.find(p => p.slug === slug) : undefined;
  
  const title = pageData ? pageData.title : (slug ? formatSlugFallback(slug) : 'Wsparcie Techniczne B2B');
  const pageTitle = `${title} | NUSH Systemy E-commerce`;
  const metaDesc = pageData ? pageData.metaDescription : `Sprawdź, jak ${title.toLowerCase()} wpływa na wzrost sprzedaży i automatyzację w Twojej firmie. Technologiczne ramię B2B.`;
  const problemText = pageData?.problemText || 'Jeśli Twój biznes napotyka wyzwania w tym obszarze, prawdopodobnie tracisz czas na ręczną pracę lub przepalasz budżet na nieskuteczne rozwiązania.';
  const solutionText = pageData?.solutionText || 'Pochodzimy do problemów czysto inżynieryjnie. Zamiast oferować gotowe paczki usług, audytujemy to konkretne wąskie gardło i wdrażamy dedykowane skrypty, integracje API lub optymalizujemy architekturę obecnego systemu.';

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
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-[1.1] mb-12">
            {title}
          </h1>
          <div className="prose prose-invert prose-lg max-w-none text-white/70">
            <div className="mb-10 bg-white/5 border-l-2 border-white/20 p-6 md:p-8">
              <h2 className="text-sm font-mono text-white/50 mb-4 uppercase tracking-widest">Problem z którym się mierzysz</h2>
              <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                {problemText}
              </p>
            </div>
            
            <div className="mb-10 p-6 md:p-8">
              <h2 className="text-sm font-mono text-neon mb-4 uppercase tracking-widest">Inżynieryjne rozwiązanie NUSH</h2>
              <p className="text-lg md:text-xl leading-relaxed">
                {solutionText}
              </p>
            </div>
            
            <p className="text-base text-white/50 border-t border-white/10 pt-8 mt-8">
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
