import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Resume = () => {
  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;
  const [showMessage, setShowMessage] = useState(false);

  const handleAddResume = () => {
    setShowMessage(true);
    // Additional logic to handle adding the resume can be added here
  };

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
        <div>
          <h1 style={{textAlign:'center'}}>MY RESUMES</h1>
          <div className="span">
            <span className="resume">
              <h3>resume-1</h3>
            </span>
            <span className="resume">
              <h3>resume-2</h3>
            </span>
            <span className="resume">
              <h3>resume-3</h3>
            </span>
            <span className="resume">
              <h3>resume-4</h3>
            </span>
            <span className="resume">
              <h3>resume-5</h3>
            </span>
          </div>
          <div className='adding-resumes'>
            <h2>Add new Resume</h2>
            <input type="file" placeholder="Resume"/>
            <input type="submit" value="ADD" onClick={handleAddResume} />
            {showMessage && (
            <div className='success-message'>
              <p>Your resume has been added successfully!</p>
            </div>
          )}
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Resume;
