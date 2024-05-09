import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  <section>
          <FontAwesomeIcon icon={faHome} /> <Link to='/'>Home</Link>
        </section>
</div>
    </div>

    <div className="rightSide">
      <div>
        <h2 style={{textAlign:'center'}}>Access Dashboard</h2>
        <div className="access-table">
        <table id="user-table" className="user-table">
    
    <tr >
      <th >User</th>
      <th >Access To</th>
      <th >Access Status</th>
    </tr>


    {accessData.map((data, index) => (
      <tr key={index} >
        <td >{data.user}</td>
        <td >{data.accessTo}</td>
        <td >{data.accessStatus}</td>
      </tr>
    ))}

</table>
        </div>
      </div>
    </div>
</div>
  )
}

export default AllowingAccess
