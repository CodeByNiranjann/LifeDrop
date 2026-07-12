const DonorCard = ({ donor }) => {
  const { name, bloodGroup, city, phone, age, gender, available, lastDonated } = donor;

  const formatDate = (date) => {
    if (!date) return 'No record';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="donor-card">
      <div className="donor-card-header">
        <div className="donor-card-avatar">{name.charAt(0).toUpperCase()}</div>
        <div className="donor-card-info">
          <h3 className="donor-card-name">{name}</h3>
          <p className="donor-card-location">{city}</p>
        </div>
        <span className="donor-card-badge">{bloodGroup}</span>
      </div>

      <div className="donor-card-details">
        <div className="donor-card-detail-item">
          <span className="donor-card-detail-label">Age</span>
          <span className="donor-card-detail-value">{age}</span>
        </div>
        <div className="donor-card-detail-item">
          <span className="donor-card-detail-label">Gender</span>
          <span className="donor-card-detail-value">{gender}</span>
        </div>
        <div className="donor-card-detail-item">
          <span className="donor-card-detail-label">Last Donated</span>
          <span className="donor-card-detail-value">{formatDate(lastDonated)}</span>
        </div>
      </div>

      <div className="donor-card-footer">
        <span
          className={`donor-card-status ${
            available ? 'donor-card-status-available' : 'donor-card-status-unavailable'
          }`}
        >
          {available ? 'Available' : 'Unavailable'}
        </span>
        <a href={`tel:${phone}`} className="btn btn-primary donor-card-contact">
          Contact
        </a>
      </div>
    </div>
  );
};

export default DonorCard;