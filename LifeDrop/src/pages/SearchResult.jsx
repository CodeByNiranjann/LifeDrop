import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DonorCard from '../components/DonorCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import DashboardHeader from '../components/DashboardHeader';
import { searchDonors } from '../services/donorService';

const RESULTS_PER_PAGE = 6;

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city') || '';
  const bloodGroup = queryParams.get('bloodGroup') || '';

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await searchDonors({ city, bloodGroup });
        setDonors(data);
        setCurrentPage(1);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to fetch donors. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [city, bloodGroup]);

  const totalPages = Math.ceil(donors.length / RESULTS_PER_PAGE);
  const paginatedDonors = donors.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  return (
    <div className="page-search-result">
      <DashboardHeader
        title="Search Results"
        subtitle={
          city || bloodGroup
            ? `Showing donors ${city ? `in ${city}` : ''} ${
                bloodGroup ? `with blood group ${bloodGroup}` : ''
              }`
            : 'Showing all registered donors'
        }
      />

      <div className="search-result-container">
        <button
          className="btn btn-outline search-result-back"
          onClick={() => navigate('/search-donor')}
        >
          &larr; New Search
        </button>

        {loading && <LoadingSpinner fullPage />}

        {!loading && error && (
          <div className="search-result-error">{error}</div>
        )}

        {!loading && !error && donors.length === 0 && (
          <div className="search-result-empty">
            <p>No donors found matching your criteria.</p>
          </div>
        )}

        {!loading && !error && donors.length > 0 && (
          <>
            <p className="search-result-count">
              {donors.length} donor{donors.length !== 1 ? 's' : ''} found
            </p>
            <div className="search-result-grid">
              {paginatedDonors.map((donor) => (
                <DonorCard key={donor._id} donor={donor} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResult;