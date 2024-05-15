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
  const password=formData.password;


 const BASE_API_URL = "http://localhost:8081/api/jobbox";

  




//   const handleSubmit = async () => {

//     try {
//       const response = await axios.get(`${BASE_API_URL}/login?userEmail=${userEmail}&password=${password}`);
//       console.log(response.data);
//       if(response.data)
//       history.push('/candidate-dashboard', {userEmail});
//     else{
//       alert("invalid userName or password")
//     }
//   }
// }
  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/login?userEmail=${userEmail}&password=${password}`);
      console.log(response.data.userName);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    
    try {
      const user = await getUser();
      if (user) {
        const userName = user.userName;
        const userEmail = formData.userEmail;
        console.log(userName);
        console.log(userEmail);
  
        history.push('/candidate-dashboard', { userEmail });
      } else {
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
