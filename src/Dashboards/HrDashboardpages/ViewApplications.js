import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './HrDashboard.css';
import HrLeftSide from "./HrLeftSide";

const ViewApplications = () => {
  const BASE_API_URL = "http://localhost:8081/api/jobbox";
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const jobId = location.state?.jobId;
  console.log(jobId);

  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getApplicationsByJobId?jobId=${jobId}`);
      console.log(response.data);
      setApplications(response.data);
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

  const handleDownload = async (resumeUrl, candidateId) => {
    try {
      const res = await axios.get(`${BASE_API_URL}/getUserName`, {
        params: {
          userId: candidateId
        }
      });
      const response = await axios.get(`${BASE_API_URL}/getApplicantResume?resumeUrl=${resumeUrl}&candidateId=${candidateId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(response.data);
      const fileName =(res.data.userName)+ candidateId+"resume.pdf";
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); 
      document.body.appendChild(link);
      link.click();
     
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  const user = { userEmail };

  return (
    <div className='candidate-dashboard-container'>
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
              <option value="Under Review">Under Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          {applications.length > 0 && (
            <table id='application'>
              <thead>
                <tr style={{textAlign:'center'}}>
                  <th>Job Title</th>
                  <th>Company Name</th>
                  <th>Resume ID</th>
                  <th>Date/Time</th>
                  <th>Application Status</th>
                  <th>View Details</th>
                  <th>Application Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(application => (
                  <tr key={application.id}>
                    <td>{application.jobRole}</td>
                    <td>{application.companyName}</td>
                    <td><button className='download' onClick={() => handleDownload(application.resumeUrl, application.candidateId)}>Resume</button></td>
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
