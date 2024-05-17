import React, { useState } from 'react';

import './HrDashboard.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import HrLeftSide from './HrLeftSide';




const AddJob= () => {
  const BASE_API_URL = "http://localhost:8081/api/jobbox";
  const location = useLocation();
  //console.log('Location state:', location.state);

  const history = useHistory(); 
  const { userName, userEmail } = location.state || {};

  console.log(userEmail);
  const [formData, setFormData] = useState({
    userEmail: userEmail ,
    
    jobTitle: '',
    // Assuming hrId is an integer in your Java entity
    jobType: '',
    location: '',
    salary: '',
    postingDate: '', // Match the naming convention with your Java entity (postingDate instead of postingdate)
    qualifications: '',
    applicationDeadline: '',
    numberOfPosition: '', // Assuming numberOfPosition is an integer in your Java entity
    jobsummary: ''
  });
  

  const saveJobData = async (formData) => {
    try {
      const response = await fetch(`${BASE_API_URL}/postingJob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      return response;
    } catch (error) {
      throw new Error("Invalid Job details");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await saveJobData(formData);
      if (response.ok) {
        console.log("Job posted successfully");
        history.push('/jodAddSuccess');
      } else {
        console.error("Error posting job");
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
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
                <input type="date" id="postingdate" name="postingDate" value={formData.postingDate} onChange={handleChange}  />
              </div>
            </div>
            <div className='job-details-row'>
              <div className='job-form-group'>
                <label htmlFor="skills">Skills:</label>
                <input type="text" id="skills" name="skills" value={formData.skills || ''} onChange={handleChange}  />
              </div>

              <div className='job-form-group'>
                <label htmlFor="positions">Number of Positions:</label>
                <input type="number" id="positions" name="numberOfPosition" value={formData.numberOfPosition} onChange={handleChange}  />
              </div>
              <div className='job-form-group'>
                <label htmlFor="deadline">Application Deadline:</label>
                <input type="date" id="deadline" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} />
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


export default AddJob;