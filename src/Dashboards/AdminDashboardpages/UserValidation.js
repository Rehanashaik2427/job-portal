import React from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa'; // Import the icons you need from React Icons
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';

const UserValidation = () => {
  const userData = [
    { name: 'Ram', verifiedOn: '04/04/2024', userType: 'Candidate', status: 'Active' },
    { name: 'Rahul', verifiedOn: '04/01/2024', userType: 'Candidate', status: 'Active' },
    { name: 'Rajesh', verifiedOn: '04/04/2024', userType: 'HR', status: 'Active' },
    { name: 'Rehana', verifiedOn: '04/03/2024', userType: 'Candidate', status: 'Active' },
  ];
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

    <h2>Details of Users Validation</h2>
      <table className="user-table">
        <thead className='user-thead'>
          <tr className='user-tr'>
            <th className='user-th'>User Name</th>
            <th className='user-th'>Verified On</th>
            <th className='user-th'>User Type</th>
            <th className='user-th'>Status & Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index} className='user-tr'>
              <td className='user-td'>{user.name}</td>
              <td className='user-td'>{user.verifiedOn}</td>
              <td className='user-td'>{user.userType}</td>
              <td className='user-td'>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
</div>
  )
}

export default UserValidation
