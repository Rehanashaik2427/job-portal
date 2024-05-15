import { faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import HrLeftSide from './HrLeftSide';

const People = () => {
    const BASE_API_URL = "http://localhost:8081/api/jobbox";
    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;
    const [people, setPeople] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            console.log(userEmail)
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
                    <div id="settings-container">
                        {/* Your settings options here */}
                        <ul>
                            <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
                            <li>Setting</li>
                            {/* Add more settings as needed */}
                        </ul>
                    </div>
                )}
                <div>
                    <table id='jobTable1' >
                        <tr>
                            <th>HR ID</th>
                            <th>HR Name</th>
                            <th>Email</th>
                            <th>Company Name</th>
                        </tr>
                        {people.map(person => (
                            <tr key={person.id}>
                                <td>{person.userId}</td>
                                <td>{person.userName}</td>
                                <td>{person.userEmail}</td>
                                <td>{person.companyName}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default People
