import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const HrSignin = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    password: '',
  });

  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const BASE_API_URL = "http://localhost:8081/api/jobbox";

  const password=formData.password;
  const userEmail=formData.userEmail;
  

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/login?userEmail=${userEmail}&password=${password}`);
      console.log(response.data.userName);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

   const handleLogin = async () => {
    // history.push("/hr-dashboard")
    try {
      const user = await getUser();
      
      if (user) {
        const userName = user.userName;
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
            <button onClick={handleLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HrSignin;
