import { Link } from 'react-router-dom';

const ProfileCard = ({ user }) => {
  const { name, email, phone, city, bloodGroup, age, gender, available, lastDonated } = user;

  const formatDate = (date) => {
    if (!date) return 'No record';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="profilecard">
      <div className="profilecard-header">
        <div className="profilecard-avatar">{name.charAt(0).toUpperCase()}</div>
        <h2 className="profilecard-name">{name}</h2>
        <span className="profilecard-bloodgroup">{bloodGroup}</span>
        <span
          className={`profilecard-status ${
            available ? 'profilecard-status-available' : 'profilecard-status-unavailable'
          }`}
        >
          {available ? 'Available to Donate' : 'Currently Unavailable'}
        </span>
      </div>

      <div className="profilecard-body">
        <div className="profilecard-row">
          <span className="profilecard-row-label">Email</span>
          <span className="profilecard-row-value">{email}</span>
        </div>
        <div className="profilecard-row">
          <span className="profilecard-row-label">Phone</span>
          <span className="profilecard-row-value">{phone}</span>
        </div>
        <div className="profilecard-row">
          <span className="profilecard-row-label">City</span>
          <span className="profilecard-row-value">{city}</span>
        </div>
        <div className="profilecard-row">
          <span className="profilecard-row-label">Age</span>
          <span className="profilecard-row-value">{age}</span>
        </div>
        <div className="profilecard-row">
          <span className="profilecard-row-label">Gender</span>
          <span className="profilecard-row-value">{gender}</span>
        </div>
        <div className="profilecard-row">
          <span className="profilecard-row-label">Last Donated</span>
          <span className="profilecard-row-value">{formatDate(lastDonated)}</span>
        </div>
      </div>

      <div className="profilecard-footer">
        <Link to="/edit-profile" className="btn btn-primary profilecard-edit-btn">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;