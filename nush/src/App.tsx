/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBrands from "./components/TrustedBrands";
import ServicesGrid from "./components/ServicesGrid";
import CaseStudyShowcase from "./components/CaseStudyShowcase";
import CollaborationModel from "./components/CollaborationModel";
import ProcessSteps from "./components/ProcessSteps";
import MetricsSection from "./components/MetricsSection";
import Testimonial from "./components/Testimonial";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-bone text-carbon font-sans selection:bg-ember selection:text-bone min-h-screen flex flex-col">
      {/* Header / Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* H1 is inside Hero */}
        <Hero />
        
        <TrustedBrands />
        
        <ServicesGrid />
        
        <CaseStudyShowcase />
        
        <CollaborationModel />
        
        <ProcessSteps />
        
        <MetricsSection />
        
        <Testimonial />
        
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

