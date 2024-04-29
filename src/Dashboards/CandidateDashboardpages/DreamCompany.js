import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';

const DreamCompany = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowMessage(true);
  };

  return (
    <div className='dream-company-container'>
      <div className="centered-content">
        <form onSubmit={handleSubmit} className="centered-form">
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input type="text" id="companyName" name="companyName" required />
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
          <h3><Link to="/candiadte-dashboard">Go back to dashboard</Link></h3>
        </div>
      )}
        </form>
       
      </div>
   
    </div>
  );
};

export default DreamCompany;
