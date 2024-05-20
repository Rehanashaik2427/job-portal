import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import HrLeftSide from './HrLeftSide';

const HrProfile = () => {

    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;
    const [jobCount, setJobCount] = useState(0); // State to hold job count

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
              <div className='hr-leftside'>
             <HrLeftSide user={user} />
           </div>

            <div className='hr-rightside'>
                <div className="candidate-search">
                    <input type='text' placeholder='serach'></input>
                    <button>
                        <FontAwesomeIcon icon={faSearch} className='button' style={{ color: 'skyblue' }} />
                    </button>
                    <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{ color: 'black' }} onClick={toggleSettings} /></div>
                </div>
                {showSettings && (
                    <div id="settings-container">
                        {/* Your settings options here */}
                        <ul>
                            <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
                            <li>Setting</li>
                            {/* Add more settings as needed */}
                        </ul>
                    </div>
                )}
                
                <div className='hr-profile'>
                    <div className="profile_row">
                        <div className="boxp">
                            <h1>{jobCount}  Jobs</h1>
                            <p>"counting of posting jobs"</p>
                            <Link to="/posted-jobs">count of job posting</Link>
                        </div>
                        <div className="boxp">
                            <h1>1000+ Applications</h1>
                            <p>"Number of applications you got"</p>
                            <a href="/hr-applications">Total Applications</a>
                        </div>
                        <div className="boxp">
                            <h1>200+ Candidates</h1>
                            <p>"shortlisted students"</p>
                            <a href="/hr-applications">Shortlisted</a>
                        </div>
                        <div className="boxp">
                            <h1>150+ Hired</h1>
                            <p>"The candidates hired by you"</p>
                            <a href="/hr-applications">Hired</a>
                        </div>
                        <div className="boxp">
                            <h1>300+ Candidates</h1>
                            <p>"The candidate profile want to check"</p>
                            <a href="/hr-applications">Candidate Profiles</a>
                        </div>
                        <div className="boxp">
                            <h1>Your Activity Status</h1>
                            <h2>96%</h2>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default HrProfile
