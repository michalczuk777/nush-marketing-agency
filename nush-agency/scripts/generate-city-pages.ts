import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cities, getCityDescription, getCityTitle } from '../src/data/cities';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const cityRoot = path.join(projectDir, 'agencja-marketingowa');
const siteUrl = 'https://nush.pl';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const renderHtml = (city: (typeof cities)[number]) => {
  const canonical = `${siteUrl}/agencja-marketingowa/${city.slug}`;
  const title = escapeHtml(getCityTitle(city));
  const description = escapeHtml(getCityDescription(city));

  return `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="NUSH" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#050505" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="NUSH" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}/og-image.svg" />
    <meta property="og:image:alt" content="${title}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${siteUrl}/og-image.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
};

const baseUrls = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: '/blog/techniczne-seo-w-e-commerce', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/automatyzacja-sprzedazy-b2b', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/analityka-marketingowa-bez-chaosu', changefreq: 'monthly', priority: '0.8' },
  { loc: '/slownik', changefreq: 'monthly', priority: '0.7' },
];

const renderSitemap = () => {
  const entries = [
    ...baseUrls,
    ...cities.map((city) => ({
      loc: `/agencja-marketingowa/${city.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];

  const urls = entries
    .map(
      (entry) =>
        `  <url><loc>${siteUrl}${entry.loc}</loc><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority></url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

await rm(cityRoot, { recursive: true, force: true });

for (const city of cities) {
  const outputDir = path.join(cityRoot, city.slug);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), renderHtml(city), 'utf8');
}

await writeFile(path.join(projectDir, 'public', 'sitemap.xml'), renderSitemap(), 'utf8');

console.log(`Generated ${cities.length} city landing entry pages and sitemap.xml.`);
