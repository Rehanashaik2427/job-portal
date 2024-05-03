import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; // Import useHistory for programmatic navigation

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
        history.push('/hr-dashboard', { userName },{userEmail});
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      alert(error.message); // Display error message
      console.error('Error:', error.message);
    }
  };
  

  return (
    <div className="centered-form"> {/* Apply centered styling to the form */}
      <div className="form-container">
        <h2>HR Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userEmail">Email:</label>
            <input type="email" id="userEmail" name="userEmail" value={formData.userEmail} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input style={{height:'20%'}}type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <button style={{backgroundColor:'skyblue', height:'40px' , width:'100px',fontSize:'16px'}}type="button" onClick={handleSubmit}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HrSignin;
//   history.push("/hr-dashboard", {userEmail});