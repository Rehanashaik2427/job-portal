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

  




  const handleSubmit = async () => {

    try {
      const response = await axios.get(`${BASE_API_URL}/login?userEmail=${userEmail}&password=${password}`);
      console.log(response);
      if(response.data)
      history.push('/candidate-dashboard', {userEmail});
    else{
      alert("invalid userName or password")
    }
  }
    catch(error)
    {
      console.log(error);
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
