import { useState } from 'react';
import bloodGroupsData from '../data/bloodGroups';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ city: city.trim(), bloodGroup });
  };

  const handleReset = () => {
    setCity('');
    setBloodGroup('');
    onSearch({ city: '', bloodGroup: '' });
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <div className="searchbar-field">
        <label htmlFor="city" className="searchbar-label">
          City
        </label>
        <input
          id="city"
          type="text"
          className="searchbar-input"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="searchbar-field">
        <label htmlFor="bloodGroup" className="searchbar-label">
          Blood Group
        </label>
        <select
          id="bloodGroup"
          className="searchbar-select"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">All Groups</option>
          {bloodGroupsData.map((group) => (
            <option key={group.id} value={group.name}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="searchbar-actions">
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;