const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
}) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';
  const widthClass = fullWidth ? 'btn-full' : '';

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${widthClass}`.trim()}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="btn-loading">
          <span className="btn-loading-dot"></span>
          <span className="btn-loading-dot"></span>
          <span className="btn-loading-dot"></span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;