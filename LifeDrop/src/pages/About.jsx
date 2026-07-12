import { Link } from 'react-router-dom';
import faqData from '../data/faq';

const About = () => {
  return (
    <div className="page-about">
      <section className="about-hero">
        <div className="about-hero-container">
          <h1 className="about-hero-title">About LifeDrop</h1>
          <p className="about-hero-subtitle">
            Bridging the gap between blood donors and patients in need, one
            connection at a time.
          </p>
        </div>
      </section>

      <section className="about-mission">
        <div className="about-mission-container">
          <div className="about-mission-text">
            <h2 className="about-section-heading">Our Mission</h2>
            <p className="about-paragraph">
              LifeDrop was built to solve a simple but urgent problem: connecting
              willing blood donors with patients who need them, quickly and
              reliably. We believe technology can remove the friction from a
              process that saves lives every single day.
            </p>
            <p className="about-paragraph">
              Every registered donor on our platform is a potential lifesaver.
              Our goal is to make finding and becoming a donor as simple as a
              few clicks.
            </p>
          </div>
        </div>
      </section>

      <section className="about-how">
        <div className="about-how-container">
          <h2 className="about-section-heading">How It Works</h2>
          <div className="about-how-grid">
            <div className="about-how-card">
              <span className="about-how-number">1</span>
              <h3 className="about-how-title">Register</h3>
              <p className="about-how-description">
                Create a free account with your blood group and location details.
              </p>
            </div>
            <div className="about-how-card">
              <span className="about-how-number">2</span>
              <h3 className="about-how-title">Get Discovered</h3>
              <p className="about-how-description">
                Patients and hospitals search for donors matching their needs.
              </p>
            </div>
            <div className="about-how-card">
              <span className="about-how-number">3</span>
              <h3 className="about-how-title">Save a Life</h3>
              <p className="about-how-description">
                Respond to requests and donate blood to those who need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-faq">
        <div className="about-faq-container">
          <h2 className="about-section-heading">Frequently Asked Questions</h2>
          <div className="about-faq-list">
            {faqData.map((item) => (
              <div className="about-faq-item" key={item.id}>
                <h4 className="about-faq-question">{item.question}</h4>
                <p className="about-faq-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-container">
          <h2 className="about-cta-heading">Ready to make a difference?</h2>
          <Link to="/register" className="btn btn-primary btn-lg">
            Join as a Donor
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;