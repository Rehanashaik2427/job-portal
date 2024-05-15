import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave } from "react-icons/fa";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import HrLeftSide from "./HrLeftSide";


const UpdateJob = () => {
  const BASE_API_URL = "http://localhost:8080/api/jobbox";
  const location = useLocation();

  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState();
  const [editable, setEditable] = useState(false); // State for tracking editable state
  const [editableJobDetails, setEditableJobDetails] = useState(false); // State for tracking editable state of Job Details
  const [editableDescription, setEditableDescription] = useState(false); // State for tracking editable state of Job Description

  const userEmail = location.state?.userEmail;
  const [jobDetails, setJobDetails] = useState({
    jobTitle: userData?.jobTitle || '',
    jobType: userData?.jobType || '',
    location: userData?.location || '',
    salary: userData?.salary || '',
    postingdate: userData?.postingdate || '',
    qualifications: userData?.qualifications || '',
    deadline: userData?.deadline || '',
    positions: userData?.positions || ''
  });
  const [isEditing, setIsEditing] = useState(false);

  console.log(userEmail);

  const fetchUserData = async (userEmail) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getHRName`, {
        params: {
          userEmail: userEmail
        }
      });

      // console.log(response.data);
      setUserName(response.data.userName);
      setUserData(response.data);

    } catch (error) {

      setUserData(null);
    }
  };

  useEffect(() => {

    fetchUserData(userEmail);

  }, [userEmail]);

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setEditable(!editable); // Toggle editable state
  };

  const user = {
    userName: userName,

    userEmail: userEmail,
  };

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
  const toggleMenu = () => {
    const leftSide = document.querySelector('.hr-leftside');
    leftSide.classList.toggle('active');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditJobDetails = () => {
    setEditableJobDetails(true);
    //setIsEditing(true);
  };

  const handleSaveJobDetails = () => {
    setEditableJobDetails(false);
    //setIsEditing(false); // Disable editing after saving
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to backend
    console.log(formData);
  };

  return (
    <div className='candidate-dashboard-container'>
      <div className="hr-leftside">
        <HrLeftSide user={user} />
      </div>

      <div className='hr-rightside'>
        
        <form className="job-posting-form" onSubmit={handleSubmit}>
        
          <div>
            <h2 style={{ textDecoration: 'underline' }}>Job Details </h2>
            <div className='job-details-row'>
              <div className='job-form-group'>
                <label htmlFor="jobTitle">Job Title:</label>
                <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} disabled={!editableJobDetails} />
              </div>
              <div className='job-form-group'>
                <label htmlFor="jobType">Job Type:</label>
                <input type="text" id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} disabled={!editableJobDetails} />
              </div>
              <div className='job-form-group'>
                <label htmlFor="postingdate">Posting Date:</label>
                <input type="date" id="postingdate" name="postingdate" value={formData.postingdate} onChange={handleChange} disabled={!editableJobDetails} />
              </div>
            </div>
            <div className='job-details-row'>
              <div className='job-form-group'>
                <label htmlFor="skills">Skills:</label>
                <input type="text" id="skills" name="skills" value={formData.skills || ''} onChange={handleChange} disabled={!editableJobDetails} />
              </div>

              <div className='job-form-group'>
                <label htmlFor="positions">Number of Positions:</label>
                <input type="number" id="positions" name="positions" value={formData.positions} onChange={handleChange} disabled={!editableJobDetails} />
              </div>
              <div className='job-form-group'>
                <label htmlFor="deadline">Application Deadline:</label>
                <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} disabled={!editableJobDetails} />
              </div>
              <div className='job-form-group'>
                <label htmlFor="jobsummary">Job summary: Add Additional Information</label>
                <textarea
                  id="jobsummary"
                  name="jobsummary"
                  value={formData.jobsummary}
                  onChange={handleChange}
                  className="fullWidthTextarea"
                  disabled={!editableJobDetails} // Add disabled attribute based on editableDescription state
                />
              </div>
            </div>
            <div className='job-save-edit-buttons'>
              {editableJobDetails ? (
                <button onClick={handleSaveJobDetails}><FaSave /> </button>
              ) : (
                <button onClick={handleEditJobDetails}><FaEdit /></button>
              )}
            </div>
          </div>


  
        </form>
      </div>
    </div>
  );


};
export default UpdateJob;