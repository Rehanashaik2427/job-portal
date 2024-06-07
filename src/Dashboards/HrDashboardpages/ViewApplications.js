import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './HrDashboard.css';
import HrLeftSide from "./HrLeftSide";

const ViewApplications = () => {
  const BASE_API_URL = "http://localhost:8082/api/jobbox";
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const userName = location.state?.userName;
  const jobId = location.state?.jobId;
  console.log(jobId);
  const [applications, setApplications] = useState([]);
  const [resumeTypes, setResumeTypes] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const [fileNames, setfileNames] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;
  const indexOfLastApplication= currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);
  const nPage=Math.ceil(applications.length/applicationsPerPage);
  const numbers=[...Array(nPage+1).keys()].slice(1);

  function changeCurrentPage(id)
  {
  setCurrentPage(id);
  }



  const handleFilterChange = async(e) => {
    setFilterStatus(e.target.value);
    handleSelect(e.target.value);

  };

  const handleSelect = async (filterStatus) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getFilterApplicationsByJobId?jobId=${jobId}&filterStatus=${filterStatus}`);
      console.log(response.data);
      setApplications(response.data.content);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getApplicationsByJobId?jobId=${jobId}`);
      console.log(response.data);
      setApplications(response.data);
      fetchResumeTypes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (applicationId, newStatus) => {
    console.log(applicationId);
    console.log(newStatus);
    try {
      const response = await axios.put(`${BASE_API_URL}/updateApplicationStatus?applicationId=${applicationId}&newStatus=${newStatus}`);
      console.log(response.data);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch resume types for each application
  const fetchResumeTypes = async (applications) => {
    const types = {};
    const fileNames = {};
    for (const application of applications) {
      try {
        const response = await axios.get(`${BASE_API_URL}/getResumeByApplicationId?resumeId=${application.resumeId}`);
        types[application.resumeId] = response.data.fileType;
        fileNames[application.resumeId] = response.data.fileName;
      } catch (error) {
        console.error('Error fetching resume type:', error);
      }
    }
    setResumeTypes(types);
    setfileNames(fileNames);
  };

  const renderResumeComponent = (resumeId) => {
    const fileType = resumeTypes[resumeId];
    const fileName = fileNames[resumeId];
    if (fileType === 'file') {
      return (
        <button onClick={() => handleDownload(resumeId, fileName)}>Download</button>
      );
    } else if (fileType === 'link') {
      return (
        <a href={fileName} target="_blank" rel="noopener noreferrer">Click here</a>
      );
    } else if (fileType === 'brief') {
      return (
        <button onClick={() => openPopup(fileName)}>Open Brief</button>
      );
    } else {
      return null; // Handle other file types as needed
    }
  };
  const [showMessage, setShowMessage] = useState(false);
  const [showBriefSettings, setShowBriefSettings] = useState(false);
  const openPopup = (fileName) => {
    setShowMessage(fileName);
    setShowBriefSettings(!showBriefSettings)
  };

  const handleDownload = async (resumeId, fileName) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/jobbox/downloadResume?resumeId=${resumeId}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // const fileName =response.data.fileName;
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  const [candidateName, setCandidateName] = useState();
  const [candidateEmail, setCandidateEmail] = useState();

  const fetchCandidateDetails = async () => {
    const candidateNames = {};
    const candidateEmails = {};
    for (const application of applications) {
      const res = await axios.get(`${BASE_API_URL}/getUserName`, {
        params: {
          userId: application.candidateId
        }

      });
      candidateNames[application.candidateId] = res.data.userName;
      candidateEmails[application.candidateId] = res.data.userEmail;

    }
    setCandidateName(candidateNames);
    setCandidateEmail(candidateEmails);
  }
  // const fetchCandidateDetails = async () => {
  //   if (applications && applications.length > 0) {
  //     const candidateNames = {};
  //     const candidateEmails = {};
  //     for (const application of applications) {
  //       const res = await axios.get(`${BASE_API_URL}/getUserName`, {
  //         params: {
  //           userId: application.candidateId
  //         }
  //       });
  //       candidateNames[application.candidateId] = res.data.userName;
  //       candidateEmails[application.candidateId] = res.data.userEmail;
  //     }
  //     setCandidateName(candidateNames);
  //     setCandidateEmail(candidateEmails);
  //   }
  // };

  useEffect(() => {
    fetchCandidateDetails();
  }, [applications]);


  const user = { userEmail };

  return (
    <div className='hr-dashboard-container'>
      <div className='hr-leftside'>
        <HrLeftSide user={user} />
      </div>
      <div className='hr-rightside'>
        <div className="application-div">
          <div className="filter">
            <label htmlFor="status">Filter by Status:</label>
            <select id="status" onChange={handleFilterChange} value={filterStatus}>
              <option value="all">All</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Under Preview">Under Preview</option>
              <option value="Not Shortlisted">Rejected</option>
            </select>
          </div>
          {showBriefSettings && (
            <div className="modal-summary">
              <div className="modal-content-summary">
                <span className="close" onClick={() => setShowBriefSettings(false)}>&times;</span>
                {showMessage}
              </div>
            </div>
          )}
          {applications.length > 0 && (
            <div>
                <div>
            <table id='jobTable1' style={{marginTop:'12px'}}>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Candidate Name</th>
                  <th>Candidate Email</th>
                  <th>Resume ID</th>
                  <th>Date</th>
                  <th>Application Status</th>
                  <th>View Details</th>
                  <th>Application Action</th>
                </tr>
              </thead>
              <tbody>
                {currentApplications.map(application => (
                  <tr key={application.id}>
                    <td>{application.jobRole}</td>
                    <td>{candidateName[application.candidateId]}</td>
                    <td>{candidateEmail[application.candidateId]}</td>
                    <td>{renderResumeComponent(application.resumeId)}</td>
                    {/* <td><button className='download' onClick={() => handleDownload(application.resumeId, application.candidateId)}>Resume</button></td> */}
                    <td>{application.appliedOn}</td>
                    <td>{application.applicationStatus}</td>
                    <td>
                      <Link
                        to={{
                          pathname: '/applicationDetails',
                          state: { userEmail: userEmail, applicationId: application.applicationId }
                        }}
                      >
                        <button>View</button>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => updateStatus(application.applicationId, 'Shortlisted')} className="select">Select</button>
                      <button onClick={() => updateStatus(application.applicationId, 'Not Shortlisted')} className="reject">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <nav>
  <ul className='pagination'>
   
    {
      numbers.map((n,i)=>(
          <li className={`page-item ${currentPage ===n ? 'active' : ''}`} key={i}>
            
            <Link to={{
        pathname: '/viewApplications', 
        state: { userName: userName,userEmail:userEmail } 
      }} className='page-link' onClick={()=>changeCurrentPage(n)}>{n}</Link>
          </li>
      ))
    }



  </ul>
</nav>
            </div>
          )}
          {applications.length === 0 && (
            <section class='not-yet'>
              <h2>Sorry, you haven't received any applications yet.</h2>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewApplications;