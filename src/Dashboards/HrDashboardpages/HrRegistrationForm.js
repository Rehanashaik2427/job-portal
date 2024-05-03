import React, { useState } from 'react';
import './HrDashboard.css';
import './HrReg.css';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';



const BASE_API_URL = "http://localhost:8080/api/jobbox";
const HrRegistrationForm = () => {
const location=useLocation();
const companyName=location.state?.companyName;

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userRole:'HR',
    companyName:companyName,
    phone: '',
    appliedDate: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordCriteriaError, setPasswordCriteriaError] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);

  const passwordHint = 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.';

 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$/;
    const isValidPassword = passwordRegex.test(password) && password === confirmPassword;
    if (!isValidPassword) {
      setPasswordCriteriaError(true);
      return false;
    }
    return true;
  };

  const history = useHistory();

  const saveUserDetails = async (formData) => {
    try {
      const apiUrl = BASE_API_URL + "/saveUser";
      const method = 'POST';
      const data = formData;
      console.log(formData);

      const response = await axios({
        url: apiUrl,
        method: method,
        data: data,
      });
      console.log(response.data);

      if (response.status === 200) {
        // Successful registration:
        setRegistrationSuccess(true); // Show success message
        history.push("/hr-RegSuccess"); // Redirect to success page
      } else {
        setRegistrationError("Error submitting job details. Please try again later.");
      }

      setFormData({
        userName: '',
        userEmail: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });

    } catch (error) {
      console.error('Error submitting job details:', error);
      setRegistrationError("Error submitting job details. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordCriteriaError(false); // Reset password criteria error on submission

    if (!validatePassword()) {
      setPasswordMatchError(true);
      return;
    }

    console.log("Form Data:", formData);
    saveUserDetails(formData); // Submit data and handle success/error

    setFormData({
      userName: '',
      userEmail: '',
      phone: '',
      appliedDate: '',
      password: '',
      confirmPassword: '',
    });
  };


  return (
    <div className="centered-form">
      <div className="form-container">
        <h2 style={{ textAlign: 'center' }}>HR Registration Form</h2>
        {passwordMatchError && (
          <p className="error-message">Password and confirm password do not match</p>
        )}
        {passwordCriteriaError && (
          <p className="error-message">Password should include at least one number, one special character, one capital letter, one small letter, and have a length between 8 to 12 characters</p>
        )}
        {registrationSuccess && (
          <p className="success-message">Your details have been successfully stored. You will receive a confirmation email within 24 hours.</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="hrName">HR Name:</label>
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
            <input type="password" id="password" name="password" placeholder={passwordHint} value={formData.password} onChange={handleInputChange}  required />
            {/* <p className="password-hint">{passwordHint}</p> */}
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
