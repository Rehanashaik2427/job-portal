import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './HrDashboard.css';
import './HrReg.css';

const BASE_API_URL = "http://localhost:8080/api/jobbox";

const HrRegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userRole: "HR",
    userEmail: "",
    companyName: "",
    PhoneNumber: "",
    password: "",
    confirmpassword: "",
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = () => {
    if (formData.password !== formData.confirmpassword) {
      setPasswordMatchError(true);
      return false;
    }
    setPasswordMatchError(false);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      const apiUrl = BASE_API_URL + "/saveUser";
      const method = 'POST';
      const data = formData;

      const response = await axios({
        url: apiUrl,
        method: method,
        data: data,
      });

      history.push("/hr-dashboard");

      setFormData({
        userName: '',
        userEmail: '',
        PhoneNumber: '',
        password: '',
        confirmpassword: '',
        userRole: '',
      });

      // Display success message or perform any other actions after successful registration
      alert('Registration successful! Please sign in.');

    } catch (error) {
      console.error('Error submitting job details:', error);
      setRegistrationError("Error submitting job details. Please try again later.");
    }
  };

  return (
    <div className="centered-form">
      <div className="form-container">
        <h2 style={{ textAlign: 'center' }}>HR Registration Form</h2>
        {registrationError && <p className="error-message">{registrationError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="hrName">HR Name:</label>
            <input type="text" id="hrName" name="userName" value={formData.userName} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="hrEmail">Email ID:</label>
            <input type="email" id="hrEmail" name="userEmail" placeholder='name@companyname.com' value={formData.userEmail} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="companyId">Phone Number:</label>
            <input type="text" id="companyId" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmpassword" value={formData.confirmpassword} onChange={handleInputChange} required />
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
