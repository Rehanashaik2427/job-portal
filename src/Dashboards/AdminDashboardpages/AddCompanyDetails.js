import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  <section>
          <FontAwesomeIcon icon={faHome} /> <Link to='/'>Home</Link>
        </section>  
</div>
    </div>

    <div className="rightSide">
      <h2>Add Company Details</h2>

      <div className="addDetails">
        <table>
          <tr>
            <th>Company Name</th>
            <th>Add Detail</th>
          </tr>

          <tr>
            <td>comapny 1</td>
            <td><Link to="/companyDetailsByAdmin">ADD</Link></td>
          </tr>
              
          <tr>
            <td>comapny 2</td>
            <td><Link to="/companyDetailsByAdmin">ADD</Link></td>
          </tr>

          <tr>
            <td>comapny 3</td>
            <td><Link to="/companyDetailsByAdmin">ADD</Link></td>
          </tr>

          <tr>
            <td>comapny 4</td>
            <td><Link to="/companyDetailsByAdmin">ADD</Link></td>
          </tr>
      </table>

       
      </div>
    </div>
</div>
  )
}

export default AddCompanyDetails
