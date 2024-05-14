import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';// Import Link from react-router-dom
import './CandidateDashboard.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import CandidateLeftSide from './CandidateLeftSide';

const CandidateDashboard = () => {
  const location = useLocation();
  const BASE_API_URL = "http://localhost:8080/api/jobbox";
  
  const userEmail=location.state?.userEmail;
  console.log(userEmail);
 

  const [userData, setUserData] = useState();
  const [userName,setUserName]=useState();
  const [userId,setUserId]=useState();
  
 

  const fetchUserData = async (userEmail) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/getHRName`, {
            params: {
              userEmail: userEmail
            }
          });

          console.log(response.data);
          
          
           setUserName(response.data.userName);
           setUserId(response.data.userId);
          
          
      setUserData(response.data);
      
    } catch (error) {
      
      setUserData(null);
    }
  };

  useEffect(() => {
   
      fetchUserData(userEmail);
    
  }, [userEmail]);



  const [countOfCompanies, setCountOfCompanies] = useState(null);
  const fetchApplications = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getCountOfAppliedCompany`, {
        params: {
          userEmail: userEmail
        }
      });
  
      console.log(response.data);
      setCountOfCompanies(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setCountOfCompanies(null);
    }
  };  
  useEffect(() => {
   
    fetchApplications(userEmail);
  
}, [userEmail]);


const [countOfTotalCompanies, setCountOfTotalCompanies] = useState(null);
const fetchTotalCompanies = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getCountOfTotalCompany`);

    console.log(response.data);
    setCountOfTotalCompanies(response.data);
  } catch (error) {
    console.error('Error fetching applications:', error);
    setCountOfTotalCompanies(null);
  }
};  
useEffect(() => {
 
  fetchTotalCompanies();

},);


const [countOfshortlistedApplications, setCountOfshortlistedApplications] = useState(null);
const fetchTotalShortlistedApplications = async (userEmail) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getCountOfTotalShortlistedApplication`, {
      params: {
        userEmail: userEmail
      }
    });

    console.log(response.data);
    setCountOfshortlistedApplications(response.data);
  } catch (error) {
    console.error('Error fetching applications:', error);
    setCountOfshortlistedApplications(null);
  }
};  
useEffect(() => {
 
  fetchTotalShortlistedApplications(userEmail);

},[userEmail]);







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
    <div className='left-side'>
   <CandidateLeftSide user={user} />
 </div>

      <div className='rightside'>
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
            <li>Setting </li>
            {/* Add more settings as needed */}
          </ul>
        </div>
      )}


        <div className="my-dashboard-container">
          <div>
            <div><h3 className='status-info'>My application status</h3></div>
         
            <div className="dashboard">
              <div className="data">
                <span>
                 
                  <Link to={{ pathname: '/candidate-companies',state:{userName: userName, userEmail:userEmail,userId:userId}  }}>
                  <h4>Applied to</h4>
                  <h2><b> {countOfCompanies !== null ? (
        <p> {countOfCompanies}</p>
      ) : (
        <p>Loading...</p>
      )}</b></h2>
                  <h4>companies</h4></Link>
               
                </span>
              </div>
              <div className="data">
                <h1>5</h1>
                <h4>resumes</h4>
              </div>
              <div className="data">
                <h1>250</h1>
                <h4>resume views</h4>
              </div>
              <div className="data">
              <Link to={{
          pathname: '/my-application',
          state: { userName: userName, userEmail:userEmail,applicationStatus:"Shortlisted" }
        }}><h2><b> {countOfshortlistedApplications !== null ? (
          <p> {countOfshortlistedApplications}</p>
        ) : (
          <p>Loading...</p>
        )}</b></h2>
                  <h4>shortlist</h4></Link>
              
              </div>
              <div className="data">
              <Link
  to={{
    pathname: '/candidate-companies',
    state: { userName: userName, userEmail: userEmail }
  }}
>
  <h2>
    {countOfTotalCompanies !== null ? (
      <p>{countOfTotalCompanies}</p>
    ) : (
      <p>Loading...</p>
    )}
  </h2>
  <h4>companies</h4>
</Link>

              </div>
            </div>
            {/* <div><h3 className='status-info'>My Resume Status  and Report</h3></div> */}
            
          </div>
        </div>
      </div>
      </div>
   
  );
};

export default CandidateDashboard;
