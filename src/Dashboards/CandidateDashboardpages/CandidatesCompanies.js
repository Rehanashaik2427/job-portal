import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import CandidateLeftSide from './CandidateLeftSide';


const CandidatesCompanies = () => {
  
 const BASE_API_URL="http://localhost:8082/api/jobbox";
  const [companies, setCompanies] = useState([]);
  
  const location = useLocation();
  const userName=location.state?.userName;
  
  const userId=location.state?.userId;


  const fetchCompany = async () => {
    try {
      const response = await axios.get(BASE_API_URL+"/displayCompanies"); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      setCompanies(response.data); // Set the fetched jobs to state
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // useEffect hook to fetch jobs when the component mounts
  useEffect(() => {
    fetchCompany();
  }, []);



  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.get(`${BASE_API_URL}/searchCompany?search=${search}`);
      setCompanies(response.data);

    }catch(error){
console.log("No data Found"+error);
    }
    console.log("Search submitted:", search);
  };


  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  

  const user = {
    userName: userName,
    
    userId:userId,
   };

  return (
    <>
    <div className='candidate-dashboard-container'>
    <div className='left-side'>
   <CandidateLeftSide user={user} />
 </div>

      <div className='rightside'>
      <div className="top-right-content">
          <div className="candidate-search">
          <form className="candidate-search1" onSubmit={handleSubmit}>
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


        <div className="companyJob">
          <h1> Companies that we have</h1>
          <div className="cards">
            {companies.length > 0 ? (
              companies.map((company) => (
                <div className="company-card-job" key={company.companyId}>
                  <p className="company-name">Company Name: <b>{company.companyName}</b></p>
                  <p>Company Email <b>{company.companyEmail}</b></p>
                  <p>Industry : <b>{company.industry}</b></p>
                  <Link  to={{
          pathname: '/companyPage',
          state: { companyId :company.companyId,userName:userName,userId:userId }
        }} ><button className='com'><h3>View</h3></button></Link>
                                       
                           
                </div>
              ))
            ) : (
              <p>Loading companies...</p>
            )}



          </div>
        </div>
      </div>
    </div>


</>
  );


  
};

export default CandidatesCompanies;
