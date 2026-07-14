import { Facebook, Instagram, Linkedin } from 'lucide-react';

const utm = 'utm_source=landing&utm_medium=footer&utm_campaign=social_profile';

const socials = [
  { label: 'LinkedIn', href: `https://www.linkedin.com/company/nush-agency/?${utm}`, icon: Linkedin },
  { label: 'Facebook', href: `https://www.facebook.com/nushagency/?${utm}`, icon: Facebook },
];

export default function Footer() {
  return <footer className="bg-black px-6 py-8 md:px-10">
    <div className="mx-auto flex max-w-7xl flex-col gap-7 text-[10px] font-mono uppercase tracking-widest text-white/40 md:flex-row md:items-center md:justify-between">
      <span>© 2026 NUSH</span>
      <div className="flex flex-wrap items-center justify-center gap-5 md:justify-end">
        <a href="/blog" className="transition-colors hover:text-neon">Wiedza</a>
        <a href="/slownik" className="transition-colors hover:text-neon">Słownik</a>
        {socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-neon" aria-label={`NUSH na ${label}`} title={`NUSH na ${label}`}><Icon size={14} aria-hidden="true" /> {label}</a>)}
        <span className="inline-flex cursor-not-allowed items-center gap-2 text-white/20" aria-label="Instagram wkrótce" title="Instagram wkrótce"><Instagram size={14} aria-hidden="true" /> Instagram / wkrótce</span>
        <a href="mailto:kontakt@nush.pl" className="transition-colors hover:text-neon">kontakt@nush.pl</a>
      </div>
    </div>
  </footer>;
}
