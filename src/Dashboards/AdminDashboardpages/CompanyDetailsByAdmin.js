import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminDashboard.css';
import axios from 'axios';

const BASE_API_URL = "http://localhost:8080/api/jobbox";

const CompanyDetailsByAdmin = ({ location }) => {
  const [location1, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();
  const companyName = location.state?.companyName;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send the data to the backend using Axios
      const response = await axios.put(`${BASE_API_URL}/updateCompanyByName?companyName=${companyName}`, { location1, description });
      console.log(response.data);
      history.push('/companyDetailsAdded');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="company-admin-container">
      <h2>Company Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="company-admin-form-group">
          <label htmlFor="companyName">Company Name: {companyName}</label>
        </div>
        <div className="company-admin-form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" placeholder="Enter company location" value={location1} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="company-admin-form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="discription" placeholder="Enter company description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button className='company-admin-button' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CompanyDetailsByAdmin;
