import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './HrDashboard.css';
import HrLeftSide from './HrLeftSide';

const Jobs = () => {
  const BASE_API_URL = "http://localhost:8082/api/jobbox";
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const userName = location.state?.userName;
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [selectedJobSummary, setSelectedJobSummary] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  // const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const [search, setSearch] = useState('');
  const [numbers, setNumbers] = useState([]);
  const history = useHistory();
  const [showSettings, setShowSettings] = useState(false);
  const visibleJobs = jobs.filter(job => job.jobStatus); 


  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    if (userEmail) {
      fetchJobs(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    const pageNumbers = [];
    const totalPages = Math.ceil(visibleJobs.length / jobsPerPage); // Update totalPages based on visibleJobs
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    setNumbers(pageNumbers);
  }, [visibleJobs ,totalPages]);

  useEffect(() => {

    setJobCount(filteredJobs.length);
  }, [filteredJobs]);

  const fetchJobs = async (email) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/jobsPostedByHrEmail`, {
        params: { userEmail: email }
      });
      setJobs(response.data);
      setFilteredJobs(response.data);
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

  // const handleDelete = async (jobId) => {
  //   try {
  //     await axios.delete(`${BASE_API_URL}/deleteJob?jobId=${jobId}`);
      
  //     fetchJobs(userEmail);
  //   } catch (error) {
  //     console.error('Error deleting job:', error);
  //   }
  // };
 
  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${BASE_API_URL}/deleteJob?jobId=${jobId}`);
      // Remove the job from the frontend list
      setJobs(prevJobs => prevJobs.filter(job => job.jobId !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
 


  
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.get(`${BASE_API_URL}/searchJobsByHR`, {
        params: { search, userEmail }
      });
      setJobs(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error searching:", error);
      alert("Error searching for jobs. Please try again later.");
    }
  };
  
   const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
  
  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  const handleJobDescription = (summary) => {
    setSelectedJobSummary(summary);
    setShowJobDescription(true);
  };

  const closeJobDescription = () => {
    setShowJobDescription(false);
    setSelectedJobSummary('');
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className='hr-dashboard-container'>
      <div className='hr-leftside'>
        <HrLeftSide user={{ userName, userEmail }} />
      </div>
      <div className='hr-rightside'>
        
        <div className="candidate-search">
              <form className="candidate-search1"  onSubmit={handleSubmit}>
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
  
      {showJobDescription && (
        <div className="modal-summary">
          <div className="modal-content-summary">
            <span className="close" onClick={closeJobDescription}>&times;</span>
            <h2>Job Description</h2>
            <pre>{selectedJobSummary}</pre>
          </div>
        </div>
      )}
      {/* <h2>Job posted by {userName}</h2> */}
      <div className='job-list'>
        {/* {jobs.length > 0 && ( */}
        {visibleJobs.length > 0 &&(
          <table id='jobTable1'>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Job Type </th>
                <th>postingDate</th>
                <th>Skills</th>
                <th>No of Position</th>
                <th>Application DeadLine</th>
                <th>Job Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {currentJobs.map(job => ( */}
              {visibleJobs.slice(indexOfFirstJob, indexOfLastJob).map(job => (
                job.jobId !== 0 && (
                  <tr key={job.id}>
                    <td>{job.jobTitle}</td>
                    <td>{job.jobType}</td>
                    <td>{job.postingDate}</td>
                    <td>{job.skills}</td>
                    <td>{job.numberOfPosition}</td>
                    <td>{job.applicationDeadline}</td>
                    <td>
                        <button className='description' onClick={() => handleJobDescription(job.jobsummary)}>Description</button>
                      </td>
                    <td>
                      <button className='update' onClick={() => handleUpdate(job.jobId)}>Update</button>
                      <button className='delete' onClick={() => handleDelete(job.jobId)}>Delete</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )}
            {filteredJobs.length === 0 && (
        <section className='not-yet'>
          <h2>You have not posted any jobs yet. Post Now</h2>
        </section>
      )}
        <nav>
          <ul className='pagination'>
            {numbers.map((n, i) => (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                <Link to={{ pathname: '/post-jobs', state: { userName: userName, userEmail: userEmail } }} className='page-link' onClick={() => changeCurrentPage(n)}>{n}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button className='add-job-button'>
        <Link to={{ pathname: '/addJob', state: { userName: userName, userEmail: userEmail } }}>Add Job</Link>
      </button>
    </div>

</div>
  );
};

export default Jobs;
