import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const Candidates = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const BASE_API_URL ="http://localhost:8080/api/jobbox" ; // Replace with your actual API base URL
  const history = useHistory();

  const validateLogin = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/login`, {
        email,
        password,
      });

      if (response.data.success) {
        // Login successful (handle successful login)
        console.log('Login successful!');
        history.push('/candiadte-dashboard'); 
        
        // You can redirect to a profile page or store a token here
      } else {
        // Login failed (display error message)
        console.error('Login failed:', response.data.message);
        alert('Invalid email or password. Please try again.'); // Alert user about login failure
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.'); // Generic error message
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   

    await validateLogin(email, password);
  };

  return (
    <div className="candidate-login-form">
      <div id="login-form">
        <form id="loginform" onSubmit={handleSubmit}>
          <div className="candidate-login-form-group">
            <label htmlFor="login-email">Email:</label>
            <input
              type="email"
              id="login-email"
              name="userEmail"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="candidate-login-form-group">
            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
         
        
          <div className="candidate-login-form-group">
            <button type="submit">Login</button>
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
