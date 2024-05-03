import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

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

  const companyName=formData.companyName;

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const exists = await checkCompanyExists(formData.companyName);
    // if (exists) {
    //   setErrorMessage("Company already exists. Please try again.");
    //   return;
    // }

    try {
      const response = await saveCompanyData(formData);
      if (response.ok) {
        setSuccessMessage("Company added successfully");
        setFormData({
          companyName: '',
          contactNumber: '',
          companyEmail: '',
          industry: '',
          location: '',
          description: '',
          date: '',
        });
      }
      else if (response.status === 406) {
        setErrorMessage("Company already exists. Please try again.");
      }
       else {
        setErrorMessage("Company already exists.");
      }
    } catch (error) {
      setErrorMessage2("Error adding company. Please try again.");
    }
  };

  // const checkCompanyExists = async (companyName) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/jobbox/checkExists/${companyName}`);
  //     const data = await response.json();
  //     return data.exists;
  //   } 
  //   catch (error) {
  //     return false;
  //   }
  // };

  const saveCompanyData = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/api/jobbox/saveCompany", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      return response;
    } 
    catch (error) {
      throw new Error("Error adding company. Please try again.");
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
            <input type="text" id="description" name="description" value={formData.discription} onChange={handleChange} />
          </div>
          <div className='company-form-group'>
            <label htmlFor="date">DateTime:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div>
            <button type="submit" style={{ textAlign: 'center' }}>Submit</button>
          </div>
        
        </form>
        {errorMessage && (
          <div className="error-message">{errorMessage}
          <Link to={{ pathname: '/hr-registeration', state: { companyName } }}>Click here to fill your details</Link>
          </div> // Display error message
        )}
        {errorMessage2 && (
          <div className="error-message">{errorMessage2}
          </div> // Display error message
        )}
        {successMessage && (
          <div className="success-message">{successMessage}
            <Link to={{ pathname: '/hr-registeration', state: { companyName } }}>Click here to fill your details</Link>
          </div> // Display success message in green color
        )}
      </div>
    </div>
  );
};

export default Companies;
