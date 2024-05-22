import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import HrLeftSide from './HrLeftSide';
import axios from 'axios';
import { useEffect } from 'react';

const HrProfile = () => {

    const BASE_API_URL = "http://localhost:8082/api/jobbox";

    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;
    const [jobCount, setJobCount] = useState(0); // State to hold job count

    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const [countOfJobs,setCountOfJobs]=useState();
    const fetchCountOfJobs= async()=>{
       try{
         const response=await axios.get(`${BASE_API_URL}/CountOfJobsPostedByEachCompany?userEmail=${userEmail}`)
         setCountOfJobs(response.data);
       }catch(error){
   console.log (error)
       }
     }
     const [countOfApplications,setCountOfApplications]=useState();
     const fetchCountOfApplication= async()=>{
       try{
         const response=await axios.get(`${BASE_API_URL}/CountOfApplicationBYHREachCompany?userEmail=${userEmail}`)
         setCountOfApplications(response.data);
       }catch(error){
   console.log (error)
       }
     }
     const [countOfCandidates,setCountOfCandidates]=useState();
     const fetchCountOfCandidates= async()=>{
       try{
         const response=await axios.get(`${BASE_API_URL}/CountOfCandidateBYHRJob?userEmail=${userEmail}`)
         setCountOfCandidates(response.data);
       }catch(error){
   console.log (error)
       }
     }
       const [countOfShortlistedCandidates,setCountOfShortlistedCandidates]=useState();
     const fetchCountOfShortlistedCandidates= async()=>{
       try{
         const response=await axios.get(`${BASE_API_URL}/CountOfShortlistedCandidateBYHRJob?userEmail=${userEmail}`)
         setCountOfShortlistedCandidates(response.data);
       }catch(error){
   console.log (error)
       }
     }
     useEffect(()=>{
       fetchCountOfJobs();
       fetchCountOfApplication();
       fetchCountOfCandidates();
       fetchCountOfShortlistedCandidates();
     })
   
    const user = {
        userName: userName,
        
         userEmail: userEmail,
       };
     
     
       return (
         <div className='hr-dashboard-container'>
              <div className='hr-leftside'>
             <HrLeftSide user={user} />
           </div>

            <div className='hr-rightside'>
                <div className="candidate-search">
                    <input type='text' placeholder='serach'></input>
                    <button>
                        <FontAwesomeIcon icon={faSearch} className='button' style={{ color: 'skyblue' }} />
                    </button>
                    <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{ color: 'black' }} onClick={toggleSettings} /></div>
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

                
                <div className='hr-profile'>
                    <div className="profile_row">
                        <div className="boxp">

                            <h1> {countOfJobs} Jobs</h1>

                            <h1>{jobCount}  Jobs</h1>

                            <p>"counting of posting jobs"</p>
                            <p>count of job posting</p>
                        </div>
                        <div className="boxp">
                            <h1>{countOfApplications} Applications</h1>
                            <p>"Number of applications you got"</p>
                            <p>Total Applications</p>
                        </div>
                        <div className="boxp">
                            <h1>{countOfShortlistedCandidates} Candidates</h1>
                            <p>"shortlisted students"</p>
                            <a href="/hr-applications">Shortlisted</a>
                        </div>
                        <div className="boxp">
                            <h1>150+ Hired</h1>
                            <p>"The candidates hired by you"</p>
                            <a href="/hr-applications">Hired</a>
                        </div>
                        <div className="boxp">
                            <h1>{countOfCandidates} Candidates</h1>
                            <p>"The candidate profile want to check"</p>
                            <a href="/hr-applications">Candidate Profiles</a>
                        </div>
                        <div className="boxp">
                            <h1>Your Activity Status</h1>
                            <h2>96%</h2>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default HrProfile;
