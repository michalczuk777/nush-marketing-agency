import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const links = [['Problemy', '/#problemy'], ['Rozwiązania', '/#rozwiazania'], ['Współpraca', '/#wspolpraca'], ['Realizacja', '/#realizacja'], ['Proces', '/#proces'], ['O nas', '/#o-nas']];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setOpen(false);
    }
  };
  return <>
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="px-6 md:px-8 py-4 flex items-center justify-between gap-6">
        <Link to="/" aria-label="Wróć na stronę główną" className="font-mono font-black text-3xl tracking-tighter text-white hover:text-neon transition-colors">NUSH<span className="text-neon">.</span></Link>
        <div className="hidden xl:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-white/70">{links.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleScroll(e, href)} className="hover:text-neon transition-colors">{label}</a>)}</div>
        <a href="/#kontakt" onClick={(e) => handleScroll(e, '/#kontakt')} className="hidden sm:block bg-[#00ff00] text-black px-5 py-3 text-xs md:text-sm font-black uppercase hover:bg-white hover:-translate-y-0.5 transition-all">BEZPŁATNA DIAGNOZA</a>
        <button type="button" aria-label={open ? 'Zamknij menu' : 'Otwórz menu'} aria-expanded={open} onClick={() => setOpen(!open)} className="xl:hidden text-white hover:text-neon"><span className="sr-only">Menu</span>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="xl:hidden border-t border-white/10 bg-[#050505] px-6 py-5 flex flex-col gap-5 text-sm font-bold uppercase tracking-widest">{links.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleScroll(e, href)} className="hover:text-neon">{label}</a>)}</div>}
    </nav>
    <a href="/#kontakt" onClick={(e) => handleScroll(e, '/#kontakt')} className="sm:hidden fixed bottom-6 left-4 right-4 z-50 bg-[#00ff00] text-black px-4 py-4 text-center text-base font-black uppercase shadow-[0_10px_40px_rgba(0,255,0,0.3)] border border-neon/50">BEZPŁATNA DIAGNOZA</a>
  </>;
}
