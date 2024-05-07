import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './HrDashboard.css';

const Applications = () => {
    const [filterStatus, setFilterStatus] = useState('all');

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail=location.state?.userEmail;

    return (
        <div className='candidate-dashboard-container'>
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
            <main>
                <section className="applications">
                    <div className="filter">
                        <label htmlFor="status">Filter by Status:</label>
                        <select id="status" onChange={handleFilterChange} value={filterStatus}>
                            <option value="all">All</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <br />
                    <table id='jobTable' className="jobTable" >
                        
                            <tr style={{textAlign:'center'}}>
                                <th>Job Title</th>
                                <th>Company ID</th>
                                <th>Resume ID</th>
                                <th>Date/Time</th>
                                <th>Application Status</th>
                            </tr>
                        
                        <tbody>
                            {/* Your application data here */}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default Applications;
