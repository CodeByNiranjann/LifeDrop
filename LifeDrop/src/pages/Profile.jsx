import { useContext } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import ProfileCard from '../components/ProfileCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div className="page-profile">
      <DashboardSidebar />

      <div className="dashboard-main">
        <DashboardHeader title="My Profile" subtitle="View your donor information" />

        <div className="dashboard-content">
          {loading && <LoadingSpinner fullPage />}
          {!loading && user && <ProfileCard user={user} />}
          {!loading && !user && (
            <p className="dashboard-empty-text">
              Unable to load profile information. Please try logging in again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;