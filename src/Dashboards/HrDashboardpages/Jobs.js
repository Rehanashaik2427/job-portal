import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HrDashboard.css';


const Jobs = () => {
  const location = useLocation();


  const [jobs, setJobs] = useState([]);



  return (
    <div className='hr-dashboard-container'>
      <div className='hr-leftside'>
        <nav id='logo'>
          <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>
        <nav>
          <h2>Welcome </h2>
        </nav>
        <section id="hr-dashboard">
          <FontAwesomeIcon icon={faHouse} /> <Link to='/hr-dashboard'>Dashboard</Link>
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
        <FontAwesomeIcon icon={faUsers} /> <Link to= '/people'>People</Link>
      </section>
      <section>
        <FontAwesomeIcon icon={faUser} /> <Link to= '/hr-profile'>Profile</Link>
      </section>
        <section>
          <FontAwesomeIcon icon={faHome} /> <Link to= '/'>Home</Link>
        </section>
        <h3>Help</h3>
        <h3><Link to="../Jobbox_FrontPage/others.html">Contact us</Link></h3>
      </div>
      
      <div className='hr-rightside'>
        <div>
          <h2>Jobs Posted by </h2>
          <table id='jobTable' className="jobTable">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Job Type</th>
                <th>Location</th>
                <th>Requirements</th>
                <th>Eligible</th>
                <th>No of Position</th>
                <th>Salary</th>
                <th>Application DeadLine</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td>{job.jobTitle}</td>
                  <td>{job.jobType}</td>
                  <td>{job.location}</td>
                  <td>{job.requirements}</td>
                  <td>{job.eligibility}</td>
                  <td>{job.numberOfPosition}</td>
                  <td>{job.salary}</td>
                  <td>{job.applicationDeadline}</td>
                  <td>
                    {/* <button onClick={() => handleUpdate(job.jobId)}>Update</button>
                    <button onClick={() => handleDelete(job.jobId)}>Delete</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <Link to='/addJob'>Add Another Job</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
