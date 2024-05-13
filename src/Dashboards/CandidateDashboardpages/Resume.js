import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import CandidateLeftSide from './CandidateLeftSide';

const Resume = () => {
  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;
  const [showMessage, setShowMessage] = useState(false);

  const handleAddResume = () => {
    setShowMessage(true);
    // Additional logic to handle adding the resume can be added here
  };

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const user = {
    userName: userName,
    
     userEmail: userEmail,
   };

  return (
    <div className='candidate-dashboard-container'>
    <div className='left-side'>
   <CandidateLeftSide user={user} />
 </div>

      <div className='rightside'>
      <div className="top-right-content">
          <div className="candidate-search">
            <input type='text' placeholder='serach'></input>
            <button>
              <FontAwesomeIcon icon={faSearch} className='button' style={{color:'skyblue'}}/>
            </button>
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{color:'black'}} onClick={toggleSettings}/></div>
          
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
