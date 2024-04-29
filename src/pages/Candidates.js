import React from 'react';
import { Link, withRouter } from 'react-router-dom'; // Import withRouter
import './Home.css';
<<<<<<< HEAD
//import axios from 'axios';

const Candidates = () => {
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //const BASE_API_URL ="http://localhost:8080/api/jobbox" ; // Replace with your actual API base URL
  const history = useHistory();


  // const validateLogin = async (userEmail, password) => {
  //   try {
  //     const response = await axios.post(`${BASE_API_URL}/login`, {
  //       userEmail,
  //       password,
  //     });

  //     if (response.data.success) {
  //       // Login successful (handle successful login)
  //       console.log('Login successful!');
       
        
  //       // You can redirect to a profile page or store a token here
  //     } else {
  //       // Login failed (display error message)
  //       console.error('Login failed:', response.data.message);
  //       alert('Invalid email or password. Please try again.'); // Alert user about login failure
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     alert('An error occurred during login. Please try again later.'); // Generic error message
  //   }
  // };
=======

class Candidates extends React.Component {
  state = {
    loginSuccess: false // Add a state to track login success
  };
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08

  redirectToSuccessPage = (event) => {
    event.preventDefault();
    // Simulate login success by updating state
    this.setState({ loginSuccess: true });
  }

<<<<<<< HEAD
    history.push('/candiadte-dashboard'); 

    //await validateLogin(userEmail, password);
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
              value={userEmail}
              onChange={(event) => setEmail(event.target.value)}
            />
=======
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
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Candidates); // Wrap the component with withRouter
