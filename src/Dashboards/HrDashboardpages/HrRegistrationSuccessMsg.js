import React from 'react';
import { Link } from 'react-router-dom';
import './Success.css';



const HrRegistrationSuccessMsg=()=>{
    return (
      <div className="sucess-msg-container" style={{textAlign:'center'}}>
      <h2>Registration Successful</h2>
      <p>Welcome!</p>
      <Link to='/hr-signin'>click here to see your details</Link>
    </div>
    )
  } 
  export default HrRegistrationSuccessMsg;