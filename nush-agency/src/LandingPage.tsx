import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Solutions from './components/Solutions';
import EngagementModels from './components/EngagementModels';
import CaseStudy from './components/CaseStudy';
import Process from './components/Process';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import BrandQuote from './components/BrandQuote';
import Seo, { SITE_URL } from './components/Seo';

export default function LandingPage() {
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'NUSH', url: SITE_URL, email: 'kontakt@nush.pl', description: 'NUSH łączy e-commerce, marketing, dane i automatyzację w systemy sprzedaży dla firm handlowych i B2B.', areaServed: 'PL', knowsAbout: ['e-commerce', 'SEO techniczne', 'automatyzacja sprzedaży', 'analityka marketingowa'] },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'NUSH', url: SITE_URL, inLanguage: 'pl-PL' },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      ['Czy pracujecie tylko z e-commerce?', 'Nie. Pracujemy z firmami handlowymi, dystrybucją, produkcją i B2B.'],
      ['Od czego zaczyna się współpraca?', 'Od diagnozy danych, procesów i ograniczeń, a następnie ustalenia konkretnego zakresu prac.'],
      ['Czy wdrażacie rozwiązania w istniejącym stacku?', 'Tak. Zaczynamy od istniejących narzędzi i dokładamy tylko elementy, które poprawiają przepływ pracy lub pomiar.'],
    ].map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ];

  return <div id="top" className="min-h-screen bg-[#050505] font-sans text-white"><Seo title="NUSH | Systemy sprzedaży, e-commerce i automatyzacja" description="NUSH łączy e-commerce, marketing, dane i automatyzację w systemy sprzedaży dla firm handlowych i B2B." path="/" schema={schema} /><div className="flex min-h-screen w-full flex-col"><Navbar /><main className="flex-1 pt-20"><Hero /><Problems /><Solutions /><EngagementModels /><CaseStudy /><Process /><AboutSection /><FAQSection /><LeadForm /><BrandQuote /></main><Footer /></div></div>;
}
