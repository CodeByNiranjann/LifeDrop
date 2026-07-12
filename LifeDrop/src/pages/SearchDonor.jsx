import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import DashboardHeader from '../components/DashboardHeader';

const SearchDonor = () => {
  const navigate = useNavigate();

  const handleSearch = ({ city, bloodGroup }) => {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (bloodGroup) params.append('bloodGroup', bloodGroup);

    navigate(`/search-result?${params.toString()}`);
  };

  return (
    <div className="page-search-donor">
      <DashboardHeader
        title="Find a Donor"
        subtitle="Search for available blood donors near you"
      />

      <div className="search-donor-container">
        <SearchBar onSearch={handleSearch} />

        <div className="search-donor-info">
          <p className="search-donor-info-text">
            Use the filters above to search donors by city and blood group. Results
            will show verified, registered donors from our database.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchDonor;