import { useEffect, useState } from 'react';
import statisticsData from '../data/statistics';

const Statistics = () => {
  const [counts, setCounts] = useState(
    statisticsData.map(() => 0)
  );

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const intervalTime = duration / steps;

    const timers = statisticsData.map((stat, index) => {
      const increment = stat.value / steps;
      let currentStep = 0;

      return setInterval(() => {
        currentStep += 1;
        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.min(
            Math.round(increment * currentStep),
            stat.value
          );
          return updated;
        });

        if (currentStep >= steps) {
          clearInterval(timers[index]);
        }
      }, intervalTime);
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, []);

  return (
    <section className="statistics">
      <div className="statistics-container">
        {statisticsData.map((stat, index) => (
          <div className="statistics-card" key={stat.id}>
            <span className="statistics-icon">{stat.icon}</span>
            <h3 className="statistics-value">
              {counts[index].toLocaleString()}
              {stat.suffix}
            </h3>
            <p className="statistics-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;