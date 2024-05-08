import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers ,faSearch,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './HrDashboard.css';
import axios from 'axios';

const Applications = () => {
    const BASE_API_URL = "http://localhost:8080/api/jobbox";
    const [filterStatus, setFilterStatus] = useState('all');

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail=location.state?.userEmail;

    const [showSettings, setShowSettings] = useState(false);
    const [applications,setApplications]=useState([]);

    const toggleSettings = () => {
      setShowSettings(!showSettings);
    };

    const fetchApplications=async()=>
        {
            try{
                const response= await axios.get(`${BASE_API_URL}/getApplicationsByHR?userEmail=${userEmail}`);
                console.log(response.data);
                setApplications(response.data);

            }catch(error)
            {
                console.log(error);
            }
        };

        useEffect(()=>{
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

        const history=useHistory();

        const viewDetails=async(applicationId)=>{
            history.push('/applicationDetails',{applicationId})

        }

  
  

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
            <main>
                <section className="applications">
                    
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

<div className="filter">
                        
                        <label htmlFor="status">Filter by Status:</label>
                        <select id="status" onChange={handleFilterChange} value={filterStatus}>
                            <option value="all">All</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <br />
                    <table id='application' >
                        
                            <tr style={{textAlign:'center'}}>
                                <th>Job Title</th>
                                <th>Company Name</th>
                                <th>Resume ID</th>
                                <th>Date/Time</th>
                                <th>Application Status</th>
                                <th>View Details</th>
                                <th>Application Action</th>
                               
                            </tr>
                        
                            {applications.map(application => (
            <tr key={application.id}>
              <td>{application.jobRole}</td>
              <td>{application.companyName}</td>
              <td>{application.resumeId}</td>
              <td>{application.appliedOn}</td>
              <td>{application.applicationStatus}</td>
            <td><button onClick={()=>viewDetails(application.applicationId)}>View</button></td>
              <td>
              <button onClick={() => updateStatus(application.applicationId, 'Shortlisted')}>Select</button>
             <button onClick={() => updateStatus(application.applicationId, 'Not Shortlisted')}>Reject</button>
                
              </td>
            </tr>
          ))}
                    </table>
                </section>
            </main>
        </div>
    );
}

export default Applications;
