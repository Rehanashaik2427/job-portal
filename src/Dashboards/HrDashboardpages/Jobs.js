import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './HrDashboard.css';

const BASE_API_URL = "http://localhost:8080/api/jobbox";

const Jobs = () => {


 

  const location = useLocation();
    const userName = location.state?.userName;
    const [jobs, setJobs] = useState([]);
   
    
    const fetchJobs = async (userName) => {
      try {
        const response = await axios.get(`${BASE_API_URL}/jobsPostedByHrName?userName=${userName}`);
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
    fetchJobs(userName);
  }, [userName]);

  const history = useHistory();

  const handleUpdate = (jobId) => {
    // Navigate to the update page with the job ID
    history.push("/update-job", {jobId});
    
  };
  
  const handleDelete = async (jobId) => {
    try {
      const response = await axios.delete(`${BASE_API_URL}/deleteJobs/${jobId}`);
      if (response.status === 200) {
        // Refresh jobs data after successful deletion
        fetchJobs(userName);
        console.log(`Job with ID ${jobId} deleted successfully`);
      } else {
        console.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
  
    
 

  return (
    <div className='hr-dashboard-container'>
      {/* Left Side Navigation */}
      <div className='hr-leftside'>
        {/* Navigation Logo */}
        <nav id='logo'>
          <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>
        {/* HR Name */}
        <nav>
                    <h2>Welcome {userName}</h2>
                </nav>
                
                    <section id="hr-dashboard">
                        <FontAwesomeIcon icon={faHouse} /> <Link to={{ pathname: '/hr-dashboard', state: { userName: userName } }}>Dashboard</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/post-jobs', state: { userName: userName } }}>Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faAddressCard} /> <Link to={{ pathname: '/hr-applications', state: { userName: userName } }}>Applications</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/posted-jobs', state: { userName: userName } }}>Posted Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUsers} /> <Link to={{ pathname: '/people', state: { userName: userName } }}>People</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUser} /> <Link to={{ pathname: '/hr-profile', state: { userName: userName } }}>Profile</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faHome} /> <Link to={{ pathname: '/', state: { userName: userName } }}>Home</Link>
                    </section>
      </div>
      {/* Right Side Content */}
      <div className='hr-rightside'>
      <div>
  <h2>Jobs Posted by {userName}</h2>
  <table id='jobTable'>
    
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
            <button onClick={() => handleUpdate(job.jobId)}>Update</button>
            <button onClick={() => handleDelete(job.jobId)}>Delete</button>
          </td>
          
          
          
        </tr>
      ))}
   
  </table>
</div>

        


        
      </div>
    </div>
  );
};

export default Jobs;
