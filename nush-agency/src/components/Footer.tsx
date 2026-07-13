export default function Footer() {
  return (
    <footer className="bg-[#000] border-t border-white/10 px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <span>&copy; {new Date().getFullYear()} NUSH AGENCY</span>
          <span className="hidden md:inline">|</span>
          <a href="mailto:contact@nush.tech" className="hover:text-neon transition-colors">CONTACT@NUSH.TECH</a>
        </div>
        
        <div className="flex gap-4 underline decoration-neon/30">
          <a href="#" className="hover:text-neon transition-colors">POLITYKA PRYWATNOŚCI</a>
          <a href="#" className="hover:text-neon transition-colors">COOKIES</a>
        </div>
      </div>
    </footer>
  );
}
