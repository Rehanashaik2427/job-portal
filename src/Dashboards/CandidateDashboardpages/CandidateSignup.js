import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CandidateRegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    phone: '',
    date: '',
    appliedDate: '',
    userRole: 'Candidate',
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

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!validatePassword()) {
      return;
    }
    // Simulate form submission (replace this with your actual API call)
    // setTimeout(() => {
    //   setRegistrationSuccess(true);

    //   history.push('/CandidateRegisterSucessMsg')
      
    // } catch (error) {
    //   console.error('Error registering candidate:', error);
    // }

    //   history.push('/login'); // Redirect after successful registration
    // }, 1000); // Simulating a delay

    // Replace the setTimeout block above with your actual API call to register the candidate
    // Example:
    try {
      const response = await fetch('http://localhost:8080/api/jobbox/saveUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to register candidate');
      }
      setRegistrationSuccess(true);
      history.push('/CandidateRegisterSucessMsg'); // Redirect after successful registration
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

    return true;
  };

  return (
    <div className="centered-form">
      <div className="form-container">

        <h2>Candidate Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="userName" value={formData.userName} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="userEmail" value={formData.userEmail} onChange={handleChange} className="form-control" required />
          </div>

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
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control" required />
          </div>

          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
      {passwordMatchError && (
          <p className="error-message">Password and confirm password do not match</p>
        )}
   </div>
    
  );
};

export default CandidateRegistrationForm;
