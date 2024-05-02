import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CandidateRegistrationForm = () => {
  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    userRole: 'Candidate',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    // Reset error state
    setPasswordMatchError(false);
    // Add your form submission logic here
    console.log('Form submitted:', user);
    // Redirect to dashboard
    history.push("/candiadte-dashboard");
    // Reset form fields after submission
    setUser({
      userName: '',
      userEmail: '',

      password: '',
      confirmpassword: '',
      userRole: 'Candidate',
      phone:'',


    });
  };

  return (
    <div className="centered-form">
      <div className="form-container">
        <h2>Candidate Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="userName" value={user.userName} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="userEmail" value={user.userEmail} onChange={handleChange} className="form-control" required />
          </div>

          {/* <div className="candidate-form-group">
            <label htmlFor="role">UserRole:</label>
            <input type="text" id="role" name="userRole" value={user.userRole}  onChange={handleChange} required />
          </div> */}
         
        
          <div className="form-group">

            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={user.phone} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={user.password} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} className="form-control" required />
          </div>
          {passwordMatchError && (
            <p className="error-message">Password and confirm password do not match. Please check.</p>
          )}
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default CandidateRegistrationForm;
