/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import BlogIndex from './components/BlogIndex';
import BlogPost from './components/BlogPost';
import CityLandingPage from './components/CityLandingPage';
import Footer from './components/Footer';
import Glossary from './components/Glossary';
import Navbar from './components/Navbar';
import { getBlogPost } from './data/blog';
import { getCityBySlug } from './data/cities';
import LandingPage from './LandingPage';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/blog') {
    return <div className="min-h-screen bg-[#050505] text-white"><Navbar /><main className="pt-20"><BlogIndex /></main><Footer /></div>;
  }

  if (path === '/slownik') {
    return <div className="min-h-screen bg-[#050505] text-white"><Navbar /><main className="pt-20"><Glossary /></main><Footer /></div>;
  }

  if (path.startsWith('/blog/')) {
    const post = getBlogPost(path.slice('/blog/'.length));
    if (post) {
      return <div className="min-h-screen bg-[#050505] text-white"><Navbar /><main className="pt-20"><BlogPost post={post} /></main><Footer /></div>;
    }
  }

  if (path.startsWith('/agencja-marketingowa/')) {
    const city = getCityBySlug(path.slice('/agencja-marketingowa/'.length));
    if (city) return <CityLandingPage city={city} />;
  }

  return <LandingPage />;
}
