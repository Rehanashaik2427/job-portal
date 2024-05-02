import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; // Import useHistory for programmatic navigation

const HrSignin = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    password: "",
  });
  
  const history = useHistory(); // Initialize useHistory

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const BASE_API_URL = "http://localhost:8080/api/jobbox";

  

  const getUser = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getHRName?userEmail=${userEmail}`);
      console.log(response.data.userName);
      return response.data.userName;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  const handleLogin = async () => {
    try {
      const user = await getUser(formData.userEmail);
      
      if (user) {
        const userName = user;
        const userEmail=formData.userEmail;
        console.log(userName)
        console.log(userEmail);
        history.push("/hr-dashboard", {userEmail});
      } else {
        // Handle case where user data is not found or userName is not available
        console.error('User data not found or userName is missing');
      }
    } catch (error) {
      // Handle error when fetching user data
      console.error('Error fetching user:', error);
    }
  };
  

  return (
    <div className="centered-form"> {/* Apply centered styling to the form */}
      <div className="form-container">
        <h2>HR Sign In</h2>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="form-group">
            <label htmlFor="userEmail">Email:</label>
            <input type="email" id="userEmail" name="userEmail" value={formData.userEmail} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input style={{height:'20%'}}type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <button style={{backgroundColor:'skyblue', height:'40px' , width:'100px',fontSize:'16px'}}type="button" onClick={handleLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HrSignin;
