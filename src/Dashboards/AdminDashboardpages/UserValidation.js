import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import AdminleftSide from './AdminleftSide';

const UserValidation = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/jobbox/displayUsers');
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
          <AdminleftSide />
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
