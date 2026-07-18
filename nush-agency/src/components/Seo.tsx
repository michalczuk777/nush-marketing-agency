/// <reference types="vite/client" />
import { useEffect } from 'react';

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
export const SITE_URL = (viteEnv?.VITE_SITE_URL || 'https://nush.pl').replace(/\/$/, '');
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export default function Seo({ title, description, path = '/', type = 'website', image = DEFAULT_IMAGE, schema }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path === '/' ? '' : `/${path.replace(/^\//, '')}`}`;
    document.title = title;
    document.documentElement.lang = 'pl';
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large');
    setMeta('name', 'author', 'NUSH');
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'NUSH');
    setMeta('property', 'og:locale', 'pl_PL');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:alt', title);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'theme-color', '#050505');
    setLink('canonical', url);

    let script = document.head.querySelector<HTMLScriptElement>('#nush-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'nush-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = schema ? JSON.stringify(schema) : '';
  }, [description, image, path, schema, title, type]);

  return null;
}
