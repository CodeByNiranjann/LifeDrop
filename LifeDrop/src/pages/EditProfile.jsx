import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import InputField from '../components/InputField';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from '../services/authService';

const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genderOptions = ['Male', 'Female', 'Other'];

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    bloodGroup: '',
    age: '',
    gender: '',
    available: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        city: user.city || '',
        bloodGroup: user.bloodGroup || '',
        age: user.age || '',
        gender: user.gender || '',
        available: user.available ?? true,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleAvailabilityToggle = () => {
    setFormData((prev) => ({ ...prev, available: !prev.available }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
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
    setSuccessMessage('');

    if (!validate()) return;

    setLoading(true);
    try {
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => navigate('/profile'), 1200);
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-edit-profile">
      <DashboardSidebar />

      <div className="dashboard-main">
        <DashboardHeader title="Edit Profile" subtitle="Update your donor information" />

        <div className="dashboard-content">
          <div className="editprofile-card">
            {serverError && <div className="auth-error-banner">{serverError}</div>}
            {successMessage && (
              <div className="editprofile-success-banner">{successMessage}</div>
            )}

            <form className="auth-form auth-form-grid" onSubmit={handleSubmit}>
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={errors.name}
              />
              <InputField
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                error={errors.phone}
              />
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
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

              <div className="editprofile-toggle">
                <label className="editprofile-toggle-label">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={handleAvailabilityToggle}
                    className="editprofile-toggle-checkbox"
                  />
                  Available to donate
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full auth-form-submit"
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="small" /> : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;