export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 xl:max-w-[1440px] xl:mx-auto">
      <div className="px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="#top" aria-label="Przejdź na górę strony" className="font-mono font-black text-3xl tracking-tighter text-white hover:text-neon transition-colors">
            NUSH<span className="text-neon">.</span>
          </a>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white/70">
          <a href="#problemy" className="hover:text-neon transition-colors">Problemy</a>
          <a href="#rozwiazania" className="hover:text-neon transition-colors">Rozwiązania</a>
          <a href="#proces" className="hover:text-neon transition-colors">Proces</a>
        </div>
        <a 
          href="#audyt" 
          className="bg-neon text-black px-6 py-2 text-sm md:text-base font-black uppercase hover:bg-white hover:-translate-y-0.5 transition-all"
        >
          Darmowy Audyt
        </a>
      </div>
    </nav>
  );
}
