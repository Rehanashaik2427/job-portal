import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const BASE_API_URL="http://localhost:8080/api/jobbox";
const CandiadteJobs = () => {

  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;

  const [jobs, setJobs] = useState([]);
  const [applyjobs, setApplyJobs] = useState([]);

 
    const fetchJobs = async () => {
      try {
        const response = await axios.get(BASE_API_URL+"/displayJobs"); // Assuming backend is running on the same host
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
  
  const applyJob= async(jobId)=>{
    console.log(jobId);
    console.log(userEmail);

    const appliedOn = new Date().toLocaleString();

    try {
      const response = await axios.put(`${BASE_API_URL}/applyJob?jobId=${jobId}&userEmail=${userEmail}&appliedOn=${appliedOn}`);
 
     // setApplyJobs(response.data);
      console.log(response.data);
      setApplyJobs([...applyjobs, jobId]);
  
      if(response.data)
        {
          alert("You have successfully apply this job");
        
        }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    // fetchJobs();
  };

  useEffect(() => {
    // Update localStorage whenever appliedJobs changes
    localStorage.setItem('appliedJobs', JSON.stringify(applyjobs));
}, [applyjobs]);

  

  return (
    <div className="candidate-dashboard-container">
      <div className='left-side'>
        <nav id='logo'>
          <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>
        <nav>
          <h2>Welcome {userName}</h2>
        </nav>
        <section id="dashboard">
          <FontAwesomeIcon icon={faHouse} /> <Link   to={{
          pathname: '/candidate-dashboard',
          state: { userName: userName, userEmail:userEmail }
        }}> Dashboard</Link>
        </section>
        <section id="jobs">
          <FontAwesomeIcon icon={faLayerGroup} /> <Link  to={{
          pathname: '/candidate-jobs',
          state: { userName: userName, userEmail:userEmail }
        }} >Jobs</Link>
        </section>
        <section id="companies">
          <FontAwesomeIcon icon={faBuilding} /> <Link  to={{
          pathname: '/candidate-companies',
          state: { userName: userName, userEmail:userEmail }
        }}> Companies</Link>
        </section>
        <section id="my-application">
          <FontAwesomeIcon icon={faFileLines} /> <Link to={{
          pathname: '/my-application',
          state: { userName: userName, userEmail:userEmail }
        }}>My Application</Link>
        </section>
        <section id="my-resume">
          <FontAwesomeIcon icon={faFile} /> <Link to={{
          pathname: '/resume',
          state: { userName: userName, userEmail:userEmail }
        }}> My Resume</Link>
        </section>
        <section id="my-profile">
          <FontAwesomeIcon icon={faUser} /> <Link to={{
          pathname: '/profile',
          state: { userName: userName, userEmail:userEmail }
        }}> My Profile</Link>
        </section>
        <section id="payment">
          <FontAwesomeIcon icon={faMoneyCheckDollar} /> <Link  to={{
          pathname: '/payment',
          state: { userName: userName, userEmail:userEmail }
        }}> Payments/Credits</Link>
        </section>
        {/* <section id="Home">
          <FontAwesomeIcon icon={faHome} /> <Link to="/"> Home</Link>
        </section>  */}
        <h3>Help</h3>
        <h3><Link to="/contact">Contact us</Link></h3>
      </div>

      <div className='rightside'>
        <div className="page">
        <div className="top-right-content">
          <div className="candidate-search">
            <input type='text' placeholder='serach'></input>
            <button>
              <FontAwesomeIcon icon={faSearch} className='button' style={{color:'skyblue'}}/>
            </button>
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon'  style={{color:'black'}} onClick={toggleSettings}/></div>
          
          </div>
         
    
        </div>
        {showSettings && (
        <div id="settings-container">
          {/* Your settings options here */}
          <ul>
            <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
            <li>Setting </li>
            {/* Add more settings as needed */}
          </ul>
        </div>
      )}

          
            <h1 style={{textAlign:'center'}}>JOBS</h1>
            <table className='jobs-table'>

            
                <tr>
                  <th>Job Profile</th>
                  <th>Company Name</th>
                  <th>Application DeadLine</th>
                  <th>Experience</th>
                  <th>Eligibility</th>
                  <th>Requirements</th>
                  <th>Status & Actions</th>
                </tr>
                </table>
            <div className='jobs-table-div'>
            <table className='jobs-table'>

            
                {/* <tr>
                  <th>Job Profile</th>
                  <th>Company Name</th>
                  <th>Application DeadLine</th>
                  <th>Experience</th>
                  <th>Eligibility</th>
                  <th>Requirements</th>
                  <th>Status & Actions</th>
                </tr>
               */}
                {jobs.map(job => (
                  <tr key={job.id} id='job-table-list'>
                    <td>{job.jobTitle}</td>
                    <td>{job.companyName}</td>
                    <td>{job.applicationDeadline}</td>
                    <td>{job.experience}</td>
                    <td>{job.eligibility}</td>
                    <td>{job.requirements}</td>
                    <td> {applyjobs.includes(job.jobId) ? (
                               <h4>Applied</h4>
                                    ) : (
                      <button onClick={() => applyJob(job.jobId)}><h4>Apply</h4></button>
                      )}
                     </td>
                  </tr>
                ))}
             

               


            </table>
            </div>
            
            

          <div className="dream">
            <p>Can't find your dream company. Don't worry, you can still apply to them.</p>
            <p>Just add the name of your dream company and apply to them directly.</p>
            
              <Link  to={{
          pathname: '/dream-company',
          state: { userName: userName, userEmail:userEmail }
        }} className="app">
                  <nav className="apply" style={{ textAlign: 'center' }}><b>Apply to your dream company</b></nav>
              </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandiadteJobs;
