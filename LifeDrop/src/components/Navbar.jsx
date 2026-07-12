import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-icon">🩸</span>
          <span className="navbar-logo-text">LifeDrop</span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="navbar-toggle-bar"></span>
          <span className="navbar-toggle-bar"></span>
          <span className="navbar-toggle-bar"></span>
        </button>

        <div className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
          <NavLink to="/" className="navbar-link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/search-donor" className="navbar-link" onClick={closeMenu}>
            Find Donor
          </NavLink>
          <NavLink to="/blood-request" className="navbar-link" onClick={closeMenu}>
            Request Blood
          </NavLink>
          <NavLink to="/about" className="navbar-link" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/contact" className="navbar-link" onClick={closeMenu}>
            Contact
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className="navbar-link" onClick={closeMenu}>
                Dashboard
              </NavLink>
              <button className="btn btn-outline navbar-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar-link" onClick={closeMenu}>
                Login
              </NavLink>
              <Link to="/register" className="btn btn-primary navbar-btn" onClick={closeMenu}>
                Become a Donor
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;