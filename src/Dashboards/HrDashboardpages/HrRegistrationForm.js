import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './HrDashboard.css';
import './HrReg.css';

const BASE_API_URL = "http://localhost:8080/api/jobbox";

const HrRegistrationForm = () => {
  const history = useHistory(); 
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userRole:'HR',   
    phone: '',
    date: '',
    password: '',
    confirmPassword: '',
    companyName: '', // Added companyName to formData state
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false); // State for password match error
  const [passwordCriteriaError, setPasswordCriteriaError] = useState(false); // State for password criteria error

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
      setPasswordCriteriaError(true); // Set password criteria error if validation fails
      return false;
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

     if (formData.password !== formData.confirmPassword) { // Check if passwords match
      setPasswordMatchError(true);
      return; // Stop form submission if passwords don't match
    }
    if (!validatePassword()) { // Check password criteria
      return; // Stop form submission if password criteria are not met
    }

    // Simulating registration success
    console.log("Form Data:", formData);
    try {
      const response = saveUserDetails(formData); // Log the form data
      console.log("Response:", response);
      history.push('/hr-RegSuccess');
    } catch (error) {
      console.error("Error saving user details:", error);
    }
    // saveUserDetails(formData); 
    setFormData({
      userName: '',
      userEmail: '',
      phone: '',
      appliedDate: '',
      password: '',
      confirmPassword: '',
      
    });
  };
  const saveUserDetails = async (formData)=>{
    try{
      const response = await fetch("http://localhost:8080/api/jobbox/saveUser",{
        method:"POST",
        headers :{"Content-Type":"application/json"},
        body:JSON.stringify(formData),
      });

       if (!response.ok) {
        throw new Error("Failed to save user details");
      }
      return response.json();
    }
    
    catch(error){
      throw new Error("Invalid user details");
    }
  }

  return (
    <div className="centered-form">
      <div className="form-container">
        <h2 style={{ textAlign: 'center' }}>HR Registration Form</h2>
        {passwordMatchError && ( // Display error message if passwords don't match
          <p className="error-message">Password and confirm password do not match</p>
        )}
         {passwordCriteriaError && ( // Display error message if password criteria are not met
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
            <input type="password" id="password" name="password"  value={formData.password} onChange={handleInputChange}  required />
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