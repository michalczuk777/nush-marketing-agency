import { Link } from 'react-router-dom';
import { seoPages } from '../data/seoPages';

export default function SEOLinks() {
  const categories = [
    'E-COMMERCE I STRONY WWW',
    'AUTOMATYZACJE I API',
    'ANALITYKA I SEO'
  ] as const;

  return (
    <section className="bg-black py-16 px-6 md:px-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-gray-500 text-xs font-mono font-bold uppercase tracking-[0.2em] mb-12 border-b border-white/10 pb-6">
          Z CZYM MOŻEMY CI POMÓC?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {categories.map((category) => {
            const links = seoPages.filter(page => page.category === category);
            
            return (
              <div key={category}>
                <h4 className="text-white/40 text-xs font-mono font-bold uppercase tracking-widest mb-6">
                  {category}
                </h4>
                <div className="flex flex-col gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.slug}
                      to={`/${link.slug}`}
                      className="text-sm text-gray-400 hover:text-neon transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
