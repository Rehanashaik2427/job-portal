import React, { useState } from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa'; // Import the icons you need from React Icons
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';


const AllowingAccess = () => {
  const [accessData] = useState([
    { user: 'HR', accessTo: 'Posting Jobs', accessStatus: 'Allow' },
    { user: 'Candidate', accessTo: 'Applying Jobs', accessStatus: 'Allow' },
    { user: 'HR', accessTo: 'Posting Jobs', accessStatus: 'Allow' },
  ]);
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
        <h2>Access Dashboard</h2>
        <table className="access-table">
          <thead className="access-thead">
            <tr className="access-tr">
              <th className="access-th">User</th>
              <th className="access-th">Access To</th>
              <th className="access-th">Access Status</th>
            </tr>
          </thead>
          <tbody>
            {accessData.map((data, index) => (
              <tr key={index} className="access-tr">
                <td className="access-td">{data.user}</td>
                <td className="access-td">{data.accessTo}</td>
                <td className="access-td">{data.accessStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
</div>
  )
}

export default AllowingAccess
