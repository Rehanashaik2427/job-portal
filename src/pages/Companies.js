import React, { useState } from 'react';

const Companies = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactNumber: '',
    companyEmail: '',
    location: '',
    discription: '', // Corrected typo
    date: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage,setErrorMessage]=useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
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
    <div className='company-details'>
      <div className='company-container'>
      <h2 style={{textAlign:'center'}}>Fill Company Details</h2>
      
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
    <label htmlFor="date">DateTime:</label>
    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
  </div>
  <div>
    <button type="submit" style={{textAlign:'center'}}>Submit</button>  
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
