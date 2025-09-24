import { NavLink } from 'react-router-dom';
import './layout.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/events', label: 'Events' },
  { path: '/vault', label: 'Vault' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' }
];

const SiteHeader = () => {
  return (
    <header className="site-header">
      <div className="site-header__brand">
        <div className="brand-mark">UG</div>
        <div>
          <p className="brand-title">University Guild</p>
          <p className="brand-subtitle">Serving students since 1895</p>
        </div>
      </div>
      <div className="site-header__search">
        <input type="search" placeholder="Search the guild (coming soon)" aria-label="Site search" />
      </div>
      <nav className="site-header__nav">
        {navLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default SiteHeader;
