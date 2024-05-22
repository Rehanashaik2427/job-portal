import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './HrDashboard.css';
import HrLeftSide from './HrLeftSide';


const PostedJobs = () => {
  const BASE_API_URL = "http://localhost:8082/api/jobbox";


  const location = useLocation();
  const userName = location.state?.userName;
  const userEmail = location.state?.userEmail;
 // const [jobCount, setJobCount] = useState(0); // State for job count
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/jobsPostedByHrEmaileachCompany?userEmail=${userEmail}`);
      console.log(response.data);
      if (response.status === 200) {
       
        setJobs(response.data);
      
        console.log("Job Count:", response.data.length); // Log job count
  
        console.log("Job Count:", response.data.length); // Log job count
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

  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.get(`${BASE_API_URL}/searchJobsByCompany?search=${search}&userEmail=${userEmail}`);
      setJobs(response.data);

    }catch(error){
console.log("No data Found"+error);
    }
    console.log("Search submitted:", search);
  };

  const [selectedJobSummary, setSelectedJobSummary] = useState(null);

  const handleViewSummary = (summary) => {
    setSelectedJobSummary(summary);
  };

  const handleCloseModal = () => {
    setSelectedJobSummary(null);
  };


  const user = {
    userName: userName,
    
     userEmail: userEmail,
   };
 
 
   return (
     <div className='hr-dashboard-container'>
          <div className='hr-leftside'>
         <HrLeftSide user={user}/>
       </div>

      <div className='hr-rightside'>
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
          <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{ color: 'black' }} onClick={toggleSettings} /></div>
        </div>
        {showSettings && (
        <div id="modal-container">
        <div id="settings-modal">
       
          <ul>
            <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
            <li>Setting </li>
           
          </ul>
          <button onClick={toggleSettings}>Close</button>
        </div>
        </div>
      )}


          {/* <div id="settings-container">
            <ul>
              <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
              <li>Setting</li>
            </ul>
          </div> */}
        
        {/* <h2>Total Jobs: {jobCount}</h2> */}
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
                  <th>Vacancy</th>
                  <th>Application Deadline</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id}>
                    <td>{job.userName}</td>
                    <td>{job.companyName}</td>
                    <td><a onClick={() => handleViewSummary(job.jobsummary)}>{job.jobTitle}</a></td>
                    <td>{job.jobType}</td>
                    <td>{job.skills}</td>
                   
                    <td>{job.numberOfPosition}</td>
                    <td>{job.applicationDeadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedJobSummary && (
        <div className="modal-summary">
          <div className="modal-content-summary">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Job Summary</h2>
            <p>{selectedJobSummary}</p>
          </div>
        </div>
      )}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default PostedJobs;
