import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import HrLeftSide from './HrLeftSide';


const People = () => {
    const BASE_API_URL = "http://localhost:8082/api/jobbox";
    const location = useLocation();
    const [people, setPeople] = useState([]);
    const [filteredPeople, setFilteredPeople] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    
    
    const [searchQuery, setSearchQuery] = useState('');
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;
    

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
   
    
    useEffect(() => {
        fetchHRData();
    }, [userEmail,page,pageSize]); // Empty dependency array ensures the effect runs only once when the component mounts
    
    const fetchHRData = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/getHrEachCompany?userEmail=${userEmail}&page=${page}&size=${pageSize}`);
            setPeople(response.data.content);
            setTotalPages(response.data.totalPages)
            // setFilteredPeople(response.data);
        } catch (error) {
            console.error('Error fetching HR data:', error);
        }
    };
    
   

  

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        const filtered = people.filter(person =>
            person.userName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPeople(filtered);
    };

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
                    <input 
                        type='text' 
                        placeholder='Enter Emp Name' 
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} className='button' style={{ color: 'skyblue' }} />
                    </button>
                    <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{ color: 'black' }} onClick={toggleSettings} /></div>
                </div>
                {showSettings && (
                    <div id="modal-container">
                        <div id="settings-modal">
                            <ul>
                                <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sign out</Link></li>
                                <li>Settings</li>
                            </ul>
                            <button onClick={toggleSettings}>Close</button>
                        </div>
                    </div>
                )}

                <div>
                    <table id='jobTable1'>
                        <thead>
                            <tr>
                                <th>HR ID</th>
                                <th>HR Name</th>
                                <th>Email</th>
                                <th>Company Name</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map(person => (
                                <tr key={person.id}>
                                    <td>{person.userId}</td>
                                    <td>{person.userName}</td>
                                    <td>{person.userEmail}</td>
                                    <td>{person.companyName}</td>
                                    <td>{person.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav>
        <ul className='pagination'>
          <li>
            <button className='page-button'  onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
          </li>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <li key={pageNumber} className={pageNumber === page ? 'active' : ''}>
              <button className='page-link'  onClick={() => handlePageChange(pageNumber)}>{pageNumber + 1}</button>
            </li>
          ))}
          <li>
            <button className='page-button'  onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
          </li>
        </ul>
      </nav>
            </div>
           
        </div>
    );
}

export default People;
