import fs from 'fs';
import path from 'path';
import { seoPages } from './src/data/seoPages';

const DOMAIN = 'https://nush.pl';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${seoPages.map(page => `  <url>
    <loc>${DOMAIN}/${page.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully.');
