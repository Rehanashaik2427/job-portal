import React, { useState } from 'react';
import './HrDashboard.css'; // Import CSS file for styling

const HrRegistrationForm = () => {
  const [formData, setFormData] = useState({
    hrName: "",
    hrId: "",
    hrEmail: "",
    companyId: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      // Logic to handle form submission (e.g., send data to backend)
      console.log("Form submitted successfully!");
    }
  };

  return (
    <div className="centered-form"> {/* Apply centered styling to the form */}
      <div className="form-container">
        <h2 style={{textAlign:'center'}}>HR Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="hrName">HR Name:</label>
            <input type="text" id="hrName" name="hrName" value={formData.hrName} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="hrId">HR ID:</label>
            <input type="text" id="hrId" name="hrId" required />
          </div>
          <div className="form-group">
            <label htmlFor="hrEmail">Email ID:</label>
            <input type="email" id="hrEmail" name="hrEmail" placeholder='name@companyname.com' required />
          </div>
          <div className="form-group">
            <label htmlFor="companyId">Company ID:</label>
            <input type="text" id="companyId" name="companyId" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
          </div>
          {passwordMatchError && (
            <p className="error-message">Password and confirm password do not match. Please check.</p>
          )}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default HrRegistrationForm;
