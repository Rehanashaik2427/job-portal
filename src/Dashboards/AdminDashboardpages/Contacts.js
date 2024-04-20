import React from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa'; // Import the icons you need from React Icons
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';
const Contacts = () => {
  const userData = [
    { user: 'User1 (hr)', email: 'a@gmail.com', message: 'Message1', reply: 'Replying Message1' },
    { user: 'User2 (candidate)', email: 'b@gmail.com', message: 'Message2', reply: 'Replying Message2' },
    { user: 'User3 (hr)', email: 'c@gmail.com', message: 'Message3', reply: 'Replying Message3' },
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
      <h1>Request from the Users</h1>
      <div className="help">
        <table className="user-table">
          <thead className='user-thead'>
            <tr className='user-tr'>
              <th className='user-th'>User</th>
              <th className='user-th'>Email</th>
              <th className='user-th'>Message</th>
              <th className='user-th'>Replying To Users</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((data, index) => (
              <tr key={index} className='user-tr'>
                <td className='user-td'>{data.user}</td>
                <td className='user-td'>{data.email}</td>
                <td className='user-td'>{data.message}</td>
                <td className='user-td'>{data.reply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
</div>
  )
}

export default Contacts
