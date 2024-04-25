import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import React from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';

const CandidatesCompanies = () => {
  const [companies, setCompanies] = useState([]); 
  const [jobRole, setJobRole] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setJobRole({ ...jobRole, [e.target.name]: value });
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
          <form >
          <input type='text' id='jobRole' name='jobRole' value={jobRole} onChange={handleChange}/> 
          <input type='submit' value="Search"   />
            {/* <button><FontAwesomeIcon icon={faSearch} />search</button> */}
            </form>

=======
        <div className="candidate-search">
            <button><FontAwesomeIcon icon={faSearch} />search</button>

            <FontAwesomeIcon icon={faUser} id="user" className='icon'/>

        </div>
        <div className="company">
            <h1>Job offers by Companies</h1>
            {/* return ( */}
                <div className="">
                    {companies.length > 0 ? ( // Check if companies data is available
                     companies.map((company) => ( // Loop through companies array
                       <div className="company-card" key={company.jobId}>   
                               <p className="company-name">Company Name: <h1>{company.companyName}</h1></p>
                               <h4>Job Role</h4>
                               <h2>{company.jobTitle}</h2>
                               <h4>Requirements</h4>
                               <h2>{company.requirements}</h2>
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
  </div>npm
  </div>
  )
}

export default CandidatesCompanies
