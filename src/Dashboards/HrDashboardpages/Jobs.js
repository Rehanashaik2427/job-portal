
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import HrLeftSide from './HrLeftSide';

const Jobs = ({ setJobCount }) => {
  const BASE_API_URL = "http://localhost:8081/api/jobbox";
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  console.log(userEmail)
  const { companyName } = location.state || {};

  const [userName, setUserName] = useState('');
  const [jobs, setJobs] = useState([]);
  const history = useHistory();
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    if (userEmail) {
      fetchUserData(userEmail);
      fetchJobs(userEmail);
    }
  }, [userEmail]); // Only fetch data when userEmail changes

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getHRName`, {
        params: { userEmail: email }
      });
      setUserName(response.data.userName);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchJobs = async (email) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/jobsPostedByHrEmail`, {
        params: { userEmail: email }
      });
      setJobs(response.data);
      setJobCount(response.data.length);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleUpdate = (jobId) => {
    history.push({
      pathname: '/update-job',
      state: {
        userName: userName,
        userEmail: userEmail,
        jobId: jobId
      }
    });
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${BASE_API_URL}/deleteJob?jobId=${jobId}`);
      alert("Job Deleted successfully");
      fetchJobs(userEmail); // Refresh jobs after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className='candidate-dashboard-container'>
      <div className='hr-leftside'>
        <HrLeftSide user={{ userName, userEmail }} />
      </div>
      <div className='hr-rightside'>
        <div className="candidate-search">
          <div>
            <FontAwesomeIcon icon={faUser} id="user" className='icon' style={{ color: 'black' }} onClick={toggleSettings} />
          </div>
        </div>
        {showSettings && (
          <div id="settings-container">
            <ul>
              <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sign out</Link></li>
              <li>Setting</li>
            </ul>
          </div>
        )}
        {jobs.length > 0 ? (
          <table id='jobTable1'>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Job Type</th>
                <th>Posting Date</th>
                <th>Requirements</th>
                <th>Number of positions</th>
                <th>Application Deadline</th>
                <th>Job Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.jobId}>
                  <td>{job.jobTitle}</td>
                  <td>{job.jobType}</td>
                  <td>{job.postingDate}</td>
                  <td>{job.skills}</td>
                  <td>{job.numberOfPosition}</td>
                  <td>{job.applicationDeadline}</td>
                  <td><button>Job Description</button></td>
                  <td>
                    <button onClick={() => handleUpdate(job.jobId)}>Update
                      {/* <Link to={{pathname:'/update-job',state:{userName:userName,userEmail: userEmail}}}>Update</Link> */}
                    </button>
                    <button onClick={() => handleDelete(job.jobId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='not-yet'>
            <h2>You have not posted any jobs yet.</h2>
            <p>If you want to post a job, click the button below:</p>

          </div>
        )}
                    <div className='add-job-button'>
              <button className="add-job-button">
                <Link to={{ pathname: '/addJob', state: { userName, userEmail, companyName } }}>Add Job</Link>
              </button>
            </div>
      </div>
    </div>
  );
};

export default Jobs;
