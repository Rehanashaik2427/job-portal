import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Applications = () => {
    const [filterStatus, setFilterStatus] = useState('all');

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const filterApplications = () => {
    const rows = document.getElementById('application').querySelectorAll('tr');
    rows.forEach((row) => {
        const rowStatus = row.cells[6].textContent.trim(); // Assuming status is in the 7th column
        if (filterStatus === 'all' || rowStatus === filterStatus) {
            row.style.display = ''; // Show the row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });
};

  return (
    <div className='hr-dashboard-container'>
        <div className='hr-leftside'>
            <nav id='logo'>
                <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
            </nav>

            <nav>
                <h2>HR Name</h2>
            </nav>   
            <section id="hr-dashboard">
                <FontAwesomeIcon icon={faHouse} /> <Link to="/hr-dashboard"> Dashboard</Link>
            </section>

          
            <section>
                <FontAwesomeIcon icon={faBriefcase} /> <Link to='/post-jobs'>Jobs</Link>
            </section>

            <section>
                  <FontAwesomeIcon icon={faAddressCard} /> <Link to='/hr-applications'>Applications</Link>
            </section>

            <section>
                <FontAwesomeIcon icon={faBriefcase} /> <Link to='/posted-jobs'>Posted Jobs</Link>
            </section>

            <section>
                <FontAwesomeIcon icon={faUsers} /> <Link to='/people'>People</Link>
            </section>

            <section>
                <FontAwesomeIcon icon={faUser} /> <Link to='/hr-profile'>Profile</Link>
            </section>


            <section>
                <FontAwesomeIcon icon={faHome} /> <Link to='/'>Home</Link>
            </section>

        </div>

        <div className='hr-rightside'>
            <div className="applications">
                <div className="filter">
                    <label htmlFor="status">Filter by Status:</label>
                    <select id="status" onChange={handleFilterChange} value={filterStatus}>
                        <option value="all">All</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <br />
                <table id='application'>
                    <tr>
                        <th>Application ID</th>
                        <th>Job ID</th>
                        <th>User ID</th>
                        <th>Company ID</th>
                        <th>Resume ID</th>
                        <th>Date/Time</th>
                        <th>Application Status</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>001</td>
                        <td>U123</td>
                        <td>com100001</td>
                        <td>R1</td>
                        <td>2024-04-10 10:30 AM</td>
                        <td>Shortlisted</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>001</td>
                        <td>U456</td>
                        <td>com100001</td>
                        <td>R2</td>
                        <td>2024-04-11 02:45 PM</td>
                        <td>Under Review</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>002</td>
                        <td>U789</td>
                        <td>com100003</td>
                        <td>R1</td>
                        <td>2024-04-12 09:15 AM</td>
                        <td>Shortlisted</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>004</td>
                        <td>U101</td>
                        <td>com100001</td>
                        <td>R3</td>
                        <td>2024-04-13 04:30 PM</td>
                        <td>Rejected</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>003</td>
                        <td>U202</td>
                        <td>com100002</td>
                        <td>R3</td>
                        <td>2024-04-14 11:00 AM</td>
                        <td>Under Review</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>002</td>
                        <td>U303</td>
                        <td>com100002</td>
                        <td>R2</td>
                        <td>2024-04-15 08:20 AM</td>
                        <td>Shortlisted</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>005</td>
                        <td>U404</td>
                        <td>com100001</td>
                        <td>R4</td>
                        <td>2024-04-16 03:45 PM</td>
                        <td>Under Review</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>003</td>
                        <td>U505</td>
                        <td>com100006</td>
                        <td>R2</td>
                        <td>2024-04-17 10:10 AM</td>
                        <td>Shortlisted</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>004</td>
                        <td>U606</td>
                        <td>com100003</td>
                        <td>R1</td>
                        <td>2024-04-18 02:30 PM</td>
                        <td>Rejected</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>001</td>
                        <td>U707</td>
                        <td>com100001</td>
                        <td>R4</td>
                        <td>2024-04-19 11:50 AM</td>
                        <td>Under Review</td>
                    </tr>
                    
                </table>
            </div>
        </div>
        
    </div>
  )
}

export default Applications
