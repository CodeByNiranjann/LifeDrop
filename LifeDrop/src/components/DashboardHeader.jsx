import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashboardHeader = ({ title, subtitle }) => {
  const { user } = useContext(AuthContext);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-content">
        <h1 className="dashboard-header-title">{title || `${getGreeting()}, ${user?.name || 'User'}`}</h1>
        {subtitle && <p className="dashboard-header-subtitle">{subtitle}</p>}
      </div>
      <div className="dashboard-header-badge">
        <span
          className={`dashboard-header-status ${
            user?.available
              ? 'dashboard-header-status-available'
              : 'dashboard-header-status-unavailable'
          }`}
        >
          {user?.available ? 'Available' : 'Unavailable'}
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;