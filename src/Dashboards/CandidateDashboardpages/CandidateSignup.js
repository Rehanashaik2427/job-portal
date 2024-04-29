import React from 'react';
<<<<<<< HEAD
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./SinginCandi.css";

=======
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08


class CandidateSignup extends React.Component {
  redirectToSuccessPage = (event) => {
    event.preventDefault();
    window.location.href = "/CandidateRegisterSucessMsg";
  }

<<<<<<< HEAD
const BASE_API_URL="http://localhost:8080/api/jobbox";
const CandidateSignup=()=> {
  // redirectToSuccessPage = (event) => {
  //   event.preventDefault(); 
  //   window.location.href = "/CandidateRegisterSucessMsg";
  // }

    const [user, setUser] = useState({
      // userName: '',
      // userEmail: '',
      // password: '',
      // confirmpassword: '',
      // userRole: '',
      // phone:'',
    });
    const history = useHistory();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser(prevUser => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
    const validatePassword = () => {
      // Optional password validation (add more rules as needed)
      if (user.password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false; // Prevent form submission
      }
      if (user.password !== user.confirmpassword) {
        alert("Passwords don't match! Please re-enter.");
        return false;
      }
      return true; // Password is valid
    };
  console.log("pss"+validatePassword);
    const submitUser = async (e) => {
      e.preventDefault();
    
      if (!validatePassword()) return; // Exit if password validation fails
    console.log(user.password);
      try {
        console.log('User data before sending:', user);
        // Prepare API request details (URL, method, data)
        const apiUrl = BASE_API_URL + "/saveUser";
        const method = 'POST';
       //const data = user;

        //console.console.log(data);
    
        // Send the API request using axios
        const response = await axios.post(apiUrl, user, { method });
      
    
        console.log('User details submitted:', response.data);
    
        
    
        // Redirect to success page or handle success message
       
        history.push('/CandidateRegisterSucessMsg')
      } catch (error) {
       // console.error('Error submitting user details:', error);
        // Handle errors appropriately (e.g., display error message to the user)
      }
    };
    
    
  
   
  
  

  
=======
  render() {
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
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
<<<<<<< HEAD
  <label htmlFor="password">Password:</label>
  <input
    type="password"  // Change input type to "password"
    id="password"
    name="password"
    value={user.password}
    onChange={handleChange}
    required
  />
</div>
<div className="candidate-form-group">
  <label htmlFor="confirmPassword">Confirm Password:</label>
  <input
    type="password"  // Change input type to "password"
    id="confirmPassword"
    name="confirmpassword"
    value={user.confirmpassword}
    onChange={handleChange}
    required
  />
</div>

=======
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="candidate-form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
          </div>
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
          <div className="candidate-form-group">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

export default CandidateSignup;
