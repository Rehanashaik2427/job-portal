import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './HrDashboard.css';
import HrLeftSide from './HrLeftSide';

const PostedJobs = () => {
  const BASE_API_URL = "http://localhost:8080/api/jobbox";
  const location = useLocation();
  const userName = location.state?.userName;
  const userEmail = location.state?.userEmail;

  const [jobs, setJobs] = useState([]);
  const fetchJobs = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/jobsPostedByHrEmaileachCompany?userEmail=${userEmail}`);
      console.log(response.data);
      if (response.status === 200) {
        setJobs(response.data);
      } else {
        console.error('Failed to fetch jobs data');
      }
    } catch (error) {
      console.error('Error fetching jobs data:', error);
    }
  };
  

useEffect(() => {
  fetchJobs(userEmail);
}, [userEmail]);
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
         <HrLeftSide />
       </div>

      <div className='hr-rightside'>
        <div className="candidate-search">
          <input type='text' placeholder='serach'></input>
          <button>
            <FontAwesomeIcon icon={faSearch} className='button' style={{ color: 'skyblue' }} />
          </button>
          <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{ color: 'black' }} onClick={toggleSettings} /></div>
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
        <div>
          <div className="jobs_list">
            <table id='jobTable1'>
              <thead>
                <tr>
                  <th>Hr Name</th>
                  <th>Company Name</th>
                  <th>Job Title</th>
                  <th>Job Type</th>
                  <th>Skills</th>
                  <th>Eligible Candidates</th>
                  <th>Vacancy</th>
                  <th>Application Deadline</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id}>
                    <td>{job.hrName}</td>
                    <td>{job.companyName}</td>
                    <td>{job.jobTitle}</td>
                    <td>{job.jobType}</td>
                    <td>{job.requirements}</td>
                    <td>{job.eligibility}</td>
                    <td>{job.numberOfPosition}</td>
                    <td>{job.applicationDeadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* {showSettings && (
          <div id="settings-container">
            <ul>
              <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sign out</Link></li>
              <li>Setting</li>
              {/* Add more settings as needed */}
        {/* </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default PostedJobs;
