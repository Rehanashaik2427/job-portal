import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './HrDashboard.css';


const Jobs = () => {
    
    const [jobDetails, setJobDetails] = useState({
        hrId: '',
        hrName: '',
        companyName: '',
        title: '',
        jobType: '',
        eligibility: '',
        applicationDeadline: '',
        location: '',
        requirements: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails((prevJobDetails) => ({
          ...prevJobDetails,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Job details submitted:', jobDetails);
        // Reset form after submission (optional)
        setJobDetails({
          hrId: '',
          hrName: '',
          companyName: '',
          title: '',
          jobType: '',
          eligibility: '',
          applicationDeadline: '',
          location: '',
          requirements: '',
        });
      };
    
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
        
        <form className='job-posting-form' onSubmit={handleSubmit}>
            <h2 style={{textAlign:'center'}}>Post a Job</h2>
            <div className='Job-details'>
                <label htmlFor='hrId'>HR ID: <input type='text' id='hrId' name='hrId' value='HR_ID' /></label>
                <label htmlFor='hrName'>HR Name: <input type='text' id='hrName' name='hrName' value='HR_NAME' /></label>
                <label htmlFor='companyName'>Company Name: <input type='text' id='companyName' name='companyName' value='COMPANY_NAME' /></label>
            </div>

            <div className='Job-details'>
                <label htmlFor='title'>Job Title: <input type='text' id='title' name='title' value={jobDetails.title} onChange={handleChange} required /></label>
                <label htmlFor='jobType'>Job Type:<br/> 
                <select id='jobType' name='jobType' value={jobDetails.jobType} onChange={handleChange} required>
                    <option value=''>Select Job Type</option>
                    <option value='fullTime'>Full Time</option>
                    <option value='partTime'>Part Time</option>
                    <option value='contract'>Contract</option>
                </select>
                </label>
                <label htmlFor='eligibility'>Eligibility: <input type='text' id='eligibility' name='eligibility' value={jobDetails.eligibility} onChange={handleChange} required /></label>
            </div>

            <div className='Job-details'>
                <label htmlFor='applicationDeadline' >Application Deadline: <br/><input type='date' className='date' id='applicationDeadline' name='applicationDeadline' value={jobDetails.applicationDeadline} onChange={handleChange} required /></label>
                <label htmlFor='location'>Location: <input type='text' id='location' name='location' value={jobDetails.location} onChange={handleChange} required /></label>
                <label htmlFor='requirements'>Requirements/Skills:<br/> <textarea id='requirements' name='requirements' value={jobDetails.requirements} onChange={handleChange} required /></label>
            </div>
            <div className='submit-button' >
                <button type='submit' >Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
  
}

export default Jobs;
