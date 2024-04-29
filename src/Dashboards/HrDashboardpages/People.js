import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const People = () => {
    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail=location.state?.userEmail;
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
    
        <div className='people'>
        <table className='people'>
            
                    <tr>
                        <th>HR ID</th>
                        <th>HR Name</th>
                        <th>Email</th>
                        <th>Company ID</th>
                        <th>Location</th>
                        <th>Phone Number</th>
                    </tr>
                
                
                    <tr>
                        <td>HR123</td>
                        <td>John Doe</td>
                        <td>johndoe@example.com</td>
                        <td>com100001</td>
                        <td>New York</td>
                        <td>123-456-7890</td>
                    </tr>
                    <tr>
                        <td>HR456</td>
                        <td>Jane Smith</td>
                        <td>janesmith@example.com</td>
                        <td>com100002</td>
                        <td>Los Angeles</td>
                        <td>987-654-3210</td>
                    </tr>
                    <tr>
                        <td>HR789</td>
                        <td>Mike Johnson</td>
                        <td>mikejohnson@example.com</td>
                        <td>com100001</td>
                        <td>Chicago</td>
                        <td>111-222-3333</td>
                    </tr>
                    <tr>
                        <td>HR111</td>
                        <td>Sarah Lee</td>
                        <td>sarahlee@example.com</td>
                        <td>com100003</td>
                        <td>Miami</td>
                        <td>444-555-6666</td>
                    </tr>
                    <tr>
                        <td>HR112</td>
                        <td>David Brown</td>
                        <td>davidbrown@example.com</td>
                        <td>com100002</td>
                        <td>San Francisco</td>
                        <td>777-888-9999</td>
                    </tr>
                    <tr>
                        <td>HR113</td>
                        <td>Lisa Taylor</td>
                        <td>lisataylor@example.com</td>
                        <td>com100005</td>
                        <td>Seattle</td>
                        <td>222-333-4444</td>
                    </tr>
                    <tr>
                        <td>HR114</td>
                        <td>Mark Wilson</td>
                        <td>markwilson@example.com</td>
                        <td>com100005</td>
                        <td>Denver</td>
                        <td>555-666-7777</td>
                    </tr>
                    <tr>
                        <td>HR115</td>
                        <td>Amy Miller</td>
                        <td>amymiller@example.com</td>
                        <td>com100006</td>
                        <td>Atlanta</td>
                        <td>888-999-0000</td>
                    </tr>
                    <tr>
                        <td>HR116</td>
                        <td>Chris Evans</td>
                        <td>chrisevans@example.com</td>
                        <td>com100001</td>
                        <td>Boston</td>
                        <td>333-444-5555</td>
                    </tr>
                    <tr>
                        <td>HR117</td>
                        <td>Jennifer White</td>
                        <td>jenniferwhite@example.com</td>
                        <td>com100003</td>
                        <td>Dallas</td>
                        <td>666-777-8888</td>
                    </tr>
                
            </table>
        </div>
    </div>
    
</div>
  )
}

export default People
