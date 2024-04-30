import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';// Import Link from react-router-dom
import './CandidateDashboard.css';

const CandidateDashboard = () => {
  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;

  return (
    <div className="candidate-dashboard-container">
      <div className='left-side'>
        <nav id='logo'>
          <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>
        <nav>
          <h2>{userName}</h2>
        </nav>
        <section id="dashboard">
          <FontAwesomeIcon icon={faHouse} /> <Link   to={{
          pathname: '/candiadte-dashboard',
          state: { userName: userName, userEmail:userEmail }
        }}> Dashboard</Link>
        </section>
        <section id="jobs">
          <FontAwesomeIcon icon={faLayerGroup} /> <Link  to={{
          pathname: '/candiadte-jobs',
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
        <section id="Home">
          <FontAwesomeIcon icon={faHome} /> <Link to="/"> Home</Link>
        </section> 
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
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{backgroundColor:'skyblue'}}/></div>
          </div>
        </div>

        <div className="my-dashboard-container">
          <div>
            <div><h3 className='status-info'>My application status</h3></div>
         
            <div className="dashboard">
              <div className="data">
                <span>
                  <h4>Applied to</h4>
                  <h2><b>500</b></h2>
                  <h4>companies</h4>
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
            <div><h3 className='status-info'>My Resume Status  and Report</h3></div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
