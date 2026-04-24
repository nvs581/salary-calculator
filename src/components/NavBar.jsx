import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-badge">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
        </div>
        <div>
          <h1>PH Income Calculator</h1>
          <p className="header-sub">Philippines • 2026 Updated Rates</p>
        </div>
      </div>

      <nav className="nav-tabs">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <span>Government</span>
        </NavLink>
        <NavLink
          to="/freelance"
          className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Freelance</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default NavBar;
