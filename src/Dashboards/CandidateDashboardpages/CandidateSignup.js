import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const BASE_API_URL="http://localhost:8080/api/jobbox";

const CandidateRegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    phone: '',
    date:'',
    appliedDate:'',
    userRole:"Candidate",
    password: '',
    confirmPassword: '',
  });
  const history = useHistory();
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordCriteriaError, setPasswordCriteriaError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validatePassword()) {
      return;
    }
    try {
      const response = await axios.post(`${BASE_API_URL}/saveUser`, formData);
      console.log(response.data); // Assuming the response contains relevant data
      setRegistrationSuccess(true);
      
    } catch (error) {
      console.error('Error registering candidate:', error);
    }
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$/;
    const isValidPassword = passwordRegex.test(password) && password === confirmPassword;

    if (!isValidPassword) {
      setPasswordCriteriaError(true);
      return false;
    }

    if (password.length > 12) {
      setPasswordCriteriaError(true);
      return false;
    }
    return true;
  };



  return (
    <div className="centered-form">
      <div className="form-container">
        <h2 style={{ textAlign: 'center' }}>Candidate Registration Form</h2>
        {passwordMatchError && (
            <p className="error-message">Password and confirm password do not match. Please check.</p>
          )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="userName" value={user.userName} onChange={handleChange}  required />
            <input type="text" id="name" name="userName" value={user.userName} onChange={handleChange} className="form-control" required />

            <input type="text" id="name" name="userName" value={formData.userName} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID:</label>
            <input type="email" id="email" name="userEmail" value={user.userEmail} onChange={handleChange} required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="userEmail" value={user.userEmail} onChange={handleChange} className="form-control" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="userEmail" value={formData.userEmail} onChange={handleChange} className="form-control" required />
          </div>

          {/* <div className="candidate-form-group">
            <label htmlFor="role">UserRole:</label>
            <input type="text" id="role" name="userRole" value={user.userRole}  onChange={handleChange} required />
          </div> */}
         

          {/* <div className="candidate-form-group">
            <label htmlFor="role">UserRole:</label>
            <input type="text" id="role" name="userRole" value={user.userRole}  onChange={handleChange} required />
          </div> */}

          
<div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="appliedDate" value={formData.appliedDate} onChange={handleChange} required />
          </div>
         
        
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={user.phone} onChange={handleChange} required />
            <input type="tel" id="phone" name="phone" value={user.phone} onChange={handleChange} className="form-control" required />
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={user.date} onChange={handleChange} required />
          </div>


          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={user.password} onChange={handleChange}  required />
            <input type="password" id="password" name="password" value={user.password} onChange={handleChange} className="form-control" required />
            <input type="text" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required />
            <input type="password" id="confirmPassword" name="confirmpassword" value={user.confirmpassword} onChange={handleChange} className="form-control" required />
            <input type="text" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control" required />
          </div>
          
        
         
       
          <button type="submit">Register</button>
          {passwordMatchError && (
            <p className="error-message">Password and confirm password do not match. Please check.</p>
          )}
          <button type="submit" className="btn btn-primary">Register</button>

          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
      {passwordMatchError && (
          <p className="error-message">Password and confirm password do not match</p>
        )}
        {passwordCriteriaError && (
          <p className="error-message">Password should include at least one number, one special character, one capital letter, one small letter, and have a length between 8 to 12 characters</p>
        )}
        {registrationSuccess && (
          <p className="success-message">Your details have been successfully stored. You will receive a confirmation email within 24 hours.</p>
        )}

    </div>
  );
};

export default CandidateRegistrationForm;
