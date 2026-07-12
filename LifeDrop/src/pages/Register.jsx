import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import InputField from '../components/InputField';
import LoadingSpinner from '../components/LoadingSpinner';

const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genderOptions = ['Male', 'Female', 'Other'];

const initialFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  city: '',
  bloodGroup: '',
  age: '',
  gender: '',
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 18 || formData.age > 65)
      newErrors.age = 'Age must be between 18 and 65';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      await register(payload);
      navigate('/dashboard');
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-auth">
      <div className="auth-container">
        <div className="auth-card auth-card-wide">
          <h2 className="auth-title">Become a Donor</h2>
          <p className="auth-subtitle">Create your account and start saving lives</p>

          {serverError && <div className="auth-error-banner">{serverError}</div>}

          <form className="auth-form auth-form-grid" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              error={errors.name}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              error={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              error={errors.password}
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
              error={errors.confirmPassword}
            />
            <InputField
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              error={errors.phone}
            />
            <InputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
              error={errors.city}
            />
            <InputField
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              options={bloodGroupOptions}
              required
              error={errors.bloodGroup}
            />
            <InputField
              label="Age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
              error={errors.age}
            />
            <InputField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={genderOptions}
              required
              error={errors.gender}
            />

            <button
              type="submit"
              className="btn btn-primary btn-full auth-form-submit"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="small" /> : 'Create Account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;