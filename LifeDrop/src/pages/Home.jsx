import Hero from '../components/Hero';
import Statistics from '../components/Statistics';
import Features from '../components/Features';
import BloodGroupCard from '../components/BloodGroupCard';
import bloodGroupsData from '../data/bloodGroups';

const Home = () => {
  return (
    <div className="page-home">
      <Hero />
      <Statistics />
      <Features />

      <section className="home-bloodgroups">
        <div className="home-bloodgroups-container">
          <h2 className="home-bloodgroups-heading">Blood Group Compatibility</h2>
          <p className="home-bloodgroups-subheading">
            Understand which blood types you can donate to and receive from.
          </p>
          <div className="home-bloodgroups-grid">
            {bloodGroupsData.map((group) => (
              <BloodGroupCard key={group.id} bloodGroup={group} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;