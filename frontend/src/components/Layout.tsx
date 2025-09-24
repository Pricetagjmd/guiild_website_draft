import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import HeroCarousel from './HeroCarousel';
import ServiceHighlights from './ServiceHighlights';
import UpdatesSection from './UpdatesSection';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton';

const Layout = () => {
  return (
    <div className="app-shell">
      <Navigation />
      <HeroCarousel />
      <main className="page-content" id="main-content">
        <Outlet />
      </main>
      <ServiceHighlights />
      <UpdatesSection />
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
