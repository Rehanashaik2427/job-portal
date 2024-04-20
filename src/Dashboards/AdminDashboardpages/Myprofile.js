import React from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa'; // Import the icons you need from React Icons
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';

const Myprofile = ({ userType }) =>  {
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
    <FaComments /> <Link to="/contacts">Contacs</Link>
  </section>
</div>
    </div>

    <div className="rightSide">
      <div className="details">
        <span>
          <label htmlFor="CompanyName">Company Name</label>
          <h3>Company Name</h3>
        </span>
        <span>
          <label htmlFor="CompanyType">Company Type</label>
          <h3>Company Type</h3>
        </span>
        <span>
          <label htmlFor="role">Job Role</label>
          <h3>Job Role</h3>
        </span>
        <span>
          <label htmlFor="status">Status</label>
          <h3>Active/</h3>
        </span>
        <span>
          <label htmlFor="lastlogin">Last Login Time</label>
          <h3>date/time</h3>
        </span>
      </div>
      <div className="details">
        <span>
          <label htmlFor="UserName">UserName</label>
          <h3>Name</h3>
        </span>
        <span>
          <label htmlFor="UserType">UserType</label>
          <h3>{userType === 'HR' ? 'HR' : 'Candidate'}</h3>
        </span>
        <span>
        <label htmlFor="CompanyName">Validated Company</label>
        {userType === 'HR' && <h3>Company Name</h3>}
        {userType === 'Candidate' && <p>No need Company name</p>}
        {userType !== 'HR' && userType !== 'Candidate' && <p><h3>Company Name</h3>if user type candidate .<br />No need Company name</p>}
      </span>

        <span>
          <label htmlFor="User">User Validation</label>
          <h3>User for validation</h3>
        </span>
        <span>
          <label htmlFor="status">Status</label>
          <h3>Approve/</h3>
        </span>
        <span>
          <label htmlFor="lastlogin">Time of Validation</label>
          <h3>date/time</h3>
        </span>
      </div>
    </div>
</div>
  )
}

export default Myprofile
