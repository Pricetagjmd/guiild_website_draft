import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home';
import EventsPage from './pages/Events';
import VaultPage from './pages/Vault';
import PlaceholderPage from './pages/Placeholder';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/services" element={<PlaceholderPage title="Services" />} />
        <Route path="/about" element={<PlaceholderPage title="About" />} />
        <Route path="*" element={<PlaceholderPage title="Coming Soon" />} />
      </Routes>
    </Layout>
  );
};

export default App;
