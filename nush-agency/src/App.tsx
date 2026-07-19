import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SeoLandingPage from './pages/SeoLandingPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:slug" element={<SeoLandingPage />} />
    </Routes>
  );
}
