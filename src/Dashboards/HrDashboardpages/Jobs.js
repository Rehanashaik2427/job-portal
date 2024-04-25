import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './HrDashboard.css';

//import { useState } from 'react';
import axios from 'axios';


const BASE_API_URL="http://localhost:8080/api/jobbox";
const Jobs = () => {
    
    const [jobDetails, setJobDetails] = useState({

        userId:'',
          userName:'',
          companyName: '',
          jobTitle: '',
          requirements: '',
          location: '',
          jobType: '',
          applicationDeadline: '',
          numberOfPosition:'',
          eligibility:'',
          salary:'',
          experience:'',

 

      });
    
      const handleChange = (e) => {
        const value  = e.target.value;
        setJobDetails ({
          ...jobDetails,
          [e.target.name]: value 
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

      
        try {
          // Prepare API request details (URL, method, data)
          const apiUrl = BASE_API_URL+"/postingJob"; // Replace with your API endpoint
          const method = 'POST'; // Adjust method based on your API (POST or PUT)
          const data = jobDetails;
      
          // Send the API request using axios
          const response = await axios({
            url: apiUrl,
            method: method,
            data: data,
          });
      
          console.log('Job details submitted:', response.data); // Log API response for debugging
      
          // Handle successful submission (e.g., display success message, reset form)
          setJobDetails({
            userId:'',
            userName:'',
            companyName: '',
            jobTitle: '',
            requirements: '',
            location: '',
            jobType: '',
            applicationDeadline: '',
            numberOfPosition:'',
            eligibility:'',
            salary:'',
            experience:'',
          });
      
        } catch (error) {
          console.error('Error submitting job details:', error);
          // Handle errors appropriately (e.g., display error message to the user)
        }
      };
    
        console.log('Job details submitted:', jobDetails);
        // Reset form after submission (optional)
        setJobDetails({
            userId:'',
            userName:'',
            companyName: '',
            jobTitle: '',
            requirements: '',
            location: '',
            jobType: '',
            applicationDeadline: '',
            numberOfPosition:'',
            eligibility:'',
            salary:'',
            experience:'',
        });
      
    

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

            <div className='hr-job-posting-form'>
                <h2 style={{textAlign:'center'}}>Post a Job</h2>
                <form className='hr-job-posting-form' onSubmit={handleSubmit}>
                    <div className='job-details'>
                        <label htmlFor='hrId'>HR ID: <input type='text' id='hrId' name='userId' value={jobDetails.userId} onChange={handleChange} required/></label>
                        <label htmlFor='hrName'>HR Name: <input type='text' id='hrName' name='userName' value={jobDetails.userName} onChange={handleChange} required/></label>
                        <label htmlFor='companyName'>Company Name: <input type='text' id='companyName' name='companyName' value={jobDetails.companyName} onChange={handleChange} required/></label>
                    </div>

                    <div className='job-details'>
                        <label htmlFor='title'>Job Title: <input type='text' id='title' name='jobTitle' value={jobDetails.jobTitle} onChange={handleChange} required /></label>
                        <label htmlFor='jobType'>Job Type:<br/> 
                            <select id='jobType' name='jobType' value={jobDetails.jobType} onChange={handleChange} required>
                                <option value=''>Select Job Type</option>
                                <option value='fullTime'>Full Time</option>
                                <option value='partTime'>Part Time</option>
                                <option value='contract'>Contract</option>
                                <option value='Intern'>Intern</option>
                                <option value='Freelancer'>Freelancer</option>
                            </select>
                        </label>
                        <label htmlFor='eligibility'>Eligibility: <input type='text' id='eligibility' name='eligibility' value={jobDetails.eligibility} onChange={handleChange} required /></label>
                    </div>

                    <div className='job-details'>
                        <label id='applicationdate' htmlFor='applicationDeadline' >Application Deadline: <br/><input type='date' className='date' id='applicationDeadline' name='applicationDeadline' value={jobDetails.applicationDeadline} onChange={handleChange} required /></label>
                        <label htmlFor='location'>Location: <input type='text' id='location' name='location' value={jobDetails.location} onChange={handleChange} required /></label>
                        <label htmlFor='requirements'>Requirements/Skills:<br/> <textarea id='requirements' name='requirements' value={jobDetails.requirements} onChange={handleChange} required /></label>
                    </div>

                    <div className='job-details'>
                        <label htmlFor='no of positions'>Openings:<br/> <input type='text' id='no of positions' name='noOfPosition' value={jobDetails.numberOfPosition} onChange={handleChange} required /></label>
                        <label htmlFor='experience'>Experience: <input type='text' id='experience' name='experience' value={jobDetails.experience} onChange={handleChange} required /></label>
                        <label htmlFor='salary'>Salary: <input type='text' id='salary' name='salary' value={jobDetails.salary} onChange={handleChange} required /></label>
                    </div>
                    
                    <div className='job-button'>
                        <button >Post</button>
                    </div>
                    
                </form>
            </div>
        
        {/* <form className='job-posting-form' onSubmit={handleSubmit}>
            <h2 style={{textAlign:'center'}}>Post a Job</h2>
            <div className='Job-details'>
            <label htmlFor='hrId'>HR Id:
            <input type='number' id='hrId' name='hrId' value={jobDetails.hrId} onChange={handleChange}/>
            </label>
            <label htmlFor='hrName'>HR Name:
            <input type='text' id='hrName' name='hrName' value={jobDetails.hrName} onChange={handleChange}/>
            </label>
            <label htmlFor='companyName'>Company Name:
            <input type='text' id='companyName' name='companyName' value={jobDetails.companyName} onChange={handleChange}/>
            </label>
            
            </div>

            <div className='Job-details'>
                <label htmlFor='title'>Job Title: <input type='text' id='title' name='jobTitle' value={jobDetails.jobTitle} onChange={handleChange} required /></label>
                <label htmlFor='jobType'>Job Type:<br/> 
                <select id='jobType' name='jobType' value={jobDetails.jobType} onChange={handleChange} required>
                    <option value=''>Select Job Type</option>
                    <option value='fullTime'>Full Time</option>
                    <option value='partTime'>Part Time</option>
                    <option value='contract'>Contract</option>
                    <option value='Intern'>Contract</option>
                    <option value='Freelancer'>Contract</option>
                </select>
                </label>
                <label htmlFor='eligibility'>Eligibility: <input type='text' id='eligibility' name='eligibility' value={jobDetails.eligibility} onChange={handleChange} required /></label>
            </div>

            <div className='Job-details'>
                <label htmlFor='applicationDeadline' >Application Deadline: <br/><input type='date' className='date' id='applicationDeadline' name='applicationDeadline' value={jobDetails.applicationDeadline} onChange={handleChange} required /></label>
                <label htmlFor='location'>Location: <input type='text' id='location' name='location' value={jobDetails.location} onChange={handleChange} required /></label>
<<<<<<< HEAD
                <label htmlFor='requirements'>Requirements/Skills:<br/> <textarea id='requirements' name='requirements' value={jobDetails.requirements} onChange={handleChange} required /></label> 
                <label htmlFor='location'>Number Of Position: <input type='number' id='numberOfPosition' name='numberOfPosition' value={jobDetails.numberOfPosition} onChange={handleChange} required /></label>
=======
                <label htmlFor='requirements'>Requirements/Skills:<br/> <textarea id='requirements' name='requirements' value={jobDetails.requirements} onChange={handleChange} required /></label>
                <label htmlFor='no of positions'>Openings:<br/> <textarea id='no of positions' name='no of positions' value={jobDetails.openings} onChange={handleChange} required /></label>

            </div>
            <div className='hr-submit-button' >
                <button type='submit'>Submit</button>
            </div>
        </form> */}
      </div>
    </div>
  )
};

export default Jobs;
