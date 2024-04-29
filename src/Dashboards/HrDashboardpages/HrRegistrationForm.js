import React, { useState } from 'react';
<<<<<<< HEAD
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./HrReg.css";
import axios from 'axios';
const BASE_API_URL="http://localhost:8080/api/jobbox";
const HrRegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userRole:"",
    userEmail: "",
    companyName: "",
=======
import './HrDashboard.css'; // Import CSS file for styling

const HrRegistrationForm = () => {
  const [formData, setFormData] = useState({
    hrName: "",
    hrId: "",
    hrEmail: "",
    companyId: "",
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
    password: "",
    confirmpassword: "",
  });
<<<<<<< HEAD
  
 
=======
  const [passwordMatchError, setPasswordMatchError] = useState(false);

>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
<<<<<<< HEAD
      alert("Passwords don't match! Please re-enter.");
      return false;
    }
    return true; // Password is valid
  }

  const history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return; // Exit if password validation fails

    try {
      // Prepare API request details (URL, method, data)
      const apiUrl = BASE_API_URL+"/saveUser"; // Replace with your API endpoint
      const method = 'POST'; // Adjust method based on your API 
      const data = formData;
  
      // Send the API request using axios
      const response = await axios({
        url: apiUrl,
        method: method,
        data: data,
      });
  
      console.log('Job details submitted:', response.data); // Log API response for debugging
    history.push('/hr-RegSuccess')
      
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
=======
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      // Logic to handle form submission (e.g., send data to backend)
      console.log("Form submitted successfully!");
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
    }
  };

  return (
    <div className="centered-form"> {/* Apply centered styling to the form */}
      <div className="form-container">
        <h2 style={{textAlign:'center'}}>HR Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="hrName">HR Name:</label>
            <input type="text" id="hrName" name="hrName" value={formData.hrName} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="hrId">HR ID:</label>
            <input type="text" id="hrId" name="hrId" required />
          </div>
          <div className="form-group">
            <label htmlFor="hrEmail">Email ID:</label>
            <input type="email" id="hrEmail" name="hrEmail" placeholder='name@companyname.com' required />
          </div>
          <div className="form-group">
            <label htmlFor="companyId">Company ID:</label>
            <input type="text" id="companyId" name="companyId" required />
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

