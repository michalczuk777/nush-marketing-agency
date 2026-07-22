import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import { seoPages } from '../data/seoPages';

export default function SeoLandingPage() {
  const { slug } = useParams();
  
  // Znajdź stronę w bazie
  const pageData = slug ? seoPages.find(p => p.slug === slug) : undefined;
  
  if (!pageData) {
    return <NotFound />;
  }
  
  const title = pageData.title;
  const pageTitle = `${title} | NUSH Systemy E-commerce`;
  const metaDesc = pageData.metaDescription;
  const problemText = pageData.problemText;
  const solutionText = pageData.solutionText;

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#050505] text-white pb-24 sm:pb-0">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={`https://nush.pl/${slug}`} />
        <meta property="twitter:card" content="summary_large_image" />
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
