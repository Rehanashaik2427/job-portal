import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const BASE_API_URL = "http://localhost:8080/api/jobbox";

const Companies = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactNumber: '',
    companyEmail: '',
    industry: '',
    location: '',
    discription: '', // Corrected typo
    date: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
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

      // Display success message with potential backend data (if applicable)
      setSuccessMessage(`Company details submitted successfully! ${response.data?.message || ''}`);  // Check for backend message

      // Clear form data
      setFormData({
        companyName: '',
        contactNumber: '',
        companyEmail: '',
        industry: '',
        location: '',
        discription: '',
        date: '',
      });

      history.push('/hr-registeration');
    } catch (error) {
      console.error('Error during submission:', error);
      alert('Company already exist , register as a HR');
      history.push('/hr-registeration') // Generic error message
    }
  };

  return (
    <div className="company-container">
      <h2>Company Details</h2>
      <form id="companyForm" onSubmit={handleSubmit}>
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="tel"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
        <label htmlFor="companyEmail">Company Email:</label>
        <input
          type="email"
          id="companyEmail"
          name="companyEmail"
          value={formData.companyEmail}
          onChange={handleChange}
        />
        <label htmlFor="industry">Industry:</label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="discription"
          value={formData.discription}
          onChange={handleChange}
        />
        <label htmlFor="dateTime">Date and Time:</label>
        <input
          type="datetime-local"
          id="dateTime"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input type="submit" value="Submit" />
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Companies;
