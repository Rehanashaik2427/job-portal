import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import HrLeftSide from "./HrLeftSide";


const AddJob= () => {
  const BASE_API_URL = "http://localhost:8080/api/jobbox";
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const userName = location.state?.userName; // Use location.state directly for userName
  const [userData, setUserData] = useState();
 
  
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    fetchUserData(userEmail);
  }, [userEmail]);

  const fetchUserData = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getHRName`, {
        params: {
          userEmail: userEmail
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(userName); 
  };

  return (
    <div className='candidate-dashboard-container'>
      <div className="hr-leftside">
        <HrLeftSide user={userName} />
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
  );


};
export default AddJob;


