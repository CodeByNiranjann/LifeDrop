import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-notfound">
      <div className="notfound-container">
        <span className="notfound-icon">🩸</span>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-text">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;