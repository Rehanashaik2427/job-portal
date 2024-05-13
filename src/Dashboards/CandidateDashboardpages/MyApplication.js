import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser ,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useState,useEffect } from 'react';
import axios from 'axios';
import CandidateLeftSide from './CandidateLeftSide';

const MyApplication = () => {

  const BASE_API_URL="http://localhost:8080/api/jobbox";
  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const [applications,setApplications]=useState([]);
const fetchApplications= async()=>
  {
    try {
      const response = await axios.get(`${BASE_API_URL}/applications?userEmail=${userEmail}`);
      setApplications(response.data); 
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    // Fetch applications when component mounts
    fetchApplications();
  }, []);

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
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon'  style={{color:'black'}} onClick={toggleSettings}/></div>
          
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

        <div>
            <h1 style={{textAlign:'center'}}>MY APPLICATIONS</h1>
            <div className='applications-table'>
            <table className='applications-table'>
                <tr>
                    <th>Company Name</th>
                    <th>Job Title</th>
                    <th >Applied On</th>
                    <th>Resume Profile</th>
                    <th>Status & Actions</th>
                  
                  
                </tr>
                {applications.map(application => (
            <tr key={application.id}>
              <td>{application.companyName}</td>
              <td>{application.jobRole}</td>
              <td>{application.appliedOn}</td>
              <td>{application.resume}</td>
              <td>{application.applicationStatus}</td>
             
            </tr>
               ))}

               

                
            </table>
              </div>
               
        </div>
      </div>
    </div>
  )
}

export default MyApplication
