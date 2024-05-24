import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import HrLeftSide from "./HrLeftSide";
import axios from "axios";
import { useEffect, useState } from "react";

const DreamApplication =()=>{
    const BASE_API_URL = "http://localhost:8082/api/jobbox";
    const location = useLocation();
    const userEmail = location.state?.userEmail;
    const userName=location.state?.userName;
    const [applications, setApplications] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
  
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
  
    const handleSelect= async(filterStatus)=>{
      try {
        const jobId=0;
        const response = await axios.get(`${BASE_API_URL}/getFilterDreamApplicationsByCompany?jobId=${jobId}&filterStatus=${filterStatus}&userEmail=${userEmail}`);
        console.log(response.data);
        setApplications(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/getDreamApplicationsByCompany?userEmail=${userEmail}`);
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
    const [candidateName,setCandidateName]=useState();
    const [candidateEmail,setCandidateEmail]=useState();
   
  
    const handleDownload = async (resumeId, candidateId) => {
      try {
        const res = await axios.get(`${BASE_API_URL}/getUserName`, {
          params: {
            userId: candidateId
          }
        });
        setCandidateName(res.data.userName);
        setCandidateEmail(res.data.userEmail);
      
          const response = await axios.get(`http://localhost:8082/api/jobbox/downloadResume?resumeId=${resumeId}`, {
            responseType: 'blob'
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const fileName =(res.data.userName)+ candidateId+"resume.pdf";
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error('Error downloading resume:', error);
        }
    };
  
   
  
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
            {applications.length > 0 && (
              <div>
                  <div>
              <table id='application'>
                <thead>
                  <tr style={{textAlign:'center'}}>

                    <th>Resume ID</th>
                    <th>Date/Time</th>
                    <th>Application Status</th>
                    <th>Application Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentApplications.map(application => (
                    <tr key={application.id}>
                      <td><button className='download' onClick={() => handleDownload(application.resumeId, application.candidateId)}>Resume</button></td>
                      <td>{application.appliedOn}</td>
                      <td>{application.applicationStatus}</td>
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
          pathname: '/dreamApplication', 
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
export default DreamApplication;