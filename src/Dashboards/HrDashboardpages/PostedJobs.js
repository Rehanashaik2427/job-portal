import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from "react-router-dom";
import './HrDashboard.css';

const PostedJobs = () => {
    
    
  return (
    <div className='hr-dashboard-container'>
    <div className='hr-leftside'>
        <nav id='logo'>
            <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>

        <nav>
            <h2>HR Name</h2>
        </nav>   
        <section id="hr-dashboard">
            <FontAwesomeIcon icon={faHouse} /> <Link to="/hr-dashboard"> Dashboard</Link>
        </section>

      
        <section>
            <FontAwesomeIcon icon={faBriefcase} /> <Link to='/post-jobs'>Jobs</Link>
        </section>

        <section>
              <FontAwesomeIcon icon={faAddressCard} /> <Link to='/hr-applications'>Applications</Link>
        </section>

        <section>
            <FontAwesomeIcon icon={faBriefcase} /> <Link to='/posted-jobs'>Posted Jobs</Link>
        </section>

        <section>
            <FontAwesomeIcon icon={faUsers} /> <Link to='/people'>People</Link>
        </section>

        <section>
            <FontAwesomeIcon icon={faUser} /> <Link to='/hr-profile'>Profile</Link>
        </section>


        <section>
            <FontAwesomeIcon icon={faHome} /> <Link to='/'>Home</Link>
        </section>

    </div>

    <div className='hr-rightside'>
        <div className="jobs_list">
            <table className="jobs_list_table" >
                <tr>
                    <th>Hr ID</th>
                    <th>Hr Name</th>
                    <th>Company Name</th>
                    <th>Job ID</th>
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
                    <td>HR123</td>
                    <td>Swetha</td>
                    <td>XYZ Corp</td>
                    <td>001</td>
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
                        <td>HR456</td>
                        <td>Mythri</td>
                        <td>XYZ Corp</td>
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
                        <td>HR123</td>
                        <td>Swetha</td>
                        <td>XYZ Corp</td>
                        <td>003</td>
                        <td>Graphic Designer</td>
                        <td>Freelancer</td>
                        <td>Creating graphic designs for marketing materials</td>
                        <td>Adobe Photoshop, Illustrator</td>
                        <td>BTECH, Degree</td>
                        <td>2024-04-12</td>
                        <td>1</td>
                        <td>2024-04-25 09:00 AM</td>
                    </tr>
                    <tr>
                        <td>HR123</td>
                        <td>Swetha</td>
                        <td>XYZ Corp</td>
                        <td>004</td>
                        <td>Sales Executive</td>
                        <td>Full Employment</td>
                        <td>Managing sales activities and client relationships</td>
                        <td>Sales, Communication</td>
                        <td>BTECH</td>
                        <td>2024-04-13</td>
                        <td>2</td>
                        <td>2024-05-01 11:30 AM</td>
                    </tr>
                    <tr>
                        <td>HR202</td>
                        <td>Surendra</td>
                        <td>XYZ Corp</td>
                        <td>005</td>
                        <td>Project Manager</td>
                        <td>Contract</td>
                        <td>Leading project teams and overseeing project delivery</td>
                        <td>Project Management, Leadership</td>
                        <td>BTECH, MTECH</td>
                        <td>2024-04-14</td>
                        <td>1</td>
                        <td>2024-04-28 03:00 PM</td>
                    </tr>
                </table>
                
        </div>
    </div>
    
</div>
  )
}

export default PostedJobs
