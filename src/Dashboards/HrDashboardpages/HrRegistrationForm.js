import React, { useState } from 'react';
import './HrDashboard.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./HrReg.css";
import axios from 'axios';
const BASE_API_URL="http://localhost:8080/api/jobbox";
//const HrRegistrationForm = () => {
  // const [formData, setFormData] = useState({
  //   userName: "",
  //   userRole:"",
  //   userEmail: "",
  //   companyName: "",

 // Import CSS file for styling

const HrRegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userRole: "HR",
    userEmail: "",
    phone:"",
    companyName: "",
    password: "",
    confirmpassword: "",
  });

  
 

  const [passwordMatchError, setPasswordMatchError] = useState(false);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (event) => {
   // event.preventDefault();

    if (formData.password !== formData.confirmpassword) {

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
  
       
    history.push("/hr-RegSuccess")
      
    setFormData({
      userName: '',
      userEmail: '',
      phone:'',
      password: '',
      confirmpassword: '',
      userRole: '',
    
      
      });
  
    } catch (error) {
      console.error('Error submitting job details:', error);
      // Handle errors appropriately (e.g., display error message to the user)

      setPasswordMatchError(true);
    } 
  };

  return (
    <div className="centered-form"> {/* Apply centered styling to the form */}
      <div className="form-container">
        <h2 style={{textAlign:'center'}}>HR Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="hrName">HR Name:</label>
            <input type="text" id="hrName" name="userName" value={formData.userName} onChange={handleInputChange} required />
          </div>
        
          <div className="form-group">
            <label htmlFor="hrEmail">Email ID:</label>
            <input type="email" id="hrEmail" name="userEmail" placeholder='name@companyname.com' value={formData.userEmail} onChange={handleInputChange} required />
          </div>
          {/* <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input type="text" id="rolr" name="userRole" placeholder='HR' value={formData.userRole} onChange={handleInputChange} required />
          </div> */}
          <div className="form-group">
            <label htmlFor="companyId">Company Name:</label>
            <input type="text" id="companyId" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone}  onChange={handleInputChange} required />
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

