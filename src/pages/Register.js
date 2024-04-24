import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const Register = () => {
  // State variables for user information and type
  const [userType, setUserType] = useState("");
  const history = useHistory(); // Initialize useHistory

  // Function to handle user type selection
  const handleUserTypeChange = (type) => {
    setUserType(type);
    // Programmatic navigation based on user type
    if (type === "admin") {
      history.push("/admin-register");
    }
    if (type === "hr") {
      history.push("/hr-registeration");
    }
    if (type === "candidate") {
      history.push("/candidate-signup");
    }
  };

  return (
    <div className="centered-form">
      <div className="form-container">
        <h2 className='heading'>User Registration</h2>
        <form onSubmit={(event) => event.preventDefault()} className="user-registration-form">
          <p style={{textAlign:'center'}}>Select your role and please fill the details</p>
          

          <div className="radio-group">
            <div className="radio-button">
              <input type="radio" name="userType" value="admin" onChange={() => handleUserTypeChange("admin")} checked={userType === "admin"} /> Admin
              {/* <label>Admin</label> <br /> */}
            </div >

            <div className="radio-button">
            <input type="radio" name="userType" value="hr" onChange={() => handleUserTypeChange("hr")} checked={userType === "hr"} />Hr
            {/* <label>HR</label> <br /> */}
            </div>

            <div className="radio-button">
              <input type="radio" name="userType" value="candidate" onChange={() => handleUserTypeChange("candidate")} checked={userType === "candidate"} />Candidate
              {/* <label>Candidate</label> */}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;
