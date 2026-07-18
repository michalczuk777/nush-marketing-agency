import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { blogPosts } from '../src/data/blog';
import { cities, getCityDescription, getCityTitle } from '../src/data/cities';
import { GEO_SCHEMA } from '../src/components/GeoServicePage';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const distDir = path.join(projectDir, 'dist');
const siteUrl = 'https://nush.pl';

type Route = {
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NUSH',
  url: siteUrl,
  email: 'kontakt@nush.pl',
  areaServed: 'Polska',
  knowsAbout: ['SEO', 'e-commerce', 'automatyzacja marketingu', 'GEO', 'AI Search', 'entity SEO'],
};

const routes: Route[] = [
  {
    path: '/',
    title: 'NUSH | Systemy sprzedaży, e-commerce i automatyzacja',
    description: 'NUSH łączy e-commerce, marketing, dane i automatyzację w systemy sprzedaży dla firm handlowych i B2B.',
    schema: [organization, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'NUSH', url: siteUrl, inLanguage: 'pl-PL' }],
  },
  {
    path: '/widocznosc-w-ai',
    title: 'Widoczność w AI i GEO dla firm | NUSH',
    description: 'Pomagamy firmom zwiększać widoczność w Google AI Overviews, ChatGPT, Gemini, Copilot i Perplexity. Audyt GEO, architektura treści, entity SEO i techniczne wdrożenia.',
    schema: GEO_SCHEMA,
  },
  {
    path: '/blog',
    title: 'Blog NUSH | Marketing, SEO, dane i automatyzacja',
    description: 'Praktyczne materiały NUSH o SEO, e-commerce, automatyzacji sprzedaży, analityce i widoczności marki w AI Search.',
    schema: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Blog NUSH', url: `${siteUrl}/blog`, inLanguage: 'pl-PL' },
  },
  {
    path: '/slownik',
    title: 'Słownik marketingu i sprzedaży | NUSH',
    description: 'Prosty słownik pojęć marketingowych, sprzedażowych, analitycznych i technologicznych: SEO, CTA, GEO, AI Search, CRM, KPI, API i więcej.',
    schema: { '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: 'Słownik marketingu i sprzedaży NUSH', url: `${siteUrl}/slownik`, inLanguage: 'pl-PL' },
  },
  ...blogPosts.map((post): Route => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | NUSH`,
    description: post.description,
    type: 'article',
    schema: {
      '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description,
      datePublished: post.publishedAt, dateModified: post.updatedAt, inLanguage: 'pl-PL',
      author: { '@type': 'Organization', name: 'NUSH', url: siteUrl }, publisher: { '@type': 'Organization', name: 'NUSH', url: siteUrl },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` }, image: `${siteUrl}/og-image.svg`, keywords: post.tags.join(', '),
    },
  })),
  ...cities.map((city): Route => ({
    path: `/agencja-marketingowa/${city.slug}`,
    title: getCityTitle(city),
    description: getCityDescription(city),
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: getCityTitle(city), description: getCityDescription(city), url: `${siteUrl}/agencja-marketingowa/${city.slug}`, inLanguage: 'pl-PL' },
  })),
];

const escapeAttr = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const renderHead = (route: Route) => {
  const canonical = `${siteUrl}${route.path === '/' ? '' : route.path}`;
  const schema = route.schema ? `<script id="nush-schema" type="application/ld+json">${JSON.stringify(route.schema).replaceAll('<', '\\u003c')}</script>` : '';
  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeAttr(route.title)}</title>
    <meta name="description" content="${escapeAttr(route.description)}" />
    <meta name="author" content="NUSH" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#050505" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta property="og:type" content="${route.type || 'website'}" />
    <meta property="og:site_name" content="NUSH" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:title" content="${escapeAttr(route.title)}" />
    <meta property="og:description" content="${escapeAttr(route.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}/og-image.svg" />
    <meta property="og:image:alt" content="${escapeAttr(route.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(route.title)}" />
    <meta name="twitter:description" content="${escapeAttr(route.description)}" />
    <meta name="twitter:image" content="${siteUrl}/og-image.svg" />
    ${schema}
  </head>`;
};

const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

for (const route of routes) {
  const markup = renderToStaticMarkup(<App initialPath={route.path} />);
  const html = template.replace(/<head>[\s\S]*?<\/head>/, renderHead(route)).replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  const outputPath = route.path === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.path.slice(1), 'index.html');
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

console.log(`Prerendered ${routes.length} routes.`);
