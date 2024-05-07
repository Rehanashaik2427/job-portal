import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const People = () => {
    const BASE_API_URL = "http://localhost:8080/api/jobbox";
    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail=location.state?.userEmail;
    const [people, setPeople] = useState([]);
        

    useEffect(() => {
        const fetchData = async () => {
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

    
  return (
    <div className='hr-dashboard-container'>
    <div className='hr-leftside'>
        <nav id='logo'>
            <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>
        <nav>
                <h2>Welcome {userName}</h2>
            </nav>   
            <section id="hr-dashboard">
                        <FontAwesomeIcon icon={faHouse} /> <Link to={{ pathname: '/hr-dashboard', state: { userName: userName, userEmail:userEmail } }}>Dashboard</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/post-jobs', state: { userName: userName, userEmail:userEmail }}}>Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faAddressCard} /> <Link to={{ pathname: '/hr-applications', state: { userName: userName, userEmail:userEmail } }}>Applications</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{ pathname: '/posted-jobs',state: { userName: userName, userEmail:userEmail } }}>Posted Jobs</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUsers} /> <Link to={{ pathname: '/people', state: { userName: userName, userEmail:userEmail }}}>People</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faUser} /> <Link to={{ pathname: '/hr-profile', state: { userName: userName, userEmail:userEmail } }}>Profile</Link>
                    </section>
                    <section>
                        <FontAwesomeIcon icon={faHome} /> <Link to={{ pathname: '/', state: { userName: userName, userEmail:userEmail } }}>Home</Link>
                    </section>
    </div>

    <div className='hr-rightside'>
    
        <div className="jobs_list">
        <table id='jobTable' className="jobTable">
            
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


                            {/* Render additional data in corresponding cells */}
                        </tr>
                    ))}
               
                
                    
                
            </table>
        </div>
    </div>
    
</div>
  )
}

export default People
