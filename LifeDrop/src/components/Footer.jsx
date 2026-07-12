import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <div className="footer-logo">
            <span className="footer-logo-icon">🩸</span>
            <span className="footer-logo-text">LifeDrop</span>
          </div>
          <p className="footer-description">
            Connecting blood donors with those in need. Every donation saves up to
            three lives.
          </p>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Quick Links</h4>
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/search-donor" className="footer-link">
            Find Donor
          </Link>
          <Link to="/blood-request" className="footer-link">
            Request Blood
          </Link>
          <Link to="/about" className="footer-link">
            About Us
          </Link>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Support</h4>
          <Link to="/contact" className="footer-link">
            Contact Us
          </Link>
          <Link to="/register" className="footer-link">
            Become a Donor
          </Link>
          <Link to="/login" className="footer-link">
            Login
          </Link>
        </div>

        <div className="footer-column">
          <h4 className="footer-heading">Contact Info</h4>
          <p className="footer-text">Email: support@lifedrop.com</p>
          <p className="footer-text">Phone: +1 (800) 555-0199</p>
          <p className="footer-text">Available 24/7 for emergencies</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} LifeDrop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;