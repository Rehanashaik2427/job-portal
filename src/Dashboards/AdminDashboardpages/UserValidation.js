import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import AdminleftSide from './AdminleftSide';

const UserValidation = () => {
  const [userData, setUserData] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [sortedColumn, setSortedColumn] = useState(null); // Track the currently sorted column
  const [sortOrder, setSortOrder] = useState(' '); // Track the sort order (asc or desc)

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
        const params = {
          page: page,
          size: pageSize,
          sortBy :sortedColumn,
          sortOrder :sortOrder,
  
      };
        const response = await axios.get('http://localhost:8082/api/jobbox/displayUsers', { params });
       
        setUserData(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUserData();
  }, [page,pageSize, sortedColumn, sortOrder]);

  const handleSort = (column) => {
    let order = 'asc'; // Default sorting order is ascending
    if (sortedColumn === column && sortOrder === 'asc') {
      order = 'desc'; // If the same column is clicked again and it was already sorted in ascending order, switch to descending
    }
    setSortedColumn(column);
    setSortOrder(order);
  };
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
                <th onClick={() => handleSort('userName')}>User Name{sortedColumn === 'userName' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                <th >User Role</th>
                <th onClick={() => handleSort('userEmail')}>User Email{sortedColumn === 'userEmail' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('approvedOn')}>Action Date{sortedColumn === 'approvedOn' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                <th>Status & Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map(user => (
                <tr key={user.userId}>
                  <td>{user.userName}</td>
                  <td>{user.userName}</td>
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
