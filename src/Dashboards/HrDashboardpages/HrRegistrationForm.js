import React, { useState } from 'react';
import './HrDashboard.css'; // Import CSS file for styling
import axios from 'axios';
const BASE_API_URL="http://localhost:8080/api/jobbox";
const HrRegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
userRole:"",
    userEmail: "",
    companyName: "",
    password: "",
    confirmPassword: "",
  });
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = () => {
    // Optional password validation (add more rules as needed)
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false; // Prevent form submission
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match! Please re-enter.");
      return false;
    }
    return true; // Password is valid
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return; // Exit if password validation fails

    try {
      // Prepare API request details (URL, method, data)
      const apiUrl = BASE_API_URL+"/saveUser"; // Replace with your API endpoint
      const method = 'POST'; // Adjust method based on your API (POST or PUT)
      const data = formData;
  
      // Send the API request using axios
      const response = await axios({
        url: apiUrl,
        method: method,
        data: data,
      });
  
      console.log('Job details submitted:', response.data); // Log API response for debugging
  this.redirectToSuccessPage();
      // Handle successful submission (e.g., display success message, reset form)
    setFormData({
      userName: '',
      userEmail: '',
      password: '',
      confirmpassword: '',
      userRole: '',
    
      
      });
  
    } catch (error) {
      console.error('Error submitting job details:', error);
      // Handle errors appropriately (e.g., display error message to the user)
    }
  };

  return (
    <div className="centered-form"> {/* Apply centered styling to the form */}
      <div className="form-container">
        <h2 style={{textAlign:'center'}}>HR Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="hrName">HR Name:</label>
            <input type="text" id="hrName" name="userName" value={formData.hrName} onChange={handleInputChange} required />
          </div>
         
          <div className="form-group">
            <label htmlFor="hrEmail">Email ID:</label>
            <input type="email" id="hrEmail" name="userEmail" placeholder='name@companyname.com' value={formData.userEmail}  onChange={handleInputChange}  required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="userRole">Role:</label>
            <input type="text" id="userRole" name="userRole" value={formData.userRole}  onChange={handleInputChange}  required />
          </div>
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input type="text" id="companyId" name="companyName" onChange={handleInputChange}  required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
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
