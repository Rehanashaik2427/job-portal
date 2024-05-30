import { faSearch, faSignOutAlt, faUser ,faHouse,faBriefcase,faAddressCard,faUsers,faHome,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './HrDashboard.css';
import HrLeftSide from './HrLeftSide';
import Pagination from './Pagination';

const Applications = () => {
    const BASE_API_URL = "http://localhost:8082/api/jobbox";

   
    
    
const history=useHistory();

  

    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;

    const [showSettings, setShowSettings] = useState(false);


    
    const [jobs, setJobs] = useState([]);
   
    
    
    

    
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredApplications, setFilteredApplications] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const applicationsPerPage = 5;

    const indexOfLastApplication = currentPage * applicationsPerPage;
    const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
    const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
    const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchJobs = async (userEmail) => {
        try {
            const response = await axios.get(`${BASE_API_URL}/jobsPostedByHrEmail?userEmail=${userEmail}`);
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

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };




 
    const [search, setSearch] = useState('');


 // const history = useHistory();
  
    

  



    

    const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = applications.filter(application =>
        application.jobTitle.toLowerCase().includes(value)
    );
    setFilteredApplications(filtered);
    setCurrentPage(1); // Reset to the first page after search
};

  
    const user = {
        userName: userName,
        userEmail: userEmail,
    };

    return (
        <div className='hr-dashboard-container'>
            <div className='hr-leftside'>
                <HrLeftSide user={user} />
            </div>
            <div className='hr-rightside'>
                <div className="applications">
                    <div className="candidate-search">
                        <input
                            type='text'
                            placeholder='Search by job title'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button>
                            <FontAwesomeIcon icon={faSearch} className='button' style={{ color: 'skyblue' }} />
                        </button>
                        <div>
                            <FontAwesomeIcon icon={faUser} id="user" className='icon' style={{ color: 'black' }} onClick={toggleSettings} />
                        </div>
                    </div>

                    {showSettings && (
                        <div id="modal-container">
                            <div id="settings-modal">
                                <ul>
                                    <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sign out</Link></li>
                                    <li>Settings</li>
                                </ul>
                                <button onClick={toggleSettings}>Close</button>
                            </div>
                        </div>
                    )}

                    <div className='job-list'>
                        {jobs.length > 0 && (
                            <table id='jobTable1'>
                                <thead>
                                    <tr>
                                        <th>Job Title</th>
                                        <th>Application Deadline</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map(job => (
                                        job.jobId !== 0 && (
                                            <tr key={job.jobId}>
                                                <td>{job.jobTitle}</td>
                                                <td>{job.applicationDeadline}</td>
                                                <td>
                                                    <Link
                                                        to={{
                                                            pathname: '/viewApplications',
                                                            state: { userName: userName, userEmail: userEmail, jobId: job.jobId }
                                                        }}
                                                    >
                                                        <button>View Application</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {jobs.length === 0 && (
                            <section className='not-yet'>
                                <h2>You have not posted any jobs yet. Post Now</h2>
                            </section>
                        )}
                    </div>

                    
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    handlePageClick={handlePageClick}
                                />
                           
                     

                    </div>
                </div>
           
        </div>

    );
}

export default Applications;
