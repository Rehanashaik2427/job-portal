import React from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa'; // Import the icons you need from React Icons
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';

const AddCompanyDetails = () => {
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
    <FaComments /> <Link to="/contact">Contacts</Link>
  </section>
</div>
    </div>

    <div className="rightSide">
      <h1>Add Company Details</h1>

      <div className="addDetails">
        <span>
          <label htmlFor="Company">Company</label>
          <h3>Company 1</h3>
          <h3>Company 2</h3>
          <h3>Company 3</h3>
        </span>
        <span>
          <label htmlFor="addDetails">Add Details</label>
          <h3><Link to="/companyDetailsByAdmin">ADD</Link></h3>
          <h3><Link to="/companyDetailsByAdmin">ADD</Link></h3>
          <h3><Link to="/companyDetailsByAdmin">ADD</Link></h3>
        </span>
      </div>
    </div>
</div>
  )
}

export default AddCompanyDetails
