import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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

  const BASE_API_URL = "http://localhost:8082/api/jobbox";

  const userEmail=formData.userEmail;
  const password=formData.password;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.get(`${BASE_API_URL}/login?userEmail=${userEmail}&password=${password}`);
      console.log(response);
      if(response.data)
      history.push('/hr-dashboard', {userEmail});
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
    <div className="centered-form"> {/* Apply centered styling to the form */}
      <div className="form-container">
        <h2>HR Sign In</h2>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="form-group">
            <label htmlFor="userEmail">Email:</label>
            <input type="email" id="userEmail" name="userEmail" value={formData.userEmail} onChange={handleInputChange} placeholder='email' required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder='password' required />
          </div>
          <div className="form-group">
            <button onClick={handleLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HrSignin;
