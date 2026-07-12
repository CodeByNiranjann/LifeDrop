const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  options = null,
}) => {
  return (
    <div className="inputfield">
      {label && (
        <label htmlFor={name} className="inputfield-label">
          {label}
          {required && <span className="inputfield-required">*</span>}
        </label>
      )}

      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`inputfield-select ${error ? 'inputfield-error-border' : ''}`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`inputfield-input ${error ? 'inputfield-error-border' : ''}`}
        />
      )}

      {error && <span className="inputfield-error-text">{error}</span>}
    </div>
  );
};

export default InputField;