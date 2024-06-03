import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import HrLeftSide from './HrLeftSide';

const AddJob = () => {
  const BASE_API_URL = "http://localhost:8082/api/jobbox";
  const location = useLocation();

 


  const history = useHistory(); 
  const { userName, userEmail, companyName } = location.state || {};
  console.log(userEmail);
 
  const [formData, setFormData] = useState({
    userEmail: userEmail,
    jobTitle: '',
    jobType: '',
    location: '',
    salary: '',
    postingDate: '',
    qualifications: '',
    applicationDeadline: '',
    numberOfPosition: '', 
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
        console.log("Job posted successfully",formData);
       
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
    <div className='hr-dashboard-container'>
      <div className='hr-leftside'>

          <HrLeftSide user={{ userName, userEmail }} /> 
      </div>

      

  

          <div className='hr-rightside'>
        <div className='job-posting-container'>
          <form className="job-posting-form" onSubmit={handleSubmit}>
            <div>
              <h2 style={{ textDecoration: 'underline' }}>Job Details </h2>
              <div className='job-details-row'>
                <div className='job-form-group'>
                  <label htmlFor="jobTitle">Job Title:</label>
                  <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
                </div>
                <div className='job-form-group'>
                  <label htmlFor="jobType">Job Type:</label>
                  <input type="text" id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} required />
                </div>
                <div className='job-form-group'>
                  <label htmlFor="postingdate">Posting Date:</label>
                  <input type="date" id="postingdate" name="postingDate" value={formData.postingDate} onChange={handleChange} required  />
                </div>

              </div>
              <div className='job-details-row'>
                <div className='job-form-group'>
                  <label htmlFor="skills">Skills:</label>
                  <input type="text" id="skills" name="skills" value={formData.skills} onChange={handleChange} required />
                </div>
                <div className='job-form-group'>
                  <label htmlFor="positions">Number of Positions:</label>
                  <input type="number" id="positions" name="numberOfPosition" value={formData.numberOfPosition} onChange={handleChange} required  />
                </div>
                <div className='job-form-group'>
                  <label htmlFor="salary">Salary:</label>
                  <input type="text" id="salary" name="salary" value={formData.salary} onChange={handleChange} required  />
                </div>
              
                <div className='job-form-group'>
                  <label htmlFor="deadline">Application Deadline:</label>
                  <input type="date" id="deadline" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} required/>
                </div>
                <div className='job-form-group'>
                  <label htmlFor="jobsummary">Job summary: (Add Additional Information)</label>
                 <pre> <strong><textarea
                    id="jobsummary"
                    name="jobsummary"
                    value={formData.jobsummary}
                    onChange={handleChange}
                    className="fullWidthTextarea"
                  /></strong></pre>
                </div>
                <div className='job-form-group-button'>
                  <button type='submit' className='post' onClick={handleSubmit}>
                    <Link to={{ pathname: '/jodAddSuccess', state: { userName: userName, userEmail: userEmail } }}>Post</Link>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
  )
}
export default AddJob;
