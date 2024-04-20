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
        <h2>Details of Company Validation</h2>
        <table className="company-table">
          <thead className="company-thead">
            <tr className="company-tr">
              <th className="company-th">Company Name</th>
              <th className="company-th">Verified On</th>
              <th className="company-th">Company Type</th>
              <th className="company-th">Status & Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="company-tr">
              <td className="company-td">Cisco</td>
              <td className="company-td">04/01/2024</td>
              <td className="company-td">IT</td>
              <td className="company-td">Active</td>
            </tr>
            <tr className="company-tr">
              <td className="company-td">TCS</td>
              <td className="company-td">04/04/2022</td>
              <td className="company-td">IT</td>
              <td className="company-td">Active</td>
            </tr>
            <tr className="company-tr">
              <td className="company-td">Shree Renuka Sugars</td>
              <td className="company-td">01/04/2024</td>
              <td className="company-td">Manufacturing</td>
              <td className="company-td">Active</td>
            </tr>
            <tr className="company-tr">
              <td className="company-td">Myntra</td>
              <td className="company-td">04/04/2020</td>
              <td className="company-td">E-commerce</td>
              <td className="company-td">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
</div>
  )
}

export default CompanyValidation
