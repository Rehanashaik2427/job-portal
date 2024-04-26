import React, { useState } from 'react';

const Companies = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactNumber: '',
    companyEmail: '',
    location: '',
    date: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here, such as sending data to backend

    // Display success message
    setSuccessMessage('Company details submitted successfully!');
    // Clear form data
    setFormData({
      companyName: '',
      contactNumber: '',
      companyEmail: '',
      location: '',
      date: '',
    });
  };

  return (
    <div className="comapny-container">
      <h2>Company Details</h2>

      <form id="companyForm" onSubmit={handleSubmit}>
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

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
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
      </form>
    </div>
  );
};

export default Companies;
