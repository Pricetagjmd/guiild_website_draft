import HeroCarousel from '../components/HeroCarousel';
import ServiceHighlights from '../components/ServiceHighlights';
import UpdatesSection from '../components/UpdatesSection';
import ChatAssistant from '../components/ChatAssistant';
import './pages.css';

const HomePage = () => {
  return (
    <div className="page-section">
      <HeroCarousel />
      <ServiceHighlights />
      <UpdatesSection />
      <ChatAssistant />
    </div>
  );
};

export default HomePage;
