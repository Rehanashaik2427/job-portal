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
 const userEmail=formData.userEmail;

 const BASE_API_URL = "http://localhost:8080/api/jobbox";

  

  const getUser = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getCandidate?userEmail=${userEmail}`);
      console.log(response.data.userName);
      return response.data.userName;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    // history.push('/candidate-dashboard')
    try {
      const user = await getUser(formData.userEmail);
      if (user) {
        const userName = user;
        const userEmail=formData.userEmail;
        console.log(userName)
        console.log(userEmail);
      
        history.push('/candidate-dashboard', {userEmail});
      } else {
        debugger
        console.error('User data not found or userName is missing');
      }
    } catch (error) {
    
      console.error('Error fetching user:', error);
    }
  };
  

  return (
    <div className="centered-form">
      <div className="form-container">
          <h2>Candidate SignIn</h2>
          <form >
            <div className="form-group">
              <label htmlFor="login-email">Email:</label>
              <input type="email" id="login-email" name="userEmail" value={formData.userEmail} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password:</label>
              <input type="password" id="login-password" name="password" value={formData.password} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
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
