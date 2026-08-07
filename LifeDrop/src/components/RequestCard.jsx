// const urgencyClassMap = {
//   Critical: 'requestcard-urgency-critical',
//   High: 'requestcard-urgency-high',
//   Medium: 'requestcard-urgency-medium',
//   Low: 'requestcard-urgency-low',
// };

// const RequestCard = ({ request }) => {
//   const {
//     patientName,
//     hospital,
//     city,
//     bloodGroup,
//     urgency,
//     contactNumber,
//     description,
//     createdAt,
//   } = request;

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <div className="requestcard">
//       <div className="requestcard-header">
//         <div>
//           <h3 className="requestcard-patient">{patientName}</h3>
//           <p className="requestcard-hospital">{hospital}</p>
//         </div>
//         <span className="requestcard-bloodgroup">{bloodGroup}</span>
//       </div>

//       <div className="requestcard-body">
//         <p className="requestcard-city">
//           <strong>City:</strong> {city}
//         </p>
//         <p className="requestcard-description">{description}</p>
//       </div>

//       <div className="requestcard-footer">
//         <span
//           className={`requestcard-urgency ${
//             urgencyClassMap[urgency] || 'requestcard-urgency-medium'
//           }`}
//         >
//           {urgency} Urgency
//         </span>
//         <span className="requestcard-date">{formatDate(createdAt)}</span>
//       </div>

//       <a href={`tel:${contactNumber}`} className="btn btn-primary requestcard-contact">
//         Call Contact
//       </a>
//     </div>
//   );
// };

// export default RequestCard;
const urgencyClassMap = {
  Critical: 'requestcard-urgency-critical',
  High: 'requestcard-urgency-high',
  Medium: 'requestcard-urgency-medium',
  Low: 'requestcard-urgency-low',
};

const RequestCard = ({ request, currentUserId, onMarkFulfilled, onCancel }) => {
  const {
    _id,
    patientName,
    hospital,
    city,
    bloodGroup,
    urgency,
    contactNumber,
    description,
    status,
    requestedBy,
    createdAt,
  } = request;

  const isOwner =
    currentUserId && requestedBy && requestedBy._id === currentUserId;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`requestcard ${status === 'Fulfilled' ? 'requestcard-fulfilled' : ''}`}>
      <div className="requestcard-header">
        <div>
          <h3 className="requestcard-patient">{patientName}</h3>
          <p className="requestcard-hospital">{hospital}</p>
        </div>
        <span className="requestcard-bloodgroup">{bloodGroup}</span>
      </div>

      <div className="requestcard-body">
        <p className="requestcard-city">
          <strong>City:</strong> {city}
        </p>
        <p className="requestcard-contact-text">
          <strong>Contact:</strong> {contactNumber}
        </p>
        <p className="requestcard-description">{description}</p>
      </div>

      <div className="requestcard-footer">
        <span
          className={`requestcard-urgency ${
            urgencyClassMap[urgency] || 'requestcard-urgency-medium'
          }`}
        >
          {urgency} Urgency
        </span>
        {status === 'Fulfilled' && (
          <span className="requestcard-status-fulfilled">Fulfilled</span>
        )}
        <span className="requestcard-date">{formatDate(createdAt)}</span>
      </div>

      <a href={`tel:${contactNumber}`} className="btn btn-primary requestcard-contact">
        Call Contact
      </a>

      {isOwner && status !== 'Fulfilled' && (
        <div className="requestcard-owner-actions">
          <button
            type="button"
            className="btn btn-outline requestcard-action-btn"
            onClick={() => onMarkFulfilled(_id)}
          >
            Mark as Fulfilled
          </button>
          <button
            type="button"
            className="requestcard-cancel-btn"
            onClick={() => onCancel(_id)}
          >
            Cancel Request
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;