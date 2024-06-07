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
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };


  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    if(search)
      {
        fetchJobBysearch();
      }
else
    fetchData();
  }, [page, pageSize,search]);

  async function fetchData() {
    try {
      const response = await axios.get(`${BASE_API_URL}/paginationJobs?page=${page}&size=${pageSize}`);
      setJobs(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };


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

  const hasUserApplied = async (jobId, userId) => {
    try {
      // Make an API call to check if the user has applied for the job
      const response =await axios.get(`${BASE_API_URL}/applicationApplied?jobId=${jobId}&userId=${userId}`)
  
      // Return true if the user has applied for the job, false otherwise
      return response.data.hasApplied; // Assuming the API returns a JSON object with a field indicating if the user has applied
    } catch (error) {
      console.error('Error checking application:', error);
      // Handle errors here
      return false; // Return false in case of error
    }
  };


  

 const fetchJobBysearch= async()=>{
    try {
      const response = await axios.get(`${BASE_API_URL}/searchJobs`, {
        params: { search,page,pageSize }
      });      
     
      setJobs(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("No data Found" + error);
    }
    console.log("Search submitted:", search);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchJobBysearch();
  
  }
   

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
              <h2>Jobs For {userName}</h2>
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
                  {jobs.map(job => (
                    <tr key={job.id} id='job-table-list'>
                      <td>{job.jobTitle}</td>
                      <td>{job.companyName}</td>
                      <td>{job.applicationDeadline}</td>
                      <td>{job.skills}</td>
                      <td><button onClick={() => handleViewSummary(job.jobsummary)}>View Summary</button></td>

                      <td>   {hasUserApplied(job.jobId, userId) || (applyjobs && applyjobs.jobId === job.jobId) ? (
                          <h4>Applied</h4>
                        ) : (
                          <button onClick={() => handleApplyButtonClick(job.jobId,job.jobStatus)}>
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
          <li>
            <button className='page-button'  onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
          </li>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <li key={pageNumber} className={pageNumber === page ? 'active' : ''}>
              <button className='page-link'  onClick={() => handlePageChange(pageNumber)}>{pageNumber + 1}</button>
            </li>
          ))}
          <li>
            <button className='page-button'  onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
          </li>
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
