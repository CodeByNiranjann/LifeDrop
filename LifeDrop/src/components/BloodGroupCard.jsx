const BloodGroupCard = ({ bloodGroup, onClick }) => {
  const { name, description, compatibility } = bloodGroup;

  return (
    <div
      className="bloodgroup-card"
      onClick={() => onClick && onClick(name)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="bloodgroup-card-badge">{name}</div>
      <p className="bloodgroup-card-description">{description}</p>
      <p className="bloodgroup-card-compatibility">
        <strong>Can donate to:</strong> {compatibility}
      </p>
    </div>
  );
};

export default BloodGroupCard;