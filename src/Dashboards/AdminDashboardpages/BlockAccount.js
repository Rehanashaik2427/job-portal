import React from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa'; // Import the icons you need from React Icons
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';

const BlockAccount = () => {
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
      <h1>Blocked Accounts</h1>

      <div className="blockedAccount">
        <h2>Blocked Company's details</h2>
        <div>
          <label htmlFor="Company">Company</label>
          <h3>Company 1</h3>
          <h3>Company 2</h3>
          <h3>Company 3</h3>
        </div>
        <div>
          <label htmlFor="Status">Status</label>
          <h3>Blocked</h3>
          <h3>Blocked</h3>
          <h3>Blocked</h3>
        </div>
      </div>
      <div className="blockedAccount">
        <h2>Blocked User's details</h2>
        <div>
          <label htmlFor="User">User</label>
          <h3>User1 (hr)</h3>
          <h3>User2 (candidate)</h3>
          <h3>User3 (hr)</h3>
        </div>
        <div>
          <label htmlFor="Status">Status</label>
          <h3>Blocked</h3>
          <h3>Blocked</h3>
          <h3>Blocked</h3>
        </div>
      </div>
    </div>
</div>
  )
}

export default BlockAccount
