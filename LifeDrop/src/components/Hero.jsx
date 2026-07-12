import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Donate Blood, <span className="hero-title-highlight">Save Lives</span>
          </h1>
          <p className="hero-subtitle">
            Join thousands of donors connecting with patients in need. Every drop counts,
            every donor matters.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Become a Donor
            </Link>
            <Link to="/search-donor" className="btn btn-outline btn-lg">
              Find a Donor
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-circle">
            <span className="hero-image-icon">🩸</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;