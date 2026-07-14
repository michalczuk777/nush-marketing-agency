import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import { motion } from 'motion/react';
import type { BlogPost as BlogPostData } from '../data/blog';
import Seo, { SITE_URL } from './Seo';

type BlogPostProps = { post: BlogPostData };

export default function BlogPost({ post }: BlogPostProps) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description,
    datePublished: post.publishedAt, dateModified: post.updatedAt, inLanguage: 'pl-PL',
    author: { '@type': 'Organization', name: 'NUSH', url: SITE_URL }, publisher: { '@type': 'Organization', name: 'NUSH', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url }, image: `${SITE_URL}/og-image.svg`, keywords: post.tags.join(', '),
  };

  return <><Seo title={`${post.title} | NUSH`} description={post.description} path={`/blog/${post.slug}`} type="article" schema={schema} />
    <article className="border-b border-white/10 px-6 pb-24 pt-28 md:px-10 md:pb-32 md:pt-40"><div className="mx-auto max-w-7xl">
      <div className="mb-12 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[10px] uppercase tracking-widest text-white/45"><a href="/blog" className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-neon"><ArrowLeft size={14} /> Blog NUSH</a><span className="text-neon">/</span><span>{post.category}</span><span className="flex items-center gap-2"><Clock3 size={14} /> {post.readTime}</span></div>
      <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><header className="lg:sticky lg:top-32 lg:self-start"><p className="font-mono text-xs font-bold uppercase tracking-[.22em] text-neon">NUSH / ANALIZA</p><h1 className="mt-6 max-w-3xl text-4xl font-black uppercase leading-[1.05] tracking-tight md:text-6xl">{post.title}</h1><p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65">{post.description}</p><div className="mt-8 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="border border-white/15 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white/50">{tag}</span>)}</div></header>
        <div className="min-w-0 border-l border-white/10 pl-6 md:pl-10"><div className="mb-10 border-b border-neon/30 pb-8 font-mono text-xs uppercase tracking-widest text-white/40">Opublikowano {post.publishedAt}</div><div className="space-y-8 text-base leading-[1.85] text-white/70 md:text-lg">
          {post.blocks.map((block, index) => block.type === 'heading' ? <motion.h2 key={`${block.type}-${index}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-5 text-2xl font-black uppercase leading-tight text-white md:text-3xl">{block.text}</motion.h2> : block.type === 'list' ? <ul key={`${block.type}-${index}`} className="space-y-3 border-l border-neon/60 pl-6 text-white/75">{block.items.map((item) => <li key={item} className="pl-2">{item}</li>)}</ul> : <p key={`${block.type}-${index}`}>{block.text}</p>)}
        </div><div className="mt-16 border-t border-white/10 pt-8"><p className="font-mono text-xs uppercase tracking-widest text-neon">Następny krok</p><p className="mt-4 max-w-xl text-2xl font-black uppercase leading-tight text-white">Masz podobny problem w swoim biznesie?</p><a href="/#kontakt" className="mt-7 inline-flex items-center gap-3 border border-neon px-5 py-4 font-mono text-xs font-bold uppercase tracking-wider text-neon transition-all hover:-translate-y-1 hover:bg-neon hover:text-black">Umów bezpłatną diagnozę <ArrowUpRight size={16} /></a></div></div>
      </div></div></article>
  </>;
}
