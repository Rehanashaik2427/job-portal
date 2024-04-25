// ./pages/Candidates.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Candidates extends React.Component {
  redirectToSuccessPage = (event) => {
    event.preventDefault();
    this.props.history.push('/CandidateSuccessMsg'); 
  }

  render() {
    return (
      <div className="candidate-login-form">
        <div id="login-form">
          <form id="loginform" onSubmit={this.redirectToSuccessPage}>
            <div className="candidate-login-form-group">
              <label htmlFor="login-email">Email:</label>
              <input type="email" id="login-email" name="login-email" required />
            </div>
            <div className="candidate-login-form-group">
              <label htmlFor="login-password">Password:</label>
              <input type="password" id="login-password" name="login-password" required />
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
  }
}

export default Candidates; // Make sure to export the component as default
