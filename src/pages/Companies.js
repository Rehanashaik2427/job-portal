import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

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
  const companyName=formData.companyName;
  console.log(companyName);

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
        discription: '',
        date: '',
      });
      history.push('/hr-registeration',{companyName});
    } catch (error) {
      console.error('Error during submission:', error);
      setErrorMessage('Company already exists, please register as a HR');
      alert('Company already exists, please register as a HR')
      history.push('/hr-registeration',{companyName});
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


        <label htmlFor="date">DateTime:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input type="submit" value="Submit" />
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Companies;
