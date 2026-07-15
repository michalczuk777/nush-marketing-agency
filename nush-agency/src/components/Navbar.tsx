import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [['Problemy', '#problemy'], ['Rozwiązania', '#rozwiazania'], ['Współpraca', '#wspolpraca'], ['Realizacja', '#realizacja'], ['Proces', '#proces'], ['Wiedza', '/blog'], ['Słownik', '/slownik']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const isHome = window.location.pathname === '/';
  const homeHref = isHome ? '#top' : '/';
  const resolveHref = (href: string) => (!isHome && href.startsWith('#') ? `/${href}` : href);

  return <>
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="px-6 md:px-8 py-4 flex items-center justify-between gap-6">
        <a href={homeHref} aria-label="Przejdź na stronę główną NUSH" className="font-mono font-black text-3xl tracking-tighter text-white hover:text-neon transition-colors">NUSH<span className="text-neon">.</span></a>
        <div className="hidden xl:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-white/70">{links.map(([label, href]) => <a key={href} href={resolveHref(href)} className="hover:text-neon transition-colors">{label}</a>)}</div>
        <a href="#kontakt" className="hidden sm:block bg-[#00ff00] text-black px-5 py-3 text-xs md:text-sm font-black uppercase hover:bg-white hover:-translate-y-0.5 transition-all">BEZPŁATNA DIAGNOZA</a>
        <button type="button" aria-label={open ? 'Zamknij menu' : 'Otwórz menu'} aria-expanded={open} onClick={() => setOpen(!open)} className="xl:hidden text-white hover:text-neon"><span className="sr-only">Menu</span>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="xl:hidden border-t border-white/10 bg-[#050505] px-6 py-5 flex flex-col gap-5 text-sm font-bold uppercase tracking-widest">{links.map(([label, href]) => <a key={href} href={resolveHref(href)} onClick={() => setOpen(false)} className="hover:text-neon">{label}</a>)}</div>}
    </nav>
    <a href="#kontakt" className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#00ff00] text-black px-4 py-4 text-center text-base font-black uppercase shadow-[0_-10px_30px_rgba(0,255,0,0.2)]">BEZPŁATNA DIAGNOZA</a>
  </>;
}
