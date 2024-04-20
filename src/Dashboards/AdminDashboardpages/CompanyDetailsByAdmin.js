import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminDashboard.css';

const CompanyDetailsByAdmin = () => {
  const [companyName, setCompanyName] = useState('CompanyName(Com 1, Com 2, Com 3)');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // For demonstration purposes, navigate to another page
    history.push('/companyDetailsAdded');
  };

  const handleCompanyChange = (e) => {
    setCompanyName(e.target.value);
  };

  return (
    <div className="company-admin-container">
      <h1>Company Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="company-admin-form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input type="text" id="companyName" name="companyName" placeholder="Enter company name" value={companyName} onChange={handleCompanyChange} readOnly />
        </div>
        <div className="company-admin-form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" placeholder="Enter company location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="company-admin-form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" placeholder="Enter company description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button className='company-admin-button' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CompanyDetailsByAdmin;
