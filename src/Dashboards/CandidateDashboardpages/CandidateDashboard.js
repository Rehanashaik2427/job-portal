import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';

const CandidateDashboard = () => {
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
        <button>
          <FontAwesomeIcon icon={faSearch} className='button'/>search</button>
          <FontAwesomeIcon icon={faUser} id="user" className='icon'/>
        </div>
        <div className="my-dashboard-container">
      <div>
        <h3 className='status-info'>My application status</h3>
        <div className="dashboard">
          <div className="data">
            <span>
              <p>applied to</p>
              <h2><b>500</b></h2>
              <p>companies</p>
            </span>
          </div>
          <div className="data">
            <h1>5</h1>
            <h4>resumes</h4>
          </div>
          <div className="data">
            <h1>250</h1>
            <h4>resume views</h4>
          </div>
          <div className="data">
            <h1>50</h1>
            <h4>shortlist</h4>
          </div>
          <div className="data">
            <h1>500</h1>
            <h4>companies</h4>
          </div>
        </div>
        <h3 className='status-info'>My resume status report</h3>
      </div>
    </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
