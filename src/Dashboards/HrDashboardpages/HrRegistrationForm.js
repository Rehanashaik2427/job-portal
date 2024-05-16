import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './HrDashboard.css';
import './HrReg.css';

const BASE_API_URL = "http://localhost:8081/api/jobbox";

const HrRegistrationForm = () => {
  const history = useHistory(); 
  const location = useLocation();
  const { companyName } = location.state || {};
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userRole: 'HR',   
    phone: '',
    appliedDate: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordCriteriaError, setPasswordCriteriaError] = useState(false);
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setPasswordMatchError(false); 
    setPasswordCriteriaError(false);
  };

  
  const validatePassword = () => {
    const { password } = formData;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    const isValidPassword = passwordRegex.test(password);

    if (!isValidPassword) {
      setPasswordCriteriaError(true);
      return false;
    }

    return true;
  };

  const saveUserDetails = async (formData) => {
    try {
      const { companyName, ...userData } = formData;
      const response = await fetch(`${BASE_API_URL}/saveUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, companyName }),
      });
      return response;
    } catch (error) {
      throw new Error("Invalid user details");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    if (!validatePassword()) {
      return;
    }

    try {
      const response = await saveUserDetails({ ...formData, companyName });
      if (response.ok) {
        console.log("User registered successfully");
        history.push('/hr-RegSuccess',{ companyName: formData.companyName });
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  }

  return (
    <div className="centered-form">
      <div className="form-container">
        <h2 style={{ textAlign: 'center' }}>HR Registration Form</h2>
        {passwordMatchError && (
          <p className="error-message">Password and confirm password do not match</p>
        )}
        {passwordCriteriaError && (
          <p className="error-message">Password should include at least one number, one special character, one capital letter, one small letter, and have a length between 8 to 15 characters</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="hrName">Name:</label>
            <input type="text" id="hrName" name="userName" value={formData.userName} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="hrEmail">Email ID:</label>
            <input type="email" id="hrEmail" name="userEmail" value={formData.userEmail} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="appliedDate" value={formData.appliedDate} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default HrRegistrationForm;
