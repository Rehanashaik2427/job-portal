import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const BASE_API_URL="http://localhost:8080/api/jobbox";

const CandidateRegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    phone: '',
 
    userRole:"Candidate",
    password: '',
    confirmPassword: '',
  });
  const history=useHistory();
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordCriteriaError, setPasswordCriteriaError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;
    console.log(password,confirmPassword);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,12}$/;
    const isValidPassword = passwordRegex.test(password) && password === confirmPassword;
   
    if (!isValidPassword) {
      setPasswordCriteriaError(true);
      return false;
    }

    if(password > 12){
      setPasswordCriteriaError(true);
      return false;
   }
    return true;
  };

 
  const saveUserDetails = async (formData)=>{
    try {
      
      // const apiUrl = BASE_API_URL+"/saveUser"; 
      // const method = 'POST'; 
      // const data = formData;
      // console.log(formData);
  
      // // Send the API request using axios
      // const response = await axios({
      //   url: apiUrl,
      //   method: method,
      //   data: data,
      // });

      const response = await fetch(BASE_API_URL+"/saveUser",{
        method:"POST",
        headers :{"Content-Type":"application/json"},
        body:JSON.stringify(formData),
      });
    
      console.log(response.data);
  

      console.log(response.password);
      history.push("/candidates")
      
     
      
      return response;

        
      }
    catch(error){
      throw new Error("Invalid user details");
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordCriteriaError(false); // Reset password criteria error on form submission
    if (!validatePassword()) {
      setPasswordMatchError(true);
      
    }
    
    else{
      setRegistrationSuccess(true);
      console.log("Form Data:", formData);
      saveUserDetails(formData); // Log the form data
      setFormData({
        userName: '',
        userEmail: '',
        phone: '',
      
        password: '',
        confirmPassword: '',
      });}
    
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

            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="text" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="text" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control" required />
          </div>

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
