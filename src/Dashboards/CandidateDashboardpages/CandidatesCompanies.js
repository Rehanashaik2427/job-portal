import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const BASE_API_URL="http://localhost:8080/api/jobbox";
const CandidatesCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [jobRole, setJobRole] = useState('');
  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobRole(value);
  };

  const [jobs, setJobs] = useState([]);
  
  // Function to fetch jobs from the database
  const fetchCompany = async () => {
    try {
      const response = await axios.get(BASE_API_URL+"/displayCompanies"); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      setCompanies(response.data); // Set the fetched jobs to state
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // useEffect hook to fetch jobs when the component mounts
  useEffect(() => {
    fetchCompany();
  }, []);



  const searchJob = (e) => {
    e.preventDefault();
    // Perform search operation
    console.log("Searching for job with role:", jobRole);
  };

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="candidate-dashboard-container">
      <div className='left-side'>
        <nav id='logo'>
          <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav> <nav>
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
            <li>Setting 2</li>
            {/* Add more settings as needed */}
          </ul>
        </div>
      )}


        <div className="companyJob">
          <h1> Companies that we have</h1>
          <div className="cards">
            {companies.length > 0 ? (
              companies.map((company) => (
                <div className="company-card-job" key={company.companyId}>
                  <p className="company-name">Company Name: <b>{company.companyName}</b></p>
                  <p>Company Email <b>{company.companyEmail}</b></p>
                  <p>Industry : <b>{company.industry}</b></p>
                  
                  
                  <Link to="/applied-success-msg"><button className='com'><h3>View</h3></button></Link>
                </div>
              ))
            ) : (
              <p>Loading companies...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesCompanies;
