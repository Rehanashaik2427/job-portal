import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HrDashboard.css';
import HrLeftSide from './HrLeftSide';
const Jobs = () => {
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const [jobs, setJobs] = useState([]);
  // Assuming userName and userEmail are coming from somewhere in your component's props or state
  // const userName = 'Your UserName';
  // const userEmail = 'Your UserEmail';

  return (
    <div className='hr-dashboard-container'>
      <div className='hr-leftside'>
        <HrLeftSide />
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
        <div>
          {/* <h2>Jobs Posted by </h2> */}
          {jobs.length > 0 ? (
            <table id='jobTable'>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Job Type</th>
                  <th>Location</th>
                  <th>Requirements</th>
                  <th>Eligible</th>
                  <th>No of Position</th>
                  <th>Salary</th>
                  <th>Application DeadLine</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
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
                        <button>Update</button>
                        <button >Delete</button>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          ) : (
            <section>
              <h2 colSpan="9">You have not posted any jobs yet.</h2>
            </section>
          )}
          <div className='addJob'>
            <button><Link to= '/addJob'>Add Job</Link></button>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default Jobs;
