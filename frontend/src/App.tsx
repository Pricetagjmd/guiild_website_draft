import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import Vault from './pages/Vault';
import Placeholder from './pages/Placeholder';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/vault" element={<Vault />} />
        <Route
          path="/community"
          element={<Placeholder title="Community" description="Community hub coming soon." />}
        />
        <Route
          path="/resources"
          element={<Placeholder title="Resources" description="Resource library coming soon." />}
        />
        <Route
          path="/contact"
          element={<Placeholder title="Contact" description="Contact channels coming soon." />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
