import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navigation = () => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-logo">
          <span className="site-logo__mark">G</span>
          <span className="site-logo__text">Guild Collective</span>
        </NavLink>
        <nav aria-label="Primary">
          <ul className="site-nav">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/vault">Vault</NavLink>
            </li>
            <li>
              <NavLink to="/community">Community</NavLink>
            </li>
            <li>
              <NavLink to="/resources">Resources</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
        <SearchBar placeholder="Search site" />
      </div>
    </header>
  );
};

export default Navigation;
