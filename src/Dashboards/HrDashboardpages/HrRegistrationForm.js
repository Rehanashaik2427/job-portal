import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom'; // Changed import to include useLocation
import './HrDashboard.css';
import "./HrReg.css";

const BASE_API_URL = "http://localhost:8080/api/jobbox";

const HrRegistrationForm = () => {
  const location = useLocation(); // Added useLocation hook to access location state
  const companyName = location.state?.companyName;
  console.log(companyName);
  const [formData, setFormData] = useState({
    userName: "",
    userRole: "HR",
    userEmail: "",
    phone: "",
    companyName: companyName, // Set companyName from location state
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
      console.log(formData);

      const response = await axios({
        url: apiUrl,
        method: method,
        data: data,
      });
      console.log(response.data);

      if (response.status === 200) {
        // alert('Registration successful! Please sign in.');
        history.push("/hr-RegSuccess");
      } else {
        setRegistrationError("Error submitting job details. Please try again later.");
      }

      setFormData({
        userName: '',
        userEmail: '',
        phone: '',
        password: '',
        confirmpassword: '',
        userRole: '',
      });

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
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
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
