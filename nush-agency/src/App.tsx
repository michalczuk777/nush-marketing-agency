/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Solutions from './components/Solutions';
import Process from './components/Process';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-[#050505] text-white font-sans">
      <div className="max-w-[1440px] mx-auto flex flex-col min-h-screen border-x-0 xl:border-x-4 border-[#111]">
        <Navbar />
        <main className="flex-1 pt-20">
          <Hero />
          <Problems />
          <Solutions />
          <Process />
          <LeadForm />
        </main>
        <Footer />
      </div>
    </div>
  );
}
