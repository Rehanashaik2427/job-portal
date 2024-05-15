import { faSearch, faSignOutAlt, faUser ,faHouse,faBriefcase,faAddressCard,faUsers,faHome,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './HrDashboard.css';



// import ViewApplications from './ViewApplications';

import HrLeftSide from './HrLeftSide';


const Applications = () => {
    const BASE_API_URL = "http://localhost:8081/api/jobbox";
   
    
    
const history=useHistory();
    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;

    const [showSettings, setShowSettings] = useState(false);

    
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

 // const history = useHistory();
  
    const [applications, setApplications] = useState([]);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const fetchApplications = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/getApplicationsByHR?userEmail=${userEmail}`);
            console.log(response.data);
            setApplications(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [])


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

  

    const viewApplications = async (jobId) => {
        history.push('/viewApplications', { jobId })

    }


  
    const user = {
      userName: userName,
      
       userEmail: userEmail,
     };
   
   
     return (
       <div className='candidate-dashboard-container'>
            <div className='hr-leftside'>
           <HrLeftSide user={user} />
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
                                      <div className='job-list'>
                                        {jobs.length > 0 && (
                                                            <table id='jobTable1'>
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
                   
            

                <div>
                  
             </div>
         </div> 
         </div>   
         
           </div> 




     
    );
}

export default Applications;
