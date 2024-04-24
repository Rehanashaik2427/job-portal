import React from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa'; // Import the icons you need from React Icons
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';


const CompanyValidation = () => {
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
        <h2 style={{textAlign:'center'}}>Details of Company Validation</h2>
        <div className='company-table'>
        <table className='company-table'>
  
          <tr>
            <th>Company Name</th>
            <th>Verified On</th>
            <th>Company Type</th>
            <th>Status & Actions</th>
          </tr>
          
            <tr>
              <td>Cisco</td>
              <td>04/01/2024</td>
              <td>IT</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>TCS</td>
              <td>04/04/2022</td>
              <td>IT</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Shree Renuka Sugars</td>
              <td>01/04/2024</td>
              <td>Manufacturing</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Myntra</td>
              <td>04/04/2020</td>
              <td>E-commerce</td>
              <td>Active</td>
            </tr>
 
        </table>

        </div>
     
      </div>
</div>
  )
}

export default CompanyValidation
