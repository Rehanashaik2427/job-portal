import { faSignOutAlt, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import HrLeftSide from './HrLeftSide';
import Pagination from './Pagination';
import './HrDashboard.css';

const Jobs = () => {
  const BASE_API_URL = "http://localhost:8082/api/jobbox";
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const userName = location.state?.userName;
  const [jobs, setJobs] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [selectedJobSummary, setSelectedJobSummary] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Start at page 1
  const jobsPerPage = 3;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobCount / jobsPerPage);
  const [search, setSearch] = useState('');
  const [numbers, setNumbers] = useState([]);
  const history = useHistory();
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    if (userEmail) {
      fetchJobs(userEmail);
    }
  }, [userEmail, currentPage]); // Include currentPage in the dependency array

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    setNumbers(pageNumbers);
  }, [totalPages]);

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
      fetchJobs(userEmail);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${BASE_API_URL}/searchJobsByHR?search=${search}&userEmail=${userEmail}`);
      setJobs(response.data);
      
    } catch (error) {
      console.log("No data Found" + error);
    }
    console.log("Search submitted:", search);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        {/* <div className='job-list'>
          {currentJobs.length > 0 && (
            <table id='jobTable1'>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Job Type</th>
                  <th>Posting Date</th>
                  <th>Skills</th>
                  <th>No of Position</th>
                  <th>Application Deadline</th>
                  <th>Job Summary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.map(job => (
                  job.jobId !== 0 && (
                    <tr key={job.jobId}>
                      <td>{job.jobTitle}</td>
                      <td>{job.jobType}</td>
                      <td>{job.postingDate}</td>
                      <td>{job.skills}</td>
                      <td>{job.numberOfPosition}</td>
                      <td>{job.applicationDeadline}</td>
                      <td>
                        <div className='job-description-container'>
                          {/* Job description *
                        </div>
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
          {currentJobs.length === 0 && (
            <section className='not-yet'>
              <h2>You have not posted any jobs yet. Post Now</h2>
            </section>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageClick={handlePageClick}
          />
          <button className='add-job-button'>
            <Link to={{ pathname: '/addJob', state: { userName: userName, userEmail: userEmail } }}>Add Job</Link>
          </button>
        </div>
      </div> */}
      {showJobDescription && (
        <div className="job-description-modal">
          <div className="job-description-content">
            <span className="close" onClick={closeJobDescription}>&times;</span>
            <h2>Job Description</h2>
            <pre>{selectedJobSummary}</pre>
          </div>
        </div>
      )}
      <h2>Job posted by {userName}</h2>
      <div className='job-list'>
        {jobs.length > 0 && (
          <table id='jobTable1'>
            <thead>
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
            </thead>
            <tbody>
              {currentJobs.map(job => (
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
                      <button className='delete' onClick={() => handleDelete(job.jobId)}>Delete</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
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
      {jobs.length === 0 && (
        <section className='not-yet'>
          <h2>You have not posted any jobs yet. Post Now</h2>
        </section>
      )}
      <button className='add-job-button'>
        <Link to={{ pathname: '/addJob', state: { userName: userName, userEmail: userEmail } }}>Add Job</Link>
      </button>
    </div>

</div>
  );
};

export default Jobs;
