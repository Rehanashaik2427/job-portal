import React from 'react';
import './CandidateDashboard.css';

class CandidateSignup extends React.Component {
  redirectToSuccessPage = (event) => {
    event.preventDefault(); 
    window.location.href = "/CandidateRegisterSucessMsg";
  }

  render() {
    return (
      <div className="signup-container">
        <form id="signupForm" onSubmit={this.redirectToSuccessPage}>
          <div className="candidate-form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className='candidate-name' required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
          </div>
          <div className="candidate-form-group">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

export default CandidateSignup;
