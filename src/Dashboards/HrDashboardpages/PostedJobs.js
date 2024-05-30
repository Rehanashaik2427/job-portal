import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
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
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchJobs = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/jobsPostedByHrEmaileachCompany?userEmail=${userEmail}`);
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const [selectedJobSummary, setSelectedJobSummary] = useState(null);

  const handleViewSummary = (summary) => {
    setSelectedJobSummary(summary);
  };

  const handleCloseModal = () => {
    setSelectedJobSummary(null);
  };

  const jobsPerPage = 5;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const filteredJobs = jobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      job.userName.toLowerCase().includes(search.toLowerCase())
  );
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const nPage = Math.ceil(filteredJobs.length / jobsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  const user = {
    userName: userName,
    userEmail: userEmail,
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='hr-dashboard-container'>
      <div className='hr-leftside'>
        <HrLeftSide user={user} />
      </div>

      <div className='hr-rightside'>
        <div className="candidate-search">
          <input
            type='text'
            name='search'
            placeholder='Search'
            value={search}
            onChange={handleSearchChange}
          />
          {/* <button type="submit">
            <FontAwesomeIcon icon={faSearch} className='button' style={{ color: 'skyblue' }} />
          </button> */}
          <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{ color: 'black' }} onClick={toggleSettings} /></div>
        </div>
        {showSettings && (
          <div id="modal-container">
            <div id="settings-modal">
              <ul>
                <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sign out</Link></li>
                <li>Setting </li>
              </ul>
              <button onClick={toggleSettings}>Close</button>
            </div>
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
                  <th>Vacancy</th>
                  <th>Application Deadline</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.map(job => (
                  <tr key={job.id}>
                    <td>{job.hrName}</td>
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

          <nav>
            <ul className='pagination'>
              {numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                  <Link
                    to={{
                      pathname: '/posted-jobs',
                      state: { userName: userName, userEmail: userEmail }
                    }}
                    className='page-link'
                    onClick={() => changeCurrentPage(n)}
                  >
                    {n}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default PostedJobs;
