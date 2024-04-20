import React from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa'; // Import the icons you need from React Icons
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';


const AdminDashboard = () => {
  return (
    <div className='body'>
        <div className='leftside'>
          <nav id='logo'>
            <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
          </nav>
          <div className="admin-details">
      <nav>
        <h2>AdminName</h2>
      </nav>
      <section id="dashboard">
        <FaHome /> <Link to="/admin-dashboard">Dashboard</Link>
      </section>
      <section id="userValidation">
        <FaUserCheck /> <Link to="/user-validation">Validation User</Link>
      </section>
      <section id="companyValidation">
        <FaBuilding />  <Link to="/company-validation">Validation Company</Link>
      </section>
      <section id="allowingAccess">
        <FaUniversalAccess /> <Link to="/allowing-access">Acess</Link>
      </section>
      <section id="blockAccount">
        <FaUserLock /> <Link to="/block-account">Block Account</Link>
      </section>
      <section id="addCompanyDetails">
        <FaPlus /> <Link to="/add-company-details">Company Details</Link>
      </section>
      <section id="my-profile">
        <FaUser /> <Link to="/my-profile">My Profile</Link>
      </section>
      <section id="contacts">
        <FaComments /> <Link to="/contacts">Contacts</Link>
      </section>
    </div>
        </div>

        <div className="rightSide">
      <div>
        <h1>Admin Dashboard</h1>
      </div>

      <div className="adminDashboard">
        <span>
          <h2>5000+</h2>
          company validated
        </span>
        <span>
          <h2>20000+</h2>
          HR validated
        </span>
        <span>
          <h3>Allowing access to HR</h3>
          <h3>for Job Posting</h3>
        </span>
        <span>
          <h3>Allowing access to Candidate</h3>
          <h3>for Applying Jobs</h3>
        </span>
        <span>
          <h2>200+</h2>
          HR Blocked
        </span>
      </div>

      <div className="applyforValidation">
        <h4>Check for processing User validation!!</h4>
        <p>
            <Link to="/admin-action">Check</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard
