import { ArrowUpRight, BookOpen, Clock3 } from 'lucide-react';
import { motion } from 'motion/react';
import { blogPosts } from '../data/blog';
import Seo, { SITE_URL } from './Seo';

const title = 'Blog NUSH | SEO, automatyzacja i dane dla sprzedaży';
const description = 'Praktyczne materiały NUSH o SEO technicznym, automatyzacji sprzedaży B2B, analityce i budowaniu systemów wzrostu.';

export default function BlogIndex() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description, url: `${SITE_URL}/blog`,
    isPartOf: { '@type': 'WebSite', name: 'NUSH', url: SITE_URL },
    mainEntity: { '@type': 'ItemList', itemListElement: blogPosts.map((post, index) => ({ '@type': 'ListItem', position: index + 1, url: `${SITE_URL}/blog/${post.slug}`, name: post.title })) },
  };

  return <>
    <Seo title={title} description={description} path="/blog" schema={schema} />
    <section className="relative overflow-hidden border-b border-white/10 px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-40">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <a href="/" className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/55 transition-colors hover:text-neon">← Wróć do NUSH</a>
        <p className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[.22em] text-neon"><BookOpen size={16} /> NUSH / WIEDZA</p>
        <h1 className="max-w-5xl text-5xl font-black uppercase leading-[1.05] tracking-tight md:text-7xl">Mniej szumu.<br /><span className="text-neon">Więcej systemu.</span></h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">Notatki o tym, jak łączyć marketing, dane, technologię i sprzedaż w rozwiązania, które da się rozwijać</p>
      </div>
    </section>
    <section className="border-b border-white/10 px-6 py-20 md:px-10 md:py-28"><div className="mx-auto max-w-7xl">
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-5"><p className="font-mono text-xs font-bold uppercase tracking-widest text-neon">[WIEDZA] OSTATNIE MATERIAŁY</p><span className="hidden font-mono text-[10px] uppercase tracking-widest text-white/35 sm:block">{blogPosts.length} artykuły</span></div>
      <div className="grid gap-4 lg:grid-cols-3">{blogPosts.map((post, index) => <motion.article key={post.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ delay: index * .08 }} whileHover={{ y: -6 }} className="group flex min-h-[390px] flex-col border border-white/10 bg-[#080808] p-6 transition-colors hover:border-neon/60 md:p-8">
        <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-neon/75"><span>{post.category}</span><span>0{index + 1}</span></div>
        <h2 className="mt-16 text-2xl font-black uppercase leading-[1.1] text-white transition-colors group-hover:text-neon">{post.title}</h2><p className="mt-5 text-sm leading-relaxed text-white/55">{post.description}</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-widest text-white/40"><span className="flex items-center gap-2"><Clock3 size={14} /> {post.readTime}</span><a href={`/blog/${post.slug}`} aria-label={`Czytaj: ${post.title}`} className="inline-flex items-center gap-2 text-white transition-colors hover:text-neon">Czytaj <ArrowUpRight size={15} /></a></div>
      </motion.article>)}</div>
    </div></section>
    <section className="bg-neon px-6 py-16 text-black md:px-10 md:py-20"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><p className="font-mono text-xs font-bold uppercase tracking-widest">NUSH / SYSTEM WZROSTU</p><h2 className="mt-5 max-w-3xl text-3xl font-black uppercase leading-tight md:text-5xl">Dobra lektura to początek. Wynik robi wdrożenie</h2></div><a href="/#kontakt" className="inline-flex items-center gap-3 border-2 border-black px-5 py-4 text-xs font-black uppercase transition-colors hover:bg-black hover:text-neon">Porozmawiajmy <ArrowUpRight size={17} /></a></div></section>
  </>;
}
