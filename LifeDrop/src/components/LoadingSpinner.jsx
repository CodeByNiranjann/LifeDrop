const LoadingSpinner = ({ size = 'medium', fullPage = false }) => {
  const sizeClass = `loading-spinner-${size}`;

  if (fullPage) {
    return (
      <div className="loading-spinner-fullpage">
        <div className={`loading-spinner ${sizeClass}`}></div>
        <p className="loading-spinner-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="loading-spinner-wrapper">
      <div className={`loading-spinner ${sizeClass}`}></div>
    </div>
  );
};

export default LoadingSpinner;