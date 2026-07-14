import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import RequestCard from '../components/RequestCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import { getAllRequests } from '../services/donorService';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isDonor = user?.role === 'Donor';

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAllRequests();
        setRequests(data.slice(0, 3));
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to load recent blood requests.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="page-dashboard">
      <DashboardSidebar />

      <div className="dashboard-main">
        <DashboardHeader subtitle="Here's what's happening with your account" />

        <div className="dashboard-content">
          <div className="dashboard-summary-grid">
            {isDonor ? (
              <>
                <div className="dashboard-summary-card">
                  <span className="dashboard-summary-icon">🩸</span>
                  <div>
                    <p className="dashboard-summary-label">Blood Group</p>
                    <p className="dashboard-summary-value">{user?.bloodGroup || '—'}</p>
                  </div>
                </div>
                <div className="dashboard-summary-card">
                  <span className="dashboard-summary-icon">📍</span>
                  <div>
                    <p className="dashboard-summary-label">City</p>
                    <p className="dashboard-summary-value">{user?.city || '—'}</p>
                  </div>
                </div>
                <div className="dashboard-summary-card">
                  <span className="dashboard-summary-icon">✅</span>
                  <div>
                    <p className="dashboard-summary-label">Status</p>
                    <p className="dashboard-summary-value">
                      {user?.available ? 'Available' : 'Unavailable'}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="dashboard-summary-card">
                  <span className="dashboard-summary-icon">🔍</span>
                  <div>
                    <p className="dashboard-summary-label">Account Type</p>
                    <p className="dashboard-summary-value">Seeker</p>
                  </div>
                </div>
                <div className="dashboard-summary-card">
                  <span className="dashboard-summary-icon">📍</span>
                  <div>
                    <p className="dashboard-summary-label">City</p>
                    <p className="dashboard-summary-value">{user?.city || '—'}</p>
                  </div>
                </div>
                <div className="dashboard-summary-card">
                  <span className="dashboard-summary-icon">💡</span>
                  <div>
                    <p className="dashboard-summary-label">Tip</p>
                    <p className="dashboard-summary-value">Use Find Donors to search</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h3 className="dashboard-section-title">Recent Blood Requests</h3>
              <Link to="/blood-request" className="dashboard-section-link">
                View All &rarr;
              </Link>
            </div>

            {loading && <LoadingSpinner />}
            {!loading && error && <div className="dashboard-error">{error}</div>}
            {!loading && !error && requests.length === 0 && (
              <p className="dashboard-empty-text">No blood requests at the moment.</p>
            )}
            {!loading && !error && requests.length > 0 && (
              <div className="dashboard-requests-grid">
                {requests.map((request) => (
                  <RequestCard key={request._id} request={request} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;