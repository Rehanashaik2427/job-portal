import { faBuilding, faCreditCard, faFile, faFileLines, faGlobe, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faPaperclip, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Payment = () => {

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
          pathname: '/candidate-dashboard',
          state: { userName: userName, userEmail:userEmail }
        }}> Dashboard</Link>
        </section>
        <section id="jobs">
          <FontAwesomeIcon icon={faLayerGroup} /> <Link  to={{
          pathname: '/candidate-jobs',
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
      

        <div className="payment-container">
          <div>
            <h2>Payment Via</h2>
            <section className="payment-options">
              <h2 className='payment-option'><FontAwesomeIcon icon={faCreditCard} /> Credit/Debit card</h2>
              <h2 className='payment-option'><FontAwesomeIcon icon={faPaperclip} /> UPI payments</h2>
              <h2 className='payment-option'><FontAwesomeIcon icon={faGlobe} /> Net Banking</h2>
            </section>
          </div>

          <div>
            <h2>Payment History</h2>
            <p style={{textAlign:'center'}}>Payments Details</p>
            {/* Add payment history details here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
