import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CandidateLeftSide from './CandidateLeftSide';
import './CandidateDashboard.css';
import axios from 'axios';
import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyApplication = () => {
  const BASE_API_URL = "http://localhost:8082/api/jobbox";
  const location = useLocation();
  const userName = location.state?.userName;
  const userId = location.state?.userId;
  const applicationStatus = location.state?.applicationStatus;
  const [showSettings, setShowSettings] = useState(false);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [resumeNames, setResumeNames] = useState({});

  useEffect(() => {
    if (applicationStatus) {
      fetchApplicationsByStatus();
    } else {
      fetchApplications();
    }
  }, [applicationStatus]);

  useEffect(() => {
    fetchResumeNames();
  }, [applications]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/applications?userId=${userId}`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchApplicationsByStatus = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/applicationsBySearch?searchStatus=${applicationStatus}&userId=${userId}`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications by status:', error);
    }
  };

  const fetchResumeNames = async () => {
    const names = {};
    try {
      for (const application of applications) {
        const name = await getResumeName(application.resumeId);
        names[application.resumeId] = name;
      }
      setResumeNames(names);
    } catch (error) {
      console.error('Error fetching resume names:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${BASE_API_URL}/applicationsBySearch?searchStatus=${search}&userId=${userId}`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications by search:', error);
    }
    console.log("Search submitted:", search);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const getResumeName = async (resumeId) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/getResumeMessageById?resumeId=${resumeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resume name:', error);
      return 'Unknown';
    }
  };

  const user = {
    userName: userName,
    userId: userId,
  };

  return (
    <div className='candidate-dashboard-container'>
      <div className='left-side'>
        <CandidateLeftSide user={user} />
      </div>
      <div className='rightside'>
        
        <div className="top-right-content">
          <div className="candidate-search">
            <form className="candidate-search" onSubmit={handleSubmit}>
              <input
                type='text'
                name='search'
                placeholder='Search'
                value={search}
                onChange={handleSearchChange}
              />
              <button type="submit">
              <FontAwesomeIcon icon={faSearch} className='button' style={{ color: 'skyblue' }} />
              </button>
            </form>
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon'  style={{color:'black'}} onClick={toggleSettings}/></div>
          </div>
        </div>
        <div>
          {applications.length > 0 ? (
            <div>
              <h1 style={{ textAlign: 'center' }}>MY APPLICATIONS</h1>
              <div className='applications-table'>
                <table className='applications-table'>
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Job Title</th>
                      <th>Applied On</th>
                      <th>Resume Profile</th>
                      <th>Status & Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(application => (
                      <tr key={application.id}>
                        <td>{application.companyName}</td>
                        <td>{application.jobRole}</td>
                        <td>{application.appliedOn}</td>
                        <td>{resumeNames[application.resumeId]}</td>
                        <td>{application.applicationStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1>No applications found.</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyApplication;
