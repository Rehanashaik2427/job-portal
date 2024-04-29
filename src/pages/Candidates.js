import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';

const Candidates = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/candiadte-dashboard');
    // Simulated login validation - replace with actual validation logic
    // if (userEmail === 'example@example.com' && password === 'password') {
    //   // Clear login error if any
    //   setLoginError('');

    //   // Redirect to candidate dashboard on successful login
     
    // } else {
    //   // Display login error if credentials are incorrect
    //   setLoginError('Invalid email or password. Please try again.');
    // }
  };

  return (
    <div className="candidate-login-form">
      <div id="login-form">
        
          <form id="loginform" onSubmit={handleSubmit}>
            <div className="candidate-login-form-group">
              <label htmlFor="login-email">Email:</label>
              <input type="email" id="login-email" name="userEmail" required />
            </div>
            <div className="candidate-login-form-group">
              <label htmlFor="login-password">Password:</label>
              <input type="password" id="login-password" name="password" required />
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
