import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const HrProfile = () => {
    
    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;
  return (
    <div className='hr-dashboard-container'>
        <div className='hr-leftside'>
            <nav id='logo'>
                <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
            </nav>

            <nav>
                <h2>Welcome {userName}</h2>
            </nav>   
            <section id="hr-dashboard">
                        <FontAwesomeIcon icon={faHouse} /> <Link to={{ pathname: '/hr-dashboard', state: { userName: userName, userEmail:userEmail } }}>Dashboard</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/post-jobs', state: { userName: userName, userEmail:userEmail }}}>Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faAddressCard} /> <Link to={{ pathname: '/hr-applications', state: { userName: userName, userEmail:userEmail } }}>Applications</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/posted-jobs',state: { userName: userName, userEmail:userEmail } }}>Posted Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUsers} /> <Link to={{ pathname: '/people', state: { userName: userName, userEmail:userEmail }}}>People</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUser} /> <Link to={{ pathname: '/hr-profile', state: { userName: userName, userEmail:userEmail } }}>Profile</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faHome} /> <Link to={{ pathname: '/', state: { userName: userName, userEmail:userEmail } }}>Home</Link>
                    </section>

                    <h3>Help</h3>
        <h3><Link to="../Jobbox_FrontPage/others.html">Contact us</Link></h3>

        </div>

        <div className='hr-rightside'>
            <div className='hr-profile'>
            <div className="profile_row">
            <div className="boxp">
                <h1>300+ Jobs</h1>
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
