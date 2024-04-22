import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';

const CandiadteJobs = () => {
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
        <div className="page">
          <div className="search">
            <button><FontAwesomeIcon icon={faSearch} />search</button>
            <FontAwesomeIcon icon={faUser} id="user" className='icon'/>
          </div>

          
            <h1>Jobs</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Job Profile</th>
                  <th>Company Name</th>
                  <th>Post On</th>
                  <th>Status & Actions</th>
                </tr>
              </thead>
            
            </table>
              <tbody>
                <tr>
                  <td>Designer</td>
                  <td>Cisco</td>
                  <td>04/04/2024</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Developer</td>
                  <td>Microsoft</td>
                  <td>02/04/2024</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Designer</td>
                  <td>Cisco</td>
                  <td>04/04/2024</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Developer</td>
                  <td>Microsoft</td>
                  <td>02/04/2024</td>
                  <td>Active</td>
                </tr>
              </tbody>
              {/* <tbody>
                <tr>
                  <td>Designer</td>
                  <td>Cisco</td>
                  <td>04/04/2024</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Developer</td>
                  <td>Microsoft</td>
                  <td>02/04/2024</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Designer</td>
                  <td>Cisco</td>
                  <td>04/04/2024</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Developer</td>
                  <td>Microsoft</td>
                  <td>02/04/2024</td>
                  <td>Active</td>
                </tr>
              </tbody> */}
           


          <div className="dream">
            <p>Can't find your dream company. Don't worry, you can still apply to them.</p>
            <p>Just add the name of your dream company and apply to them directly.</p>
            <Link to="/dream-company" className="app">
                <nav className="apply" style={{ textAlign: 'center' }}><b>Apply to your dream company</b></nav>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandiadteJobs;
