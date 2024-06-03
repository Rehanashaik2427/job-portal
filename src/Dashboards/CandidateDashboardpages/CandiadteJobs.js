import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './CandidateDashboard.css';
import CandidateLeftSide from './CandidateLeftSide';
import ResumeSelectionPopup from './ResumeSelectionPopup';

const BASE_API_URL = "http://localhost:8082/api/jobbox";
const CandiadteJobs = () => {



  const location = useLocation();
  const userName = location.state?.userName;
  const userId = location.state?.userId;
  console.log(userId);

  const [jobs, setJobs] = useState([]);
  const [applyjobs, setApplyJobs] = useState([]);
  const [showResumePopup, setShowResumePopup] = useState(false);



  const fetchJobs = async () => {
    try {
      const response = await axios.get(BASE_API_URL + "/displayJobs"); // Assuming backend is running on the same host
      setJobs(response.data);

    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  ////////////////////
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleApplyButtonClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowResumePopup(true);
  };

  const handleResumeSelect = async (resumeId) => {
    if (selectedJobId && resumeId) {
      await applyJob(selectedJobId, resumeId);
      setSelectedJobId(null); // Reset selected job id
      setShowResumePopup(false); // Close the resume selection popup
    }
  };
  ///////////////////////////
  const applyJob = async (jobId, resumeId) => {
    console.log(jobId);
    console.log(userId);


    const appliedOn = new Date().toLocaleDateString();


    try {
      const response = await axios.put(`${BASE_API_URL}/applyJob?jobId=${jobId}&userId=${userId}&appliedOn=${appliedOn}&resumeId=${resumeId}`);

      setApplyJobs(response.data);
      console.log(response.data);
      // setApplyJobs([...applyjobs, jobId]);

      if (response.data) {
        alert("You have successfully applied for this job");

      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    // fetchJobs();
  };

  const [resumes, setResumes] = useState([]);
  useEffect(() => {
    // Fetch resumes data from the backend
    axios.get(`${BASE_API_URL}/getResume?userId=${userId}`)
      .then(response => {
        setResumes(response.data);
      })
      .catch(error => {
        console.error('Error fetching resumes:', error);
      });
  }, []);


  // Get current jobs
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const nPage = Math.ceil(jobs.length / jobsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);


  function changeCurrentPage(id) {
    setCurrentPage(id);
  }




  const [applications, setApplications] = useState([]);
  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/applications?userId=${userId}`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${BASE_API_URL}/searchJobs?search=${search}`);
      setJobs(response.data);

    } catch (error) {
      console.log("No data Found" + error);
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

    userId: userId,
  };

  return (
    <div className='candidate-dashboard-container'>
      <div className='left-side'>
        <CandidateLeftSide user={user} />
      </div>

      <div className='rightside'>
        {showResumePopup && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowResumePopup(false)}>&times;</span>
              <ResumeSelectionPopup
                resumes={resumes}
                onSelectResume={handleResumeSelect}
                onClose={() => setShowResumePopup(false)}
              />
            </div>
          </div>
        )}
        <div className="page">
          <div className="top-right-content">
            <div className="candidate-search">
              <form className="candidate-search1"onSubmit={handleSubmit} >
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
          {jobs.length > 0 && (
            <div>
              <div>
                {/* <h1 style={{ textAlign: 'center' }}>JOBS</h1> */}
                <table className='jobs-table'>
                  <tr>
                    <th>Job Profile</th>
                    <th>Company Name</th>
                    <th>Application Deadline</th>
                    <th>Skills</th>
                    <th>Job summary</th>
                    <th>Actions</th>
                  </tr>
                  {currentJobs.map(job => (
                    <tr key={job.id} id='job-table-list'>
                      <td>{job.jobTitle}</td>
                      <td>{job.companyName}</td>
                      <td>{job.applicationDeadline}</td>
                      <td>{job.skills}</td>
                      <td><button onClick={() => handleViewSummary(job.jobsummary)}>View Summary</button></td>
                      <td>
                        {applications.some(application => application.jobId === job.jobId) || (applyjobs && applyjobs.jobId === job.jobId) ? (
                          <h4>Applied</h4>
                        ) : (
                          <button onClick={() => handleApplyButtonClick(job.jobId)}>
                            <h4>Apply</h4>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </table>
                {selectedJobSummary && (
                  <div className="modal-summary">
                    <div className="modal-content-summary">
                      <div style={{ width: '100%' }}>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Job Summary</h2>
                        <pre>{selectedJobSummary}</pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <nav>
                <ul className='pagination'>
                  {
                    numbers.map((n, i) => (
                      <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                        <Link to={{
                          pathname: '/candidate-jobs',
                          state: { userName: userName, userId: userId }
                        }} className='page-link' onClick={() => changeCurrentPage(n)}>{n}</Link>
                      </li>
                    ))
                  }
                </ul>
              </nav>
            </div>
          )}
          {jobs.length === 0 && <h1>No jobs found.</h1>}
          <div className="dream">
            <p>Can't find your dream company. Don't worry, you can still apply to them.</p>
            <p>Just add the name of your dream company and apply to them directly.</p>
            <Link to={{pathname: '/dream-company',state: { userName: userName, userId: userId }}} className="app">
              <nav className="apply" style={{ textAlign: 'center' }}><b>Apply to your dream company</b></nav>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CandiadteJobs;
