import React, { useEffect, useState } from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const UserValidation = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/jobbox/displayUsers');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

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
            <FaUniversalAccess /> <Link to="/allowing-access">Access</Link>
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
            <FaHome /> <Link to='/'>Home</Link>
          </section>
        </div>
      </div>

      <div className="rightSide">
        <div className='user-table-list'>
          <h2>Users List</h2>
          <table id="user-table" className="user-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>User Role</th>
                <th>User Email</th>
                <th>Action Date</th>
                <th>Status & Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map(user => (
                <tr key={user.userId}>
                  <td>{user.userName}</td>
                  <td>{user.userRole}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.approvedOn}</td>
                  <td>{user.userStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserValidation;
