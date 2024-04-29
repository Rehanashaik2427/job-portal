import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import './CandidateDashboard.css';
import axios from 'axios';

const BASE_API_URL="http://localhost:8080/api/jobbox";
const CandidatesCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [jobRole, setJobRole] = useState('');

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

  return (
    <div className="candidate-dashboard-container">
      <div className='left-side'>
        <nav id='logo'>
          <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>
        <nav>
          <h2>Candidate Name</h2>
        </nav>
        <section id="dashboard">
          <FontAwesomeIcon icon={faHouse} /> <Link to="/candiadte-dashboard"> Dashboard</Link>
        </section>
        <section id="jobs">
          <FontAwesomeIcon icon={faLayerGroup} /> <Link to="/candiadte-jobs">Jobs</Link>
        </section>
        <section id="companies">
          <FontAwesomeIcon icon={faBuilding} /> <Link to="/candidate-companies"> Companies</Link>
        </section>
        <section id="my-application">
          <FontAwesomeIcon icon={faFileLines} /> <Link to="/my-application">My Application</Link>
        </section>
        <section id="my-resume">
          <FontAwesomeIcon icon={faFile} /> <Link to="/resume"> My Resume</Link>
        </section>
        <section id="my-profile">
          <FontAwesomeIcon icon={faUser} /> <Link to="/profile"> My Profile</Link>
        </section>
        <section id="payment">
          <FontAwesomeIcon icon={faMoneyCheckDollar} /> <Link to="/payment"> Payments/Credits</Link>
        </section>
        <section id="Home">
          <FontAwesomeIcon icon={faHome} /> <Link to="/"> Home</Link>
        </section>
        <h3>Help</h3>
        <h3><Link to="../Jobbox_FrontPage/others.html">Contact us</Link></h3>
      </div>

      <div className='rightside'>
        <div className="search">
          <form onSubmit={searchJob}>
            <input type='text' id='jobRole' name='jobRole' value={jobRole} onChange={handleChange} />
            <input type='submit' value="Search" />
          </form>
        </div>

        <div className="companyJob">
          <h1>Job offers by Companies</h1>
          <div className="cards">
            {companies.length > 0 ? (
              companies.map((company) => (
                <div className="company-card-job" key={company.companyId}>
                  <p className="company-name">Company Name: <b>{company.companyName}</b></p>
                  <p>Company Email <b>{company.companyEmail}</b></p>
                  <p>Industry : <b>{company.industry}</b></p>
                  
                  {/* <p><b>Number of Positions: </b>{company.numberOfPosition}</p> */}
                  <Link to="/applied-success-msg"><button><h3>Apply</h3></button></Link>
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
