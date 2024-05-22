
<<<<<<< HEAD
import { faSignOutAlt, faUser,faSearch } from '@fortawesome/free-solid-svg-icons';
=======
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
>>>>>>> 6451d80737f1e7d4b8a888dfbe37350d8112fc51
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import HrLeftSide from './HrLeftSide';

<<<<<<< HEAD
const Jobs = () => {
  const BASE_API_URL = "http://localhost:8082/api/jobbox";
=======
const Jobs = ({ setJobCount }) => {
  const BASE_API_URL = "http://localhost:8081/api/jobbox";
>>>>>>> 6451d80737f1e7d4b8a888dfbe37350d8112fc51
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const userName=location.state?.userName;




  console.log(userEmail)


 

  const [jobs, setJobs] = useState([]);
  const history = useHistory();
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    if (userEmail) {
      
      fetchJobs(userEmail);

      

    }
  }, [userEmail]); 

  

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

  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.get(`${BASE_API_URL}/searchJobsByHR?search=${search}&userEmail=${userEmail}`);
      setJobs(response.data);

    }catch(error){
console.log("No data Found"+error);
    }
    console.log("Search submitted:", search);
  };


  return (
    <div className='hr-dashboard-container'>
      <div className='hr-leftside'>
        <HrLeftSide user={{ userName, userEmail }} />
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
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon'  style={{color:'black'}} onClick={toggleSettings}/></div>
        </div>
        {showSettings && (
        <div id="modal-container">
        <div id="settings-modal">
          {/* Your settings options here */}
          <ul>
            <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
            <li>Setting </li>
            {/* Add more settings as needed */}
          </ul>
          <button onClick={toggleSettings}>Close</button>
        </div>
        </div>
      )}

      <h2>Job posted by {userName}</h2>

      <div className='job-list'>
      {jobs.length > 0 && (
        <table id='jobTable1'>
          <tr>
            <th>Job Title</th>
            <th>Job Type </th>
            <th>Location</th>
            <th>Skills</th>
          
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
                <td>{job.skills}</td>
               
                <td>{job.numberOfPosition}</td>
                <td>{job.salary}</td>
                <td>{job.applicationDeadline}</td>
                <td>
                  <button className='update' onClick={() => handleUpdate(job.jobId)}>Update</button>
                  <button className='delete'  onClick={() => handleDelete(job.jobId)}>Delete</button>
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
  
                          
     <button className='add-job-button'>
    <Link to={{ pathname: '/addJob', state: { userName:userName, userEmail:userEmail } }}>Add Job</Link>
    </button>
                          
    </div> </div>

    </div>
  );
};

export default Jobs;
