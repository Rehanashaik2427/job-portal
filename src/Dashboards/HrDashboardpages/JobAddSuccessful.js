import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import "./JobAddSuccessful.css";
const JobAdded = () => {
    
const BASE_API_URL="http://localhost:8081/api/jobbox";
    const location=useLocation();
    const userEmail=location.state?.userEmail;

    
  console.log(userEmail);
 

  const [userData, setUserData] = useState();
  const [userName,setUserName]=useState();
  
 

  const fetchUserData = async (userEmail) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/getHRName`, {
            params: {
              userEmail: userEmail
            }
          });

          console.log(response.data);
          
          
           setUserName(response.data.userName);
          
          
      setUserData(response.data);
      
    } catch (error) {
      
      setUserData(null);
    }
  };

  useEffect(() => {
   
      fetchUserData(userEmail);
    
  }, [userEmail]);


  return (
    <div className='jobAddedSuccess'>
      <h2>Job Successfully Added!</h2>
      <p>Thank you, {userName}, for adding the job.</p>
      <p>You can go back to the dashboard or add another job:</p>
      <Link to={{ pathname: '/post-jobs', state: { userName, userEmail } }}>Go to Jobs</Link>
      <br />
      <Link to={{ pathname: '/addJob', state: { userName, userEmail } }}>Add Another Job</Link>
    </div>
  );
};

export default JobAdded;
