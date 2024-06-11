import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import AdminleftSide from './AdminleftSide';
import axios from 'axios';

const UserValidation = () => {
  const [userData, setUserData] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [sortedColumn, setSortedColumn] = useState(null); 
  const [sortOrder, setSortOrder] = useState(' ');    

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

  const handleSort = (column) => {
    let order = 'asc';
    if (sortedColumn === column) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    setSortedColumn(column);
    setSortOrder(order);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const params={
          page:page,
          size:pageSize,
        }
        if (sortedColumn) {
          params.sortBy = sortedColumn;
          params.sortOrder = sortOrder;
        }
        const response = await axios.get('http://localhost:8082/api/jobbox/displayUsers', { params});
        
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
  }, [page,pageSize,sortOrder,sortedColumn]);

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
              <th onClick={() => handleSort('userName')}>
              User Name {sortedColumn === 'userName' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => handleSort('userRole')}>
                    User Role {sortedColumn === 'userRole' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => handleSort('userEmail')}>
                    User Email{sortedColumn === 'userEmail' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => handleSort('approvedOn')}>
                    Action Date{sortedColumn === 'approvedOn' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => handleSort('userStatus')}>
                    Status & Actions{sortedColumn === 'userStatus' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                
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
