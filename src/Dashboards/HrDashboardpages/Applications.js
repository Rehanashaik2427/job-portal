import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers ,faSearch,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './HrDashboard.css';
import axios from 'axios';
import ViewApplications from './ViewApplications';

const Applications = () => {
    const BASE_API_URL = "http://localhost:8080/api/jobbox";
   
    
    
const history=useHistory();
    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail=location.state?.userEmail;

    const [showSettings, setShowSettings] = useState(false);
    const toggleSettings = () => {
        setShowSettings(!showSettings);
      };
   
    const [jobs, setJobs] = useState([]);
   
    
    const fetchJobs = async (userEmail) => {
      try {
        const response = await axios.get(`${BASE_API_URL}/jobsPostedByHrEmail?userEmail=${userEmail}`);
        console.log(response.data);
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

  
  const viewApplications = (jobId) => {
    // Navigate to the update page with the job ID
    history.push("/viewApplications", {jobId});

  };
    return (
        <div className='candidate-dashboard-container'>
            <div className='hr-leftside'>
                <nav id='logo'>
                    <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
                </nav>
                <nav>
                    <h2>Welcome {userName}</h2>
                </nav>
                
                <section id="hr-dashboard">
                        <FontAwesomeIcon icon={faHouse} /> <Link to={{ pathname: '/hr-dashboard', state: { userName: userName, userEmail:userEmail } }}>Dashboard</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/post-jobs', state: { userName: userName, userEmail:userEmail }}}>Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faAddressCard} /> <Link to={{ pathname: '/hr-applications', state: { userName: userName, userEmail:userEmail } }}>Applications</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/posted-jobs',state: { userName: userName, userEmail:userEmail } }}>Posted Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUsers} /> <Link to={{ pathname: '/people', state: { userName: userName, userEmail:userEmail }}}>People</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUser} /> <Link to={{ pathname: '/hr-profile', state: { userName: userName, userEmail:userEmail } }}>Profile</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faHome} /> <Link to={{ pathname: '/', state: { userName: userName, userEmail:userEmail } }}>Home</Link>
                    </section>

                    <h3>Help</h3>
                     <h3><Link to="../Jobbox_FrontPage/others.html">Contact us</Link></h3>
                
            </div>
            <div className='hr-rightside'>
                <div className="applications">
                    
                    <div className="candidate-search">
            <input type='text' placeholder='serach'></input>
            <button>
              <FontAwesomeIcon icon={faSearch} className='button' style={{color:'skyblue'}}/>
            </button>
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon'  style={{color:'black'}} onClick={toggleSettings}/></div>
          
          </div>
         
    
        {showSettings && (
        <div id="settings-container">
          {/* Your settings options here */}
          <ul>
            <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
            <li>Setting 2</li>
            {/* Add more settings as needed */}
          </ul>
        </div>
      )}
             {jobs.length > 0 && (
                                <table id='jobTable'>
                                  <tr>
                                    <th>Job Title</th>
                                  
                                    <th>Application DeadLine</th>
                                    <th>Action</th>
                                  </tr>
                                  {jobs.map(job => (
                                    job.jobId !== 0 && (
                                      <tr key={job.id}>
                                        <td>{job.jobTitle}</td>
                                     
                                        <td>{job.applicationDeadline}</td>
                                        <td>
                                          <button onClick={() => viewApplications(job.jobId)}>ViewApplications</button>

                                        </td>
                                      </tr>
                                    )
                                  ))}
                                </table>
)}
                          {jobs.length === 0 && (
                            <section className='not-yet'>
                              <h2 >You have not posted any jobs yet. Post Now</h2>
                            </section>
                          )}


                   
                  
                </div>
            </div>
        </div>
    );
}

export default Applications;
