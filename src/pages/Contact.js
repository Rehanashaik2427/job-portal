import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agreeTerms: false, // New state for terms agreement
  });
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert('Please accept the terms and conditions.');
      return;
    }
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: '',
      agreeTerms: false,
    });
    setIsMessageSent(true);
  };

  return (
    <div className="contact-container">
      <div className='contact'>
        <div className='contact-details'>
          <div className='connect'>
            <h1>Contact Us</h1>
            <p>We are here to assist you with any inquiries or questions you may have. Feel free to reach out to us via email at contact@jobportal.com or call us at +1 234 567 890. Our office is located at 123 Job Portal Street, City, Country. We look forward to hearing from you!</p>

            <div className='contact-info'>
              <div className='email'><FontAwesomeIcon icon={faEnvelope} /> Email: jobdb@mywebsite.org<br /></div>
              <div className='mobile'><FontAwesomeIcon icon={faPhone} /> Phone: +1 234 567 890<br /></div>
              <div className='address'><FontAwesomeIcon icon={faMapMarkerAlt} /> Address: 123 Job Portal Street, City, Country</div>
            </div>
          </div>
        </div>
      </div>
      <div className='contact-form'>
        <h2>Send Us Message</h2>
        {isMessageSent ? (
          <div style={{ textAlign: 'center' }}>
            <p>Your message has been sent successfully!</p>
            <Link to="/">Go to Home Page</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='contact-form-info'>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className='contact-form-info'>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className='contact-form-info'>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <div className='contact-form-info'>
              <label htmlFor="agreeTerms">
                <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
                I agree to the <Link to="/terms-and-conditions">Terms and Conditions</Link>
              </label>
            </div>
            <div className='send-msg'>
              <button type="submit">Send Message</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
