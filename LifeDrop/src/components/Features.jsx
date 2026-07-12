const featuresData = [
  {
    id: 1,
    icon: '🔍',
    title: 'Find Donors Instantly',
    description: 'Search verified donors by blood group and city in seconds.',
  },
  {
    id: 2,
    icon: '🛡️',
    title: 'Secure & Verified',
    description: 'All donor profiles are authenticated with secure login.',
  },
  {
    id: 3,
    icon: '⚡',
    title: 'Quick Blood Requests',
    description: 'Post urgent blood requests and reach donors near you fast.',
  },
  {
    id: 4,
    icon: '📍',
    title: 'Location Based Search',
    description: 'Filter donors by city to find help closest to you.',
  },
];

const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        <h2 className="features-heading">Why Choose LifeDrop</h2>
        <p className="features-subheading">
          A platform built to make blood donation simple, fast, and reliable.
        </p>
        <div className="features-grid">
          {featuresData.map((feature) => (
            <div className="features-card" key={feature.id}>
              <span className="features-icon">{feature.icon}</span>
              <h3 className="features-title">{feature.title}</h3>
              <p className="features-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;