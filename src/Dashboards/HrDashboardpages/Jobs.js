import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import HrLeftSide from './HrLeftSide';


const Jobs = () => {
  const BASE_API_URL = "http://localhost:8080/api/jobbox";
  const location = useLocation();
  const userEmail=location.state?.userEmail;

  
  const [userData, setUserData] = useState();
  const [userName,setUserName]=useState();
  console.log(userEmail);

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

 // const userName=userData.userName;

  console.log(userName);

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const user = {
   userName: userName,
   
    userEmail: userEmail,
  };
  return (
    <div className='candidate-dashboard-container'>
 
      <div className='hr-leftside'><HrLeftSide user={user} /></div>
     
      <div className='hr-rightside'>
      <div className="candidate-search">
         
      
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon'  style={{color:'black'}} onClick={toggleSettings}/></div>
        </div>
        {showSettings && (
        <div id="settings-container">
          {/* Your settings options here */}
          <ul>
            <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
            <li>Setting</li>
            {/* Add more settings as needed */}
          </ul>
        </div>
      )}
        <h2>You haven't posted a job yet</h2>
        <p style={{textAlign:'center'}}>If u want to post the job click below button</p>
        <div className='add-job-button'>
        <button  className="add-job-button"><Link to='/addJob'>Add Job</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Jobs
