import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from "react-router-dom";
import './HrDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const HrDashboard = () => {

  const BASE_API_URL = "http://localhost:8080/api/jobbox";
  const location = useLocation();
  const userName = location.state?.userName;
  console.log(userName);

  


  return (
    <div className='candidate-dashboard-container'>
      <div className='hr-leftside'>
        <nav id='logo'>
          <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>
        <nav>
          <h2> Welcome {userName}</h2>
        </nav>   
        
      <section id="hr-dashboard">
        <FontAwesomeIcon icon={faHouse} /> <Link to={{
          pathname: '/hr-dashboard',
          state: { userName: userName }
        }}>Dashboard</Link>
      </section>
      <section>
        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{
          pathname: '/post-jobs',
          state: { userName: userName }
        }}>Jobs</Link>
      </section>
      <section>
        <FontAwesomeIcon icon={faAddressCard} /> <Link to={{
          pathname: '/hr-applications',
          state: { userName: userName }
        }}>Applications</Link>
      </section>
      <section>
        <FontAwesomeIcon icon={faBriefcase} /> <Link to={{
          pathname: '/posted-jobs',
          state: { userName: userName }
        }}>Posted Jobs</Link>
      </section>
      <section>
        <FontAwesomeIcon icon={faUsers} /> <Link to={{
          pathname: '/people',
          state: { userName: userName }
        }}>People</Link>
      </section>
      <section>
        <FontAwesomeIcon icon={faUser} /> <Link to={{
          pathname: '/hr-profile',
          state: { userName: userName }
        }}>Profile</Link>
      </section>
      <section>
        <FontAwesomeIcon icon={faHome} /> <Link to={{
          pathname: '/',
          state: { userName: userName }
        }}>Home</Link>
      </section>
    
      </div>
      <div className='hr-rightside'>
        <div className="content">
            <div className="box-container">

                {/* First row - first box */}
                <div className="box">
                    <h2>Jobs</h2>
                    <h4 style={{ alignContent: 'center' }}>1000+jobs</h4>
                    <img src="https://cdn-icons-png.flaticon.com/128/3688/3688609.png" className="animated-icons" alt="Jobs Icon" />
                    <p>Everyday 100+ jobs are posted by us</p>
                </div>

                {/* First row - second box */}
                <div className="box">
                    <h2>Total Applications</h2>
                    <img src="https://cdn-icons-png.flaticon.com/128/942/942748.png" className="animated-icons" alt="Applications Icon" />
                    <p >Total Applications count 200+</p>
                </div>

                {/* Second row - first box */}
                <div className="box">
                    <h2>Shortlisted candidates</h2>
                    <img src="https://cdn-icons-png.flaticon.com/128/11356/11356039.png" className="animated-icons" alt="Candidates Icon" />
                    <p>click here to see <a href="#">list of candidates</a></p>
                </div>

                  {/* Second row - second box */}
                <div className="box">
                    <h2>Activities</h2>
                        <img src="https://cdn-icons-png.flaticon.com/128/15597/15597760.png" className="animated-icons" alt="Activities Icon" />
                        <table>
                            <tr>
                                <td>Posting jobs</td>
                                <td >1000+</td>
                            </tr>
                            <tr>
                                <td>Total Applications</td>
                                <td >3000+</td>
                            </tr>
                            <tr>
                                <td>Shortlisted-Candidates</td>
                                <td >200+</td>
                            </tr>
                        </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HrDashboard;
