import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import AdminleftSide from './AdminleftSide';
import axios from 'axios';

const UserValidation = () => {
  const [userData, setUserData] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/jobbox/displayUsers', {
            params: {
               page:page,
               size:pageSize
            }
        });
        
        if (response.status !== 200) {
            throw new Error('Failed to fetch user data');
        }
       
        setUserData(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [page,pageSize]);

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
        <nav>
        <ul className='pagination'>
          <li>
            <button className='page-button'  onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
          </li>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <li key={pageNumber} className={pageNumber === page ? 'active' : ''}>
              <button className='page-link'  onClick={() => handlePageChange(pageNumber)}>{pageNumber + 1}</button>
            </li>
          ))}
          <li>
            <button className='page-button'  onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );
};

export default UserValidation;
