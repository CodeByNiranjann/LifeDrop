import { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardHeader from '../components/DashboardHeader';
import InputField from '../components/InputField';
import RequestCard from '../components/RequestCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { getAllRequests, createRequest } from '../services/donorService';

const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const urgencyOptions = ['Critical', 'High', 'Medium', 'Low'];

const initialFormState = {
  patientName: '',
  hospital: '',
  city: '',
  bloodGroup: '',
  urgency: '',
  contactNumber: '',
  description: '',
};

const BloodRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllRequests();
      setRequests(data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to load blood requests.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientName.trim()) newErrors.patientName = 'Patient name is required';
    if (!formData.hospital.trim()) newErrors.hospital = 'Hospital name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.urgency) newErrors.urgency = 'Urgency level is required';
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = 'Contact number is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await createRequest(formData);
      setFormData(initialFormState);
      setModalOpen(false);
      fetchRequests();
    } catch (err) {
      setErrors({
        form: err.response?.data?.message || 'Failed to create blood request.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-blood-request">
      <DashboardSidebar />

      <div className="dashboard-main">
        <DashboardHeader
          title="Blood Requests"
          subtitle="View and post urgent blood requests"
        />

        <div className="dashboard-content">
          <div className="bloodrequest-toolbar">
            <button
              className="btn btn-primary"
              onClick={() => setModalOpen(true)}
            >
              + New Blood Request
            </button>
          </div>

          {loading && <LoadingSpinner fullPage />}
          {!loading && error && <div className="dashboard-error">{error}</div>}
          {!loading && !error && requests.length === 0 && (
            <p className="dashboard-empty-text">No blood requests posted yet.</p>
          )}
          {!loading && !error && requests.length > 0 && (
            <div className="bloodrequest-grid">
              {requests.map((request) => (
                <RequestCard key={request._id} request={request} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Post a Blood Request"
      >
        <form className="auth-form auth-form-grid" onSubmit={handleSubmit}>
          {errors.form && <div className="auth-error-banner">{errors.form}</div>}

          <InputField
            label="Patient Name"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            error={errors.patientName}
          />
          <InputField
            label="Hospital"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            required
            error={errors.hospital}
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
            label="Urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            options={urgencyOptions}
            required
            error={errors.urgency}
          />
          <InputField
            label="Contact Number"
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            error={errors.contactNumber}
          />
          <InputField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Additional details about the request"
            required
            error={errors.description}
          />

          <button
            type="submit"
            className="btn btn-primary btn-full auth-form-submit"
            disabled={submitting}
          >
            {submitting ? <LoadingSpinner size="small" /> : 'Submit Request'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default BloodRequest;