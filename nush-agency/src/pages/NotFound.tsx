import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-[#050505] text-white">
      <Helmet>
        <title>Nie znaleziono strony (404) | NUSH</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-32 pb-16">
        <h1 className="text-9xl font-black text-neon mb-4 font-mono">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6">
          Ten system nie istnieje
        </h2>
        <p className="text-lg text-white/50 max-w-md mb-10">
          Szukana podstrona została przeniesiona, usunięta lub zgłosiła błąd połączenia z serwerem. 
        </p>
        <Link 
          to="/" 
          className="bg-neon text-black px-8 py-4 text-sm font-black uppercase hover:bg-white hover:-translate-y-1 transition-all"
        >
          Wróć do centrali (Strona Główna)
        </Link>
      </main>

      <Footer />
    </div>
  );
}
