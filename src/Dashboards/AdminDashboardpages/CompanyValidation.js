import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import AdminleftSide from './AdminleftSide';


const BASE_API_URL = "http://localhost:8082/api/jobbox";

const CompanyValidation = () => {

  const [companyData, setCompanyData] = useState([]);
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
  

 
  const fetchCompanyData = async () => {
    try {
      const params = {
        page: page,
        size: pageSize,
        sortBy :sortedColumn,
        sortOrder :sortOrder,

    };
      const response = await axios.get(`${BASE_API_URL}/displayCompanies`, { params });

      setCompanyData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSort = (column) => {
    let order = 'asc'; // Default sorting order is ascending
    if (sortedColumn === column && sortOrder === 'asc') {
      order = 'desc'; // If the same column is clicked again and it was already sorted in ascending order, switch to descending
    }
    setSortedColumn(column);
    setSortOrder(order);
  };
  

  useEffect(() => {
    fetchCompanyData();
  }, [page, pageSize, sortedColumn, sortOrder]);

  const currentTime = new Date().toLocaleString();
  const [approvalMessages, setApprovalMessages] = useState({});
  const approveCompany = async (companyId, companyName) => {
    console.log('Request Approved');
    try {
      const approved = "Approved";
      const res = await axios.put(`${BASE_API_URL}/updateApproveCompany?companyName=${companyName}&actionDate=${currentTime}&companyStatus=${approved}`);
      console.log(res.data);
      const updatedMessages = { ...approvalMessages, [companyId]: 'Approval successful' };
      setApprovalMessages(updatedMessages);
      fetchCompanyData();

      // If needed, update the state or perform additional actions after successful approval
    } catch (error) {
      console.log('Error approving request:', error);
      // Handle error here, e.g., show a notification to the user
    }
  };


  const [rejectMessages, setrejectMessages] = useState({});

  const rejectCompany = async (companyId, companyName) => {
    console.log('Request Rejected');
    try {
      const reject = "Rejected";
      const res = await axios.put(`${BASE_API_URL}/updateApproveCompany?companyName=${companyName}&actionDate=${currentTime}&companyStatus=${reject}`);
      console.log(res.data);
      const updatedMessages = { ...rejectMessages, [companyId]: 'Rejected Company' };
      setrejectMessages(updatedMessages);
      fetchCompanyData();

      // If needed, update the state or perform additional actions after successful approval
    } catch (error) {
      console.log('Error approving request:', error);
      // Handle error here, e.g., show a notification to the user
    }
  };


  return (
    <div className='body'>
      <div className='leftside'>
        <AdminleftSide />
      </div>

      <div className="rightSide">
        <h2 style={{ textAlign: 'center' }}>Details of Company Validation</h2>
        <div className='company-table'>
          <table className='company-table1'>

            <tr>
              <th onClick={() => handleSort('companyName')}>
                Company Name{sortedColumn === 'companyName' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th>Contact Number</th>
              <th> Company Email</th>
              <th >Industry</th>
              <th onClick={() => handleSort('location')}>Location{sortedColumn === 'location' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
              <th>Description</th>
              <th onClick={() => handleSort('date')}>Submit Date{sortedColumn === 'date' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
              <th>Status</th>
              <th onClick={() => handleSort('actionDate')}>Action Date{sortedColumn === 'actionDate' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
              <th>Actions</th>
            </tr>

            {companyData.map((company) => (
              <tr key={company.companyId}>
                <td>{company.companyName}</td>
                <td>{company.contactNumber}</td>
                <td>{company.companyEmail}</td>
                <td>{company.industry}</td>
                <td>{company.location}</td>
                <td>{company.discription}</td>
                <td>{company.date}</td>
                <td>{company.companyStatus}</td>
                <td>{company.actionDate}</td>
                <td>
                  <button className='approved'
                    onClick={() => approveCompany(company.companyId, company.companyName)}
                  >
                    Approved
                  </button>
                  /
                  <button className='reject'
                    onClick={() => rejectCompany(company.companyId, company.companyName)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

          </table>


        </div>
        <nav>
          <ul className='pagination'>
            <li>
              <button className='page-button' onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
            </li>
            {[...Array(totalPages).keys()].map((pageNumber) => (
              <li key={pageNumber} className={pageNumber === page ? 'active' : ''}>
                <button className='page-link' onClick={() => handlePageChange(pageNumber)}>{pageNumber + 1}</button>
              </li>
            ))}
            <li>
              <button className='page-button' onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default CompanyValidation
