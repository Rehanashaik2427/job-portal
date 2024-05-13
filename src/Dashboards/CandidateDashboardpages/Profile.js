import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import CandidateLeftSide from './CandidateLeftSide';
import axios from 'axios';


const Profile = () => {
  const BASE_API_URL="http://localhost:9090/api/jobbox";
  const [userData,setUserData]=useState();
  const getUser=async()=>{
    try{
      const response=await axios.get(`${BASE_API_URL}/getCandidate?userEmail=${userEmail}`);
      setUserData(response.data);

    }catch(error){
console.log(error);
    }

  }
  useEffect(()=>{
    getUser();
  })

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };


  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;
  const user = {
    userName: userName,
    
     userEmail: userEmail,
   };

    return (
      <div className='candidate-dashboard-container'>
      <div className='left-side'>
     <CandidateLeftSide user={user} />
   </div>

      <div className='rightside'>
        <div className="top-right-content">
        <div className="top-right-content">
          <div className="candidate-search">
            <input type='text' placeholder='serach'></input>
            <button>
              <FontAwesomeIcon icon={faSearch} className='button' style={{color:'skyblue'}}/>
            </button>
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{color:'black'}} onClick={toggleSettings}/></div>
          
          </div>
         
    
        </div>
        {showSettings && (
        <div id="settings-container">
          {/* Your settings options here */}
          <ul>
            <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
            <li>Setting 2</li>
            {/* Add more settings as needed */}
          </ul>
        </div>
      )}
       
       <div className="profile-container">
  {userData && (
    <>
      <div className="profile-item">
        <span className="profile-label">Name:</span>
        <span className="profile-value">{userData.userName}</span>
      </div>
      <div className="profile-item">
        <span className="profile-label">Email:</span>
        <span className="profile-value">{userData.userEmail}</span>
      </div>
      <div className="profile-item">
        <span className="profile-label">PhoneNumber:</span>
        <span className="profile-value">{userData.phone}</span>
      </div>
      {/* <button className="profile-button" onClick={handleEdit}>Edit</button> */}
    </>
  )}
</div>


     
    </div>
      </div>
    </div>
  )
}

export default Profile
