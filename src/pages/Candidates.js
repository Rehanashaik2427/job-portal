import React from 'react';
import { Link, withRouter } from 'react-router-dom'; // Import withRouter
import './Home.css';

class Candidates extends React.Component {
  state = {
    loginSuccess: false // Add a state to track login success
  };

  redirectToSuccessPage = (event) => {
    event.preventDefault();
    // Simulate login success by updating state
    this.setState({ loginSuccess: true });
  }

  render() {
    return (
      <div className="candidate-login-form">
        <div id="login-form">
          {/* Conditional rendering for login success message */}
          {this.state.loginSuccess ? (
            <div className="login-success-message">
              Login successful! Welcome back! <Link to="/candiadte-dashboard">Click here to view your dashboard</Link>
            </div>
          ) : (
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
          )}
          <div className="candidate-login-switch-form">
            Don't have an account? <Link to="/candidate-signup">Signup</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Candidates); // Wrap the component with withRouter
