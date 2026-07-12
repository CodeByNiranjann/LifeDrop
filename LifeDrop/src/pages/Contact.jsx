import { useState } from 'react';
import InputField from '../components/InputField';
import LoadingSpinner from '../components/LoadingSpinner';

const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Contact form is informational only; no backend endpoint is defined
    // for this in the current API spec, so we simulate a brief send delay
    // and show a confirmation locally.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData(initialFormState);
    }, 800);
  };

  return (
    <div className="page-contact">
      <section className="contact-hero">
        <div className="contact-hero-container">
          <h1 className="contact-hero-title">Get In Touch</h1>
          <p className="contact-hero-subtitle">
            Have a question or need help? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="contact-body">
        <div className="contact-container">
          <div className="contact-info">
            <h2 className="about-section-heading">Contact Information</h2>
            <div className="contact-info-item">
              <span className="contact-info-icon">📧</span>
              <span>support@lifedrop.com</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon">📞</span>
              <span>+91 6382937310</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-info-icon">🕒</span>
              <span>Available 24/7 for emergencies</span>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="contact-success">
                <p>Thank you! Your message has been received.</p>
              </div>
            ) : (
              <form className="auth-form" onSubmit={handleSubmit}>
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  error={errors.name}
                />
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={errors.email}
                />
                <InputField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  error={errors.subject}
                />
                <InputField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here"
                  required
                  error={errors.message}
                />

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={submitting}
                >
                  {submitting ? <LoadingSpinner size="small" /> : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;