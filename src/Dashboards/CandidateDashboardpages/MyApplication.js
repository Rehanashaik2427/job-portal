import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const MyApplication = () => {

  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;
  return (
    <div className="candidate-dashboard-container">
      <div className='left-side'>
        <nav id='logo'>
          <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>
        <nav>
          <h2>{userName}</h2>
        </nav>
        <section id="dashboard">
          <FontAwesomeIcon icon={faHouse} /> <Link   to={{
          pathname: '/candiadte-dashboard',
          state: { userName: userName, userEmail:userEmail }
        }}> Dashboard</Link>
        </section>
        <section id="jobs">
          <FontAwesomeIcon icon={faLayerGroup} /> <Link  to={{
          pathname: '/candiadte-jobs',
          state: { userName: userName, userEmail:userEmail }
        }} >Jobs</Link>
        </section>
        <section id="companies">
          <FontAwesomeIcon icon={faBuilding} /> <Link  to={{
          pathname: '/candidate-companies',
          state: { userName: userName, userEmail:userEmail }
        }}> Companies</Link>
        </section>
        <section id="my-application">
          <FontAwesomeIcon icon={faFileLines} /> <Link to={{
          pathname: '/my-application',
          state: { userName: userName, userEmail:userEmail }
        }}>My Application</Link>
        </section>
        <section id="my-resume">
          <FontAwesomeIcon icon={faFile} /> <Link to={{
          pathname: '/resume',
          state: { userName: userName, userEmail:userEmail }
        }}> My Resume</Link>
        </section>
        <section id="my-profile">
          <FontAwesomeIcon icon={faUser} /> <Link to={{
          pathname: '/profile',
          state: { userName: userName, userEmail:userEmail }
        }}> My Profile</Link>
        </section>
        <section id="payment">
          <FontAwesomeIcon icon={faMoneyCheckDollar} /> <Link  to={{
          pathname: '/payment',
          state: { userName: userName, userEmail:userEmail }
        }}> Payments/Credits</Link>
        </section>
        <section id="Home">
          <FontAwesomeIcon icon={faHome} /> <Link to="/"> Home</Link>
        </section> 
        <h3>Help</h3>
        <h3><Link to="/contact">Contact us</Link></h3>
      </div>

      <div className='rightside'>
      <div className="top-right-content">
          <div className="candidate-search">
            <input type='text' placeholder='serach'></input>
            <button>
              <FontAwesomeIcon icon={faSearch} className='button' style={{color:'skyblue'}}/>
            </button>
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{backgroundColor:'skyblue'}}/></div>
          </div>
        </div>
        <div>
            <h1 style={{textAlign:'center'}}>MY APPLICATIONS</h1>
            <div className='applications-table'>
            <table className='applications-table'>
                <tr>
                    <th>Company Name</th>
                    <th >Applied On</th>
                    <th>Resume Profile</th>
                    <th>Status & Actions</th>
                </tr>

                <tr>
                    <td>cisco</td>
                    <td>04/04/2024</td>
                    <td>resume-1</td>
                    <td style={{color:'green'}}>HR viewed</td>
                </tr>

                <tr>
                  <td>Microsoft</td>
                  <td>02/04/2024</td>
                  <td>resume-2</td>
                  <td style={{color:'gray'}}>shortlisted</td>
                </tr>

                <tr>
                  <td>cisco</td>
                  <td>04/04/2024</td>
                  <td>resume-3</td>
                  <td style={{color:'gray'}}>shortlisted</td>
                </tr>

                <tr>
                  <td>Microsoft</td>
                  <td>02/04/2024</td>
                  <td>resume-1</td>
                  <td style={{color:'green'}}>HR viewed</td>
                </tr>
            </table>
              </div>
               
        </div>
      </div>
    </div>
  )
}

export default MyApplication
