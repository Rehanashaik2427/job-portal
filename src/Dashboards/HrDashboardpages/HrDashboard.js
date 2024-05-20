import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './HrDashboard.css';
import HrLeftSide from './HrLeftSide';
const HrDashboard = () => {

  const BASE_API_URL = "http://localhost:8081/api/jobbox";
  const location = useLocation();
 
  // const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;

  console.log(userEmail);

  
  const [jobCount, setJobCount] = useState(0);
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
         <div className='hr-leftside'>
        <HrLeftSide user={user} />
      </div>

      <div className='hr-rightside'>
       
      <div className="candidate-search">
            <input type='text' placeholder='serach'></input>
            <button>
              <FontAwesomeIcon icon={faSearch} className='button' style={{color:'skyblue'}}/>
            </button>
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
            <div className="box-container">

                {/* First row - first box */}
                <div className="box">
                    <h2>Jobs</h2>
                    <h4 style={{ alignContent: 'center' }}>{jobCount} jobs </h4>
                    <img src="https://cdn-icons-png.flaticon.com/128/3688/3688609.png" className="animated-icons" alt="Jobs Icon" />
                    <p>Everyday 100+ jobs are posted by us</p>
                </div>

                {/* First row - second box */}
                <div className="box">
                    <h2>Total Applications</h2>
                    <img src="https://cdn-icons-png.flaticon.com/128/942/942748.png" className="animated-icons" alt="Applications Icon" />
                    <p >Total Applications count 200+</p>
                </div>

                {/* Second row - first box */}
                <div className="box">
                    <h2>Shortlisted candidates</h2>
                    <img src="https://cdn-icons-png.flaticon.com/128/11356/11356039.png" className="animated-icons" alt="Candidates Icon" />
                    <p>click here to see <a href="#">list of candidates</a></p>
                </div>

                  {/* Second row - second box */}
                <div className="box">
                    <h2>Activities</h2>
                        <img src="https://cdn-icons-png.flaticon.com/128/15597/15597760.png" className="animated-icons" alt="Activities Icon" />
                     
                </div>
            </div>
            
        </div>

      </div>
    
  );
}

export default HrDashboard;
