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
  const applicationStatus=location.state?.applicationStatus;
  const [showSettings, setShowSettings] = useState(false);
  //const [applicationStatus, setApplicationStatus] = useState(null);

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


  

  const fetchApplicationsByStatus= async()=>
    {
      try {
        const response = await axios.get(`${BASE_API_URL}/applicationsBySearch?searchStatus=${applicationStatus}&userEmail=${userEmail}`);
        setApplications(response.data); 
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
  
    useEffect(() => {
      // Fetch applications when component mounts
      if (applicationStatus) {
        fetchApplicationsByStatus();
      } else {
        fetchApplications();
      }
    }, []);

    

    const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      try {
        const response = await axios.get(`${BASE_API_URL}/applicationsBySearch?searchStatus=${search}&userEmail=${userEmail}`);
        setApplications(response.data); 
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
      
     
      console.log("Search submitted:", search);
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
          <form className="candidate-search" onSubmit={handleSubmit}>
      <input
        type='text'
        name='search'
        placeholder='Search'
        value={search}
        onChange={handleSearchChange}
      />
      <button type="submit">
        <FontAwesomeIcon icon={faSearch} className='button' style={{ color: 'skyblue' }} />
      </button>
    </form>
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
     
        {applications.length > 0 && (
         <div>
         <h1 style={{ textAlign: 'center' }}>MY APPLICATIONS</h1>
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
              )}
              {applications.length === 0 && <h1>No application found.</h1>}
               
        </div>
      </div>
    </div>
  )
}

export default MyApplication
