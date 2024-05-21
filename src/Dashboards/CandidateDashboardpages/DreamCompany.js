import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

   const BASE_API_URL="http://localhost:8082/api/jobbox";

const DreamCompany = () => {
  const [showMessage, setShowMessage] = useState(false);
  const location=useLocation();
  const userName=location.state?.userName;
  const userId=location.state?.userId;
 

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_API_URL}/saveCompany`, formData);
      console.log('Company details submitted:', response.data);
      
      setFormData({
        companyName: '',
        contactNumber: '',
        companyEmail: '',
        industry: '',
        location: '',
        discription: '',
        date: '',
      });

     
    } catch (error) {
      console.error('Error during submission:', error);
      
      alert('Company already exists, please register as a HR')
      
    }

    setShowMessage(true);
  };

  return (
    <div className='dream-company-container'>
      <div className="centered-content">
        <form onSubmit={handleSubmit} className="centered-form">
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="resume">Resume:</label>
            <input type="file" id="resume" name="resume" required />
          </div>
          <div className="form-group">
            <input type="submit" value="Apply" className="apply-button" />
          </div>
          {showMessage && (
        <div className="success-message">
          <h1>Congratulations</h1>
          <h3>You successfully applied to your Dream Company</h3>
          <h3><Link   to={{
          pathname: '/candidate-dashboard',
          state: { userName: userName, userId:userId }
        }}>Go back to dashboard</Link></h3>
        </div>
      )}
        </form>
       
      </div>
   
    </div>
  );
};

export default DreamCompany;
