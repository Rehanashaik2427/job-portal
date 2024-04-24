import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';

const CandidatesCompanies = () => {
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
        <div className="candidate-search">
            <button><FontAwesomeIcon icon={faSearch} />search</button>
            <FontAwesomeIcon icon={faUser} id="user" className='icon'/>
        </div>
        <div className="company">
            <h1>Job offers by Companies</h1>
            <div className="company-card">
                <p className="company-name">Company A</p>
                <h2>Job Role</h2>
                <h3>Backend Developer</h3>
                <p>Number of Positions: 10</p>
                {/* <p className="company-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel libero euismod.</p> */}
                <Link to="/applied-success-msg"><button><h3>Apply</h3></button></Link>
            </div>
            <div className="company-card">
                <p className="company-name">Company B</p>
                <h2>Job Role</h2>
                <h3>Business Executive</h3>
                <p>Number of Positions: 18</p>
                {/* <p className="company-description">Vestibulum nec justo vel libero euismod, vehicula nisl vel, aliquam justo.</p> */}
                <Link to="/applied-success-msg"><button><h3>Apply</h3></button></Link>
            </div>
        </div>
    </div>
  </div>
  )
}

export default CandidatesCompanies
