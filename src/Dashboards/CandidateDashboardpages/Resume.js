import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import CandidateLeftSide from './CandidateLeftSide';
import axios from 'axios';
import { useEffect } from 'react';

const Resume = () => {
  const BASE_API_URL="http://localhost:8081/api/jobbox";
  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;
  const [showMessage, setShowMessage] = useState(false);


  const [resumes, setResumes] = useState([]);

    useEffect(() => {
        // Fetch resumes data from the backend
        axios.get(`${BASE_API_URL}/getResume?userEmail=${userEmail}`)
            .then(response => {
                setResumes(response.data);
            })
            .catch(error => {
                console.error('Error fetching resumes:', error);
            });
    }, []);

    // Function to handle resume download
    const handleDownload = (fileName) => {
        axios.get(`${BASE_API_URL}/getResume?userEmail=${userEmail}&fileName=${fileName}`, {
            responseType: 'blob'
        })
        .then(response => {
            // Create a temporary URL for the downloaded file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName.substring(fileName.lastIndexOf('/') + 1)); // Extract filename from path
            document.body.appendChild(link);
            link.click();
            // Clean up after download
            link.parentNode.removeChild(link);
        })
        .catch(error => {
            console.error('Error downloading resume:', error);
        });
    };
  
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const user = {
    userName: userName,
    
     userEmail: userEmail,
   };

  return (
    <div className='candidate-dashboard-container'>
    <div className='left-side'>
   <CandidateLeftSide user={user} />
 </div>

      <div className='rightside'>
      <div className="top-right-content">
          <div className="candidate-search">
            <input type='text' placeholder='serach'></input>
            <button>
              <FontAwesomeIcon icon={faSearch} className='button' style={{color:'skyblue'}}/>
            </button>
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{color:'black'}} onClick={toggleSettings}/></div>
          
          </div>
         
    
        </div>
        {showSettings && (
        <div id="modal-container">
        <div id="settings-modal">
          {/* Your settings options here */}
          <ul>
            <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
            <li>Setting </li>
            {/* Add more settings as needed */}
          </ul>
          <button onClick={toggleSettings}>Close</button>
        </div>
        </div>
      )}

        <div>
          <h1 style={{textAlign:'center'}}>MY RESUMES</h1>
          
            
            <div className='resume-div'>
                {resumes.map((resume, index) => (
                    <span className='resume-box' key={index}>
                        {/* {resume.fileName} */} <h1>Resume :{index+1}</h1>
                        <h3>{resume.message}</h3>
                        <button className='download' onClick={() => handleDownload(resume.fileName)}>Download</button>
                    </span>
                ))}
            </div>
        
          <div className='adding-resumes'>
          <Link to={{
          pathname: '/resumeAdd',
          state: { userName: userName, userEmail:userEmail }
        }}>ADD NEW RESUME</Link>
           
       
        </div>
      </div>
    </div>
    </div>
  );
};

export default Resume;
