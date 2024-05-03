import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const Candidates = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    password: '',
  });

  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const BASE_API_URL = 'http://localhost:8080/api/jobbox';

  const getUser = async (userEmail, password) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/login?userEmail=${userEmail}&password=${password}`
      );

      if (!response.data) {
        throw new Error('Invalid email or password. Please try again.');
      }

      return response.data;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const user = await getUser(formData.userEmail, formData.password);
      if (user) {
        // Redirect to dashboard after successful login
        console.log(user);
        const userEmail=user.userEmail;
        const userName=user.userName;
        console.log(userEmail);
        console.log(userName);
        history.push('/candidate-dashboard', { userName },{userEmail});
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      alert(error.message); // Display error message
      console.error('Error:', error.message);
    }
  };
  

  return (
    <div className="candidate-login-form">
      <div id="login-form">
        
          <form id="loginform"  >
            <div className="candidate-login-form-group">
              <label htmlFor="login-email">Email:</label>
              <input type="email" id="login-email" name="userEmail" value={formData.userEmail} onChange={handleInputChange} required />
            </div>
            <div className="candidate-login-form-group">
              <label htmlFor="login-password">Password:</label>
              <input type="password" id="login-password" name="password" value={formData.password} onChange={handleInputChange} required />
            </div>
            <div className="candidate-login-form-group">
              <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
          </form>
        
        <div className="candidate-login-switch-form">
          Don't have an account? <Link to="/candidate-signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
