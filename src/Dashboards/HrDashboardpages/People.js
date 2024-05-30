import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HrDetailsModal from './HrDetailsModal ';
import HrLeftSide from './HrLeftSide';
import Pagination from './Pagination';

const People = () => {
    const BASE_API_URL = "http://localhost:8082/api/jobbox";
    const location = useLocation();
    const [people, setPeople] = useState([]);
    const [filteredPeople, setFilteredPeople] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedHr, setSelectedHr] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;
    const [currentPage, setCurrentPage] = useState(1); // Start at page 1
    const peoplePerPage = 5; // Number of people per page

    // Pagination logic
    const indexOfLastPerson = currentPage * peoplePerPage;
    const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
    const currentPeople = filteredPeople.slice(indexOfFirstPerson, indexOfLastPerson);
    const totalPages = Math.ceil(filteredPeople.length / peoplePerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log(userEmail);
            try {
                const response = await axios.get(BASE_API_URL + "/getHrEachCompany", { params: { userEmail } });
                setPeople(response.data);
                setFilteredPeople(response.data); // Initialize filtered people
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (userEmail) {
            fetchData();
        }
    }, [userEmail]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = people.filter(person =>
            person.userName.toLowerCase().includes(query) ||
            person.userEmail.toLowerCase().includes(query) ||
            person.companyName.toLowerCase().includes(query)
        );
        setFilteredPeople(filtered);
        setCurrentPage(1); // Reset to first page after search
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const handleOpenModal = (hr) => {
        setSelectedHr({ ...hr, username: userName });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedHr(null);
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
                            {currentPeople.map(person => (
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
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageClick={handlePageClick}
                />
            </div>
            {showModal && (
                <HrDetailsModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    hrDetails={selectedHr}
                />
            )}
        </div>
    );
}

export default People;
