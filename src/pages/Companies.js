import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const BASE_API_URL = "http://localhost:8080/api/jobbox";

const Companies = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactNumber: '',
    companyEmail: '',
    industry: '',
    location: '',
    description: '',
    date: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_API_URL}/saveCompany`, formData);
      console.log('Company details submitted:', response.data);
      setSuccessMessage(`Company details submitted successfully! ${response.data?.message || ''}`);
      setFormData({
        companyName: '',
        contactNumber: '',
        companyEmail: '',
        industry: '',
        location: '',
        description: '',
        date: '',
      });
      history.push('/hr-registeration');
    } catch (error) {
      console.error('Error during submission:', error);
      setErrorMessage('Company already exists, please register as a HR');
      history.push('/hr-registration');
    }
  };

  return (
    <div className='company-details'>
      <div className='company-container'>
        <h2 style={{ textAlign: 'center' }}>Fill Company Details</h2>
        <form id="companyForm" onSubmit={handleSubmit}>
          <div className='company-form-group'>
            <label htmlFor="companyName">Company Name:</label>
            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
          </div>
          <div className='company-form-group'>
            <label htmlFor="contactNumber">Contact Number:</label>
            <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          </div>
          <div className='company-form-group'>
            <label htmlFor="companyEmail">Company Email:</label>
            <input type="email" id="companyEmail" name="companyEmail" value={formData.companyEmail} onChange={handleChange} />
          </div>
          <div className='company-form-group'>
            <label htmlFor="industry">Industry:</label>
            <input type="text" id="industry" name="industry" value={formData.industry} onChange={handleChange} />
          </div>
          <div className='company-form-group'>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div className='company-form-group'>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
          </div>
          <div className='company-form-group'>
            <label htmlFor="date">DateTime:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div>
            <button type="submit" style={{ textAlign: 'center' }}>Submit</button>
          </div>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Companies;
