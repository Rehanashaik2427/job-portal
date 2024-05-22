import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HrLeftSide from './HrLeftSide';
import UserDetailsModal from './UserDetailsModal';

const People = () => {
    const BASE_API_URL = "http://localhost:8082/api/jobbox";
    const location = useLocation();
    const [people, setPeople] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [hrDetails, setHrDetails] = useState(null);
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;

    useEffect(() => {
        const fetchData = async () => {
            console.log(userEmail);
            try {
                const response = await axios.get(BASE_API_URL + "/getHrEachCompany", { params: { userEmail } });
                setPeople(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (userEmail) {
            fetchData();
        }
    }, [userEmail]);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };
    const handleHrDetails = (details) => {
        setHrDetails(details);
    }
    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
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
                    <input type='text' placeholder='search'></input>
                    <button>
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
                            </tr>
                        </thead>
                        <tbody>
                            {people.map(person => (
                                <tr key={person.id}>
                                    <td>{person.userId}</td>
                                    <td>
                                        <Link to="#" onClick={() => { handleOpenModal(person); handleHrDetails(person); }}>
                                            {person.userName}
                                        </Link>
                                    </td>                                    
                                    <td>{person.userEmail}</td>
                                    <td>{person.companyName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <UserDetailsModal
                show={showModal}
                handleClose={handleCloseModal}
                user={selectedUser}
            />
        </div>
    );
}

export default People;
