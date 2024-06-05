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
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);
  const nPage = Math.ceil(applications.length / applicationsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getApplicationsByJobId?jobId=${jobId}`);
      setApplications(response.data);
    } catch (error) {
      console.log("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (applicationId, newStatus) => {
    try {
      await axios.put(`${BASE_API_URL}/updateApplicationStatus?applicationId=${applicationId}&newStatus=${newStatus}`);
      fetchApplications();
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    fetchFilteredApplications(e.target.value);
  };

  const fetchFilteredApplications = async (filterStatus) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getFilterApplicationsByJobId?jobId=${jobId}&filterStatus=${filterStatus}`);
      setApplications(response.data);
    } catch (error) {
      console.log("Error fetching filtered applications:", error);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  return (
    <div className='hr-dashboard-container'>
      <div className='hr-leftside'>
        <HrLeftSide user={{ userEmail }} />
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
          {applications.length > 0 && (
            <div>
              <table id='jobTable1' style={{ marginTop: '12px' }}>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Candidate Name</th>
                    <th>Candidate Email</th>
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
                      <td>{application.candidateName}</td>
                      <td>{application.candidateEmail}</td>
                      <td>{application.appliedOn}</td>
                      <td>{application.applicationStatus}</td>
                      <td>
                        <Link
                          to={{
                            pathname: '/applicationDetails',
                            state: { userEmail, applicationId: application.applicationId }
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
              <nav>
                <ul className='pagination'>
                  {numbers.map((n, i) => (
                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                      <button className='page-link' onClick={() => changeCurrentPage(n)}>{n}</button>
                    </li>
                  ))}
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
