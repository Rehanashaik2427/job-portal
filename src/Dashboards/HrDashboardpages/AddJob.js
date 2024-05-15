import React, { useState } from 'react';
import './HrDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import HrLeftSide from './HrLeftSide';
const AddJob = () => {
  const location=useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;


 const user = {
   userName: userName,
   
    userEmail: userEmail,
  };


  return (
    <div className='candidate-dashboard-container'>
         <div className='hr-leftside'>
        <HrLeftSide user={user} />
      </div>

      <div className='hr-rightside'>
      </div>
      </div>
 )
};

export default AddJob;
