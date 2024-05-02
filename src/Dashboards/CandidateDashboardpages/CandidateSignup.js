import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const BASE_API_URL="http://localhost:8080/api/jobbox";

const CandidateRegistrationForm = () => {
  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    userRole: 'Candidate',
    phone: '',
    password: '',
    confirmpassword: ''
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const history = useHistory();

  const validatePassword = (event) => {
    // event.preventDefault();
 
     if (user.password !== user.confirmpassword) {
 
       alert("Passwords don't match! Please re-enter.");
       return false;
     }
     return true; // Password is valid
   }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return; // Exit if password validation fails

    try {
      
      const apiUrl = BASE_API_URL+"/saveUser"; 
      const method = 'POST'; 
      const data = user;
  
      // Send the API request using axios
      const response = await axios({
        url: apiUrl,
        method: method,
        data: data,
      });

      console.log(response.password);
      history.push("/candidates")
      
      setUser({
        userName: '',
        userEmail: '',
        phone:'',
        password: '',
        userRole: '',
      
        
        });
    
      } catch (error) {
        console.error('Error submitting job details:', error);
        // Handle errors appropriately (e.g., display error message to the user)
  
        setPasswordMatchError(true);
      } 
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
            <input type="password" id="confirmPassword" name="confirmpassword" value={user.confirmpassword} onChange={handleChange} className="form-control" required />
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
