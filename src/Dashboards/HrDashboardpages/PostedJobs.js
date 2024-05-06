import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './HrDashboard.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const BASE_API_URL="http://localhost:8080/api/jobbox";
const PostedJobs = () => {
    
    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail=location.state?.userEmail;

    const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async (userEmail) => {
      try {
        const response = await axios.get(`${BASE_API_URL}/jobsPostedByHrEmaileachCompany?userEmail=${userEmail}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    if (userEmail) {
      fetchJobs(userEmail);
    }
  }, [userEmail]);


    
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
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/post-jobs',state: { userName: userName, userEmail:userEmail } }}>Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faAddressCard} /> <Link to={{ pathname: '/hr-applications', state: { userName: userName, userEmail:userEmail } }}>Applications</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/posted-jobs', state: { userName: userName, userEmail:userEmail } }}>Posted Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUsers} /> <Link to={{ pathname: '/people', state: { userName: userName, userEmail:userEmail } }}>People</Link>
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
        <div className="jobs_list">
            <table id='jobTable1' >
                <tr>
                    
                    <th>Hr Name</th>
                    <th>Company Name</th>
                    <th>Job Title</th>
                    <th>Job Type</th>
                    <th>Skills</th>
                    <th>Eligible Candidates</th>
                    <th>Vacancy</th>
                    <th>Application Deadline</th>
                </tr>

                {jobs.map(job => (
                <tr key={job.id}>
                  <td>{job.hrName}</td>
                  <td>{job.companyName}</td>
                  <td>{job.jobTitle}</td>
                  <td>{job.jobType}</td>
                  <td>{job.requirements}</td>
                  <td>{job.eligibility}</td>
                  <td>{job.numberOfPosition}</td>
                  <td>{job.applicationDeadline}</td>
                </tr>
              ))}
                    
                </table>
                
        </div>
    </div>
    
</div>
  )
}

export default PostedJobs
