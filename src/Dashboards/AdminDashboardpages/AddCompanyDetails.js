import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';
import AdminleftSide from './AdminleftSide';
import axios from 'axios';

const AddCompanyDetails = () => {


  const BASE_API_URL="http://localhost:8082/api/jobbox";



  const [companyData, setCompanyData] = useState([]);

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
    fetchCompanyData();
  }, [page,pageSize]);

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/displayCompanies?page=${page}&size=${pageSize}`);
      // if (!response.ok) {
      //   throw new Error('Failed to fetch company data');
      // }
     
      setCompanyData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='body'>
          <div className='leftside'>
          <AdminleftSide />
        </div>

    <div className="rightSide">
      <h2>Add Company Details</h2>

      <div className="addDetails">
        <table>
          <tr>
            <th>Company Name</th>
            <th>Add Detail</th>
          </tr>

          {companyData.map((company) => (
      <tr key={company.companyId}>
            <td>{company.companyName}</td>
            <td><Link to={{
          pathname: '/companyDetailsByAdmin',
          state: { companyName:company.companyName }
        }}>ADD</Link></td>
          </tr>
              
            ))}
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
  )
}

export default AddCompanyDetails
