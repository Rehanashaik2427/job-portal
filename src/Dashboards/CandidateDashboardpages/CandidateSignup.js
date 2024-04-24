import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcrypt';



const BASE_API_URL="http://localhost:8080/api/jobbox";
const CandidateSignup=()=> {
  // redirectToSuccessPage = (event) => {
  //   event.preventDefault(); 
  //   window.location.href = "/CandidateRegisterSucessMsg";
  // }

    const [user, setUser] = useState({
      userName: '',
      userEmail: '',
      password: '',
      confirmpassword: '',
      userRole: '',
      phone:'',
    });
  
    const handleChange = (e) => {
      const value = e.target.value;
      setUser({ ...user, [e.target.name]: value });
    };
  
    const validatePassword = () => {
      // Optional password validation (add more rules as needed)
      if (user.password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false; // Prevent form submission
      }
      if (user.password !== user.confirmpassword) {
        alert("Passwords don't match! Please re-enter.");
        return false;
      }
      return true; // Password is valid
    };
  
    const submitUser = async (e) => {
      e.preventDefault();
  
      if (!validatePassword()) return; // Exit if password validation fails
  
      try {
     

        // Prepare API request details (URL, method, data)
        const apiUrl = BASE_API_URL+"/saveUser"; // Replace with your API endpoint
        const method = 'POST'; // Adjust method based on your API (POST or PUT)
        const data = user;
    
        // Send the API request using axios
        const response = await axios({
          url: apiUrl,
          method: method,
          data: data,
        });
    
        console.log('Job details submitted:', response.data); // Log API response for debugging
    this.redirectToSuccessPage();
        // Handle successful submission (e.g., display success message, reset form)
      setUser({
        userName: '',
        userEmail: '',
        password: '',
        confirmpassword: '',
        userRole: '',
        phone:'',
        
        });
    
      } catch (error) {
        console.error('Error submitting job details:', error);
        // Handle errors appropriately (e.g., display error message to the user)
      }
    };
  
    const redirectToSuccessPage = (event) => {
      event.preventDefault();
      window.location.href = "/CandidateRegisterSucessMsg";
    };
  
  

  
    return (
      <div className="signup-container">
        <form id="signupForm" onSubmit={submitUser}>
          <div className="candidate-form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="userName" value={user.userName}    onChange={handleChange}  required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="userEmail" value={user.userEmail}    onChange={handleChange} required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="userRole">Role:</label>
            <input type="text" id="userRole" name="userRole" value={user.userRole}  onChange={handleChange}  required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={user.phone}  onChange={handleChange} required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" value={user.password}  onChange={handleChange} required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="text" id="confirmPassword" name="confirmpassword" value={user.confirmpassword}   onChange={handleChange} required />
          </div>
          <div className="candidate-form-group">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  }


export default CandidateSignup;
