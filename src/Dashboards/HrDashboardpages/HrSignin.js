import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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

  const getUser = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getHRName?userEmail=${userEmail}`);
      return response.data; // This includes the user's data, including the username
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  const handleLogin = async () => {
    try {
      const user = await getUser(formData.userEmail);
      if (user) {
        const userName = user.userName; // Retrieve the username from the user object
        history.push("/hr-dashboard", { userName, userEmail: formData.userEmail });
      } else {
        console.error('User data not found');
      }
    } catch (error) {
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
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
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
