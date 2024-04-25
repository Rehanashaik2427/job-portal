import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Array to store company data

const BASE_API_URL="http://localhost:8080/api/jobbox";
const CandidatesCompanies = () => {
  const [companies, setCompanies] = useState([]); 
  const [jobRole, setJobRole] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setJobRole({ ...jobRole, [e.target.name]: value });
  };
 
  const searchJob= async ()=>{
   
    try {
      const response = await axios.get(`${BASE_API_URL}/search/${jobRole}`);
      const data = response.data; // Access the data directly
      setCompanies(data);
    } catch (error) {
      //console.error('Error fetching companies:', error);
      // Handle errors appropriately
    }
  };

  // useEffect(() => {
    
  // }, []); //

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_API_URL+"/displayJobs");
      const data = response.data; // Access the data directly
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      // Handle errors appropriately
    }
  };
  
  useEffect(() => {
    fetchData();
    searchJob();
  }, []); // Empty dependency array ensures fetching data only once on mount
  
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
          <input type='text' id='jobRole' name='jobRole' value={jobRole} onChange={handleChange}/> 
          <input type='submit' value="Search"   />
            {/* <button><FontAwesomeIcon icon={faSearch} />search</button> */}
            </form>
         </div>

        <div className="candidate-search">
            <button><FontAwesomeIcon icon={faSearch} /></button> 
            <FontAwesomeIcon icon={faUser} id="user" className='icon'/>

        </div>
        <div className="companyJob">
            <h1>Job offers by Companies</h1>
            {/* return ( */}
                <div className="cards">
                    {companies.length > 0 ? ( // Check if companies data is available
                     companies.map((company) => ( // Loop through companies array
                       <div className="company-card-job" key={company.jobId}>   
                               <p className="company-name">Company Name: <b>{company.companyName}</b></p>
                               <p>Job Role  <b>{company.jobTitle}</b></p>
                               
                               <p>Requirements :</p>
                               <b>{company.requirements}</b>
                               <p><b>Number of Positions: </b>{company.numberOfPosition}</p>
                               {/* Optionally display description: <p className="company-description">{company.description}</p> */}
                               <Link to="/applied-success-msg"><button><h3>Apply</h3></button></Link>
                        </div>
                             ))
                          ) : (
                         <p>Loading companies...</p> // Display a loading message while fetching data
                           )}
                 </div>
          {/* ); */}
        </div>
    </div>
  </div>
  
  )
}

export default CandidatesCompanies
