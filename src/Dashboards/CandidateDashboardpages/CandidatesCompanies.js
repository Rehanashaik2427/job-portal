
import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './CandidateDashboard.css';
import CandidateLeftSide from './CandidateLeftSide';


const CandidatesCompanies = () => {

  const BASE_API_URL = "http://localhost:8082/api/jobbox";


  const location = useLocation();
  const userName = location.state?.userName;

  const userId = location.state?.userId;


  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);



  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

 
  const fetchCompany = async () => {
    const response = await axios.get(`${BASE_API_URL}/displayCompanies?page=${page}&size=${pageSize}`);
    setCompanies(response.data.content);
    setTotalPages(response.data.totalPages);
  };

  const fetchCompanyBySearch = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/searchCompany?search=${search}&page=${page}&size=${pageSize}`);
      setCompanies(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("No data found: " + error);
    }
    console.log("Search submitted:", search);
  };
  useEffect(() => {
    if (search) {
      fetchCompanyBySearch();
    }
    fetchCompany();
  }, [search, page, pageSize]);


  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchCompanyBySearch();
  };

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };


  const user = {
    userName: userName,

    userId: userId,
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

              <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{ color: 'black' }} onClick={toggleSettings} /></div>

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
                    <p>Industry : <b>{company.industry}</b></p>
                    <Link to={{
                      pathname: '/companyPage',
                      state: { companyId: company.companyId, userName: userName, userId: userId }
                    }} ><button className='com'><h3>View</h3></button></Link>


                  </div>
                ))
              ) : (
                <p>Loading companies...</p>
              )}



            </div>
            <nav>
              <ul className='pagination'>
                <li>
                  <button className='page-button' onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
                </li>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                  <li key={pageNumber} className={pageNumber === page ? 'active' : ''}>
                    <button className='page-link' onClick={() => handlePageChange(pageNumber)}>{pageNumber + 1}</button>
                  </li>
                ))}
                <li>
                  <button className='page-button' onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>


    </>
  );



};

export default CandidatesCompanies;