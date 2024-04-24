import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for programmatic navigation

const HrSignin = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    password: "",
  });
  const history = useHistory(); // Initialize useHistory

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    // Example: perform login logic (e.g., send data to backend, validate credentials)
    // For demonstration, just navigate to a success page if login is successful
    history.push("/hr-dashboard");
  };

  return (
    <div className="centered-form"> {/* Apply centered styling to the form */}
      <div className="form-container">
        <h2>HR Sign In</h2>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="form-group">
            <label htmlFor="userEmail">Email:</label>
            <input type="email" id="userEmail" name="userEmail" value={formData.userEmail} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input style={{height:'20%'}}type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <button style={{backgroundColor:'skyblue', height:'40px' , width:'100px',fontSize:'16px'}}type="button" onClick={handleLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HrSignin;
