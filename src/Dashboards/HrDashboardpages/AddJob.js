import HrLeftSide from './HrLeftSide';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './HrDashboard.css';
import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useId, useState } from 'react';

const AddJob = () => {
  const BASE_API_URL = "http://localhost:8081/api/jobbox";
  const location = useLocation();
console.log('Location state:', location.state);

    
  const { userName, userEmail } = location.state || {};

  console.log(userEmail);
  const [userData, setUserData] = useState();
  //const [userName,setUserName]=useState();
  const [formData, setFormData] = useState({
    userEmail : userData?.userEmail||'',
    userName : userData?.userName||'',
    jobTitle: userData?.jobTitle || '',
    jobType: userData?.jobType || '',
    location: userData?.location || '',
    salary: userData?.salary || '',
    postingdate: userData?.postingdate || '',
    qualifications: userData?.qualifications || '',
    deadline: userData?.deadline || '',
    positions: userData?.positions || '',
    jobsummary: userData?.jobsummary || ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Construct the job data to be sent to the backend
      const jobData = {
        jobTitle: formData.jobTitle,
        jobType: formData.jobType,
        location: formData.location,
        salary: formData.salary,
        postingdate: formData.postingdate,
        qualifications: formData.qualifications,
        deadline: formData.deadline,
        positions: formData.positions,
        jobsummary: formData.jobsummary,
        hrid:formData.hrid, // Replace with the actual HR ID
        hrname: userName, // Assuming userName is the HR name
        hremail: userEmail, // Assuming userEmail is the HR email
        companyName: formData.companyName // Replace with the actual company name
      };
  
      // Send the job data to the backend API endpoint
      const response = await axios.post(`${BASE_API_URL}/jobs`, jobData);
      
      // Handle the response from the backend (e.g., show success message)
      console.log('Job posted successfully:', response.data);
    } catch (error) {
      // Handle any errors (e.g., show error message)
      console.error('Error posting job:', error);
    }
  };
  


    const user = {
      userName: userName,
       userEmail: userEmail,
     };

     const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  return (
    <div className='candidate-dashboard-container'>
      <div className='hr-leftside'>
          <HrLeftSide user={{ userName, userEmail }} />
      </div>

      <div className='hr-rightside'>
        
        <form className="job-posting-form" onSubmit={handleSubmit}>
        
          <div>
            <h2 style={{ textDecoration: 'underline' }}>Job Details </h2>
            <div className='job-details-row'>
              <div className='job-form-group'>
                <label htmlFor="jobTitle">Job Title:</label>
                <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange}  />
              </div>
              <div className='job-form-group'>
                <label htmlFor="jobType">Job Type:</label>
                <input type="text" id="jobType" name="jobType" value={formData.jobType} onChange={handleChange}  />
              </div>
              <div className='job-form-group'>
                <label htmlFor="postingdate">Posting Date:</label>
                <input type="date" id="postingdate" name="postingdate" value={formData.postingdate} onChange={handleChange}  />
              </div>
            </div>
            <div className='job-details-row'>
              <div className='job-form-group'>
                <label htmlFor="skills">Skills:</label>
                <input type="text" id="skills" name="skills" value={formData.skills || ''} onChange={handleChange}  />
              </div>

              <div className='job-form-group'>
                <label htmlFor="positions">Number of Positions:</label>
                <input type="number" id="positions" name="positions" value={formData.positions} onChange={handleChange}  />
              </div>
              <div className='job-form-group'>
                <label htmlFor="deadline">Application Deadline:</label>
                <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} />
              </div>
              <div className='job-form-group'>
                <label htmlFor="jobsummary">Job summary: (Add Additional Information)</label>
                <textarea
                  id="jobsummary"
                  name="jobsummary"
                  value={formData.jobsummary}
                  onChange={handleChange}
                  className="fullWidthTextarea"
                />
              </div>

              <div className='job-form-group-button'>
                <button type='submit'>post</button>
              </div>
            </div>
         
          </div>
  
        </form>
      </div>

    </div>
  )
}

export default AddJob