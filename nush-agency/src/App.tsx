import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SeoLandingPage from './pages/SeoLandingPage';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<SeoLandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
