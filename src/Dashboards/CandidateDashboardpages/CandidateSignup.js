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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validatePassword()) {
      return;
    }
    // Simulate form submission (replace this with your actual API call)
    setTimeout(() => {
      setRegistrationSuccess(true);
      history.push('/login'); // Redirect after successful registration
    }, 1000); // Simulating a delay

    // Replace the setTimeout block above with your actual API call to register the candidate
    // Example:
    // try {
    //   const response = await fetch('http://localhost:8080/api/jobbox/saveUser', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (!response.ok) {
    //     throw new Error('Failed to register candidate');
    //   }
    //   setRegistrationSuccess(true);
    //   history.push('/login'); // Redirect after successful registration
    // } catch (error) {
    //   console.error('Error registering candidate:', error);
    // }
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
        <h2 style={{ textAlign: 'center' }}>Candidate Registration Form</h2>
        {passwordCriteriaError && (
          <p className="error-message">Password should include at least one number, one special character, one capital letter, one small letter, and have a length between 8 to 12 characters</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="userName" value={formData.userName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="userEmail" value={formData.userEmail} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            {passwordMatchError && (
              <p className="error-message">Password and confirm password do not match. Please check.</p>
            )}
          </div>
          <button type="submit">Register</button>
        </form>
        {registrationSuccess && (
          <p className="success-message">Your details have been successfully stored. You will receive a confirmation email within 24 hours.</p>
        )}
      </div>
    </div>
  );
};

export default CandidateRegistrationForm;
