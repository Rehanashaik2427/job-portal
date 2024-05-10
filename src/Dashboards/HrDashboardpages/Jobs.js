import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HrDashboard.css';
import HrLeftSide from './HrLeftSide';
import axios from 'axios';

const Jobs = () => {
  const BASE_API_URL = "http://localhost:8080/api/jobbox";
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
const userEmail=location.state?.userEmail;
const userName = location.state?.userName;

  const [jobs, setJobs] = useState([]);
  const fetchJobs = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/jobsPostedByHrEmail?userEmail=${userEmail}`);
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
        <div className='job-list'>
          {/* <h2>Jobs Posted by </h2> */}
         

  

  
                                {jobs.length > 0 && (
                                <table id='jobTable1'>
                                  <tr>
                                    <th>Job Title</th>
                                    <th>Job Type </th>
                                    <th>Location</th>
                                    <th>Requirements</th>
                                    <th>Eligible</th>
                                    <th>No of Position</th>
                                    <th>Salary</th>
                                    <th>Application DeadLine</th>
                                    <th>Action</th>
                                  </tr>
                                  {jobs.map(job => (
                                    job.jobId !== 0 && (
                                      <tr key={job.id}>
                                        <td>{job.jobTitle}</td>
                                        <td>{job.jobType}</td>
                                        <td>{job.location}</td>
                                        <td>{job.requirements}</td>
                                        <td>{job.eligibility}</td>
                                        <td>{job.numberOfPosition}</td>
                                        <td>{job.salary}</td>
                                        <td>{job.applicationDeadline}</td>
                                        <td>
                                          {/* <button onClick={() => handleUpdate(job.jobId)}>Update</button>
                                          <button onClick={() => handleDelete(job.jobId)}>Delete</button> */}
                                        </td>
                                      </tr>
                                    )
                                  ))}
                                </table>
)}
                          {jobs.length === 0 && (
                            <section className='not-yet'>
                              <h2 >You have not posted any jobs yet. Post Now</h2>
                            </section>
                          )}


                          <div className='addJob'>
                          <Link to={{ pathname: '/addJob', state: {  userEmail:userEmail } }}>Add Job</Link>
                          </div>

                          </div> </div>
    </div>
  );
};

export default Jobs;
