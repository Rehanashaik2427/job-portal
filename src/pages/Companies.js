import React, { useState } from 'react';
import companyService from '../Services/company.service';
const Companies = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactNumber: '',
    companyEmail: '',
    industry:'',
    location: '',
    dateTime: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveCompanyDetails = (e) => {
    e.preventDefault();

    companyService.saveCompany(formData).then((res) => {
      setSuccessMessage('Company details submitted successfully!');
      // Clear form data
      setFormData({
        companyName: '',
        contactNumber: '',
        companyEmail: '',
        industry:'',
        location: '',
        dateTime: '',
      });
      console.log(formData);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="company-container">
      <h2>Company Details</h2>
      
      <form id="companyForm" onSubmit={saveCompanyDetails}>
        <input type="hidden" id="redirectToError" value="false" />
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

        <label htmlFor="dateTime">Date and Time:</label>
        <input
          type="datetime-local"
          id="dateTime"
          name="dateTime"
          value={formData.dateTime}
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
