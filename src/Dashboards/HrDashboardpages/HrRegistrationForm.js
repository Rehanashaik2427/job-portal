import React, { useState } from 'react';
import './HrDashboard.css';
import './HrReg.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const BASE_API_URL = "http://localhost:8080/api/jobbox";
const HrRegistrationForm = () => {
  const history =useHistory();
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
  const [passwordMatchError, setPasswordMatchError] = useState(false);
 
  const [passwordCriteriaError, setPasswordCriteriaError] = useState(false);

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

    if (password > 12 || password< 8) {
      setPasswordCriteriaError(true);
      return false;
    }
    return true;


    
  };


  const saveUserDetails = async (formData)=>{
    try{
      const response = await fetch(BASE_API_URL,{
        method:"POST",
        headers :{"Content-Type":"application/json"},
        body:JSON.stringify(formData),
      });
      return response;
    }
    catch(error){
      throw new Error("Invalid user details");
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordCriteriaError(false); // Reset password criteria error on submission

    if (!validatePassword()) {
      setPasswordMatchError(true);
      
    }
    // Simulating registration success
    
    // console.log("Form Data:", formData);
     saveUserDetails(formData);
    history.pushState('/hr-RegSuccess') // Log the form data
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
