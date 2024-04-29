import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './HrDashboard.css';

const PostedJobs = () => {
    
    const location = useLocation();
    const userName = location.state?.userName;
    
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
                        <FontAwesomeIcon icon={faHouse} /> <Link to={{ pathname: '/hr-dashboard', state: { userName: userName } }}>Dashboard</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/post-jobs', state: { userName: userName } }}>Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faAddressCard} /> <Link to={{ pathname: '/hr-applications', state: { userName: userName } }}>Applications</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/posted-jobs', state: { userName: userName } }}>Posted Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUsers} /> <Link to={{ pathname: '/people', state: { userName: userName } }}>People</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUser} /> <Link to={{ pathname: '/hr-profile', state: { userName: userName } }}>Profile</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faHome} /> <Link to={{ pathname: '/', state: { userName: userName } }}>Home</Link>
                    </section>
                

    </div>

    <div className='hr-rightside'>
        <div className="jobs_list">
            <table className="jobs_list_table" >
                <tr>
                    
                    <th>Hr Name</th>
                    <th>Company Name</th>
                    <th>Job Title</th>
                    <th>Job Type</th>
                    <th>Job Description</th>
                    <th>Skills</th>
                    <th>Eligible Candidates</th>
                    <th>Date</th>
                    <th>Vacancy</th>
                    <th>Application Deadline</th>
                </tr>

                <tr>
                   
                    <td>Swetha</td>
                    <td>XYZ Corp</td>
                    <td>Software Engineer</td>
                    <td>Full Employment</td>
                    <td>Developing web applications using JavaScript, HTML, and CSS</td>
                    <td>JavaScript, HTML, CSS</td>
                    <td>BE, BTECH, MTECH</td>
                    <td>2024-04-10</td>
                    <td>3</td>
                    <td>2024-04-30 12:00 PM</td>
                </tr>
                    <tr>
                        
                        <td>Mythri</td>
                        
                        <td>002</td>
                        <td>Data Analyst</td>
                        <td>Contract</td>
                        <td>Analyzing data using Python and SQL</td>
                        <td>Python, SQL</td>
                        <td>BE, MTECH</td>
                        <td>2024-04-11</td>
                        <td>2</td>
                        <td>2024-05-05 10:00 AM</td>
                    </tr>
                    <tr>
                       
                        <td>Swetha</td>
                        <td>XYZ Corp</td>
                        <td>Graphic Designer</td>
                        <td>Freelancer</td>
                        <td>Creating graphic designs for marketing materials</td>
                        <td>Adobe Photoshop, Illustrator</td>
                        <td>BTECH, Degree</td>
                        <td>2024-04-12</td>
                        <td>1</td>
                        <td>2024-04-25 09:00 AM</td>
                    </tr>
                    
                </table>
                
        </div>
    </div>
    
</div>
  )
}

export default PostedJobs
