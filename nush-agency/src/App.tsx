/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import BlogIndex from './components/BlogIndex';
import BlogPost from './components/BlogPost';
import CityLandingPage from './components/CityLandingPage';
import Footer from './components/Footer';
import Glossary from './components/Glossary';
import GeoServicePage from './components/GeoServicePage';
import Navbar from './components/Navbar';
import { getBlogPost } from './data/blog';
import { getCityBySlug } from './data/cities';
import LandingPage from './LandingPage';

type AppProps = { initialPath?: string };

export default function App({ initialPath }: AppProps = {}) {
  const browserPath = typeof window === 'undefined' ? '/' : window.location.pathname;
  const path = (initialPath || browserPath).replace(/\/+$/, '') || '/';

  if (path === '/widocznosc-w-ai') {
    return <div className="min-h-screen bg-[#050505] text-white"><Navbar currentPath={path} /><GeoServicePage /><Footer /></div>;
  }

  if (path === '/blog') {
    return <div className="min-h-screen bg-[#050505] text-white"><Navbar currentPath={path} /><main className="pt-20"><BlogIndex /></main><Footer /></div>;
  }

  if (path === '/slownik') {
    return <div className="min-h-screen bg-[#050505] text-white"><Navbar currentPath={path} /><main className="pt-20"><Glossary /></main><Footer /></div>;
  }

  if (path.startsWith('/blog/')) {
    const post = getBlogPost(path.slice('/blog/'.length));
    if (post) {
      return <div className="min-h-screen bg-[#050505] text-white"><Navbar currentPath={path} /><main className="pt-20"><BlogPost post={post} /></main><Footer /></div>;
    }
  }

  if (path.startsWith('/agencja-marketingowa/')) {
    const city = getCityBySlug(path.slice('/agencja-marketingowa/'.length));
    if (city) return <CityLandingPage city={city} currentPath={path} />;
  }

  return <LandingPage />;
}
