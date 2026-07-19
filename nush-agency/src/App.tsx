/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
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
import SEOLinks from './components/SEOLinks';

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-[#050505] text-white font-sans">
      <div className="w-full flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-20">
          <Hero />
          <TechMarquee />
          <Problems />
          <Solutions />
          <EngagementModels />
          <CaseStudy />
          <Process />
          <AboutSection />
          <FAQSection />
          <LeadForm />
          <BrandQuote />
          <SEOLinks />
        </main>
        <Footer />
      </div>
    </div>
  );
}
