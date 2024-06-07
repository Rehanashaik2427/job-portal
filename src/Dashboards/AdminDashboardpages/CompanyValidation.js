import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import AdminleftSide from './AdminleftSide';


const BASE_API_URL="http://localhost:8082/api/jobbox";

const CompanyValidation = () => {

  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/displayCompanies`);
      if (!response.ok) {
        throw new Error('Failed to fetch company data');
      }
      const data = await response.json();
      setCompanyData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const currentTime = new Date().toLocaleString();
  const [approvalMessages, setApprovalMessages] = useState({});
  const approveCompany = async (companyId,companyName) => {
    console.log('Request Approved');
    try {
      const approved="Approved";
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
  
  const rejectCompany = async (companyId,companyName) => {
    console.log('Request Rejected');
    try {
      const reject="Rejected";
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
        <h2 style={{textAlign:'center'}}>Details of Company Validation</h2>
        <div className='company-table'>
        <table className='company-table1'>
  
    <tr>
      <th>Company Name</th>
      <th>Contact Number</th>  
      <th>Company Email</th>
      <th>Industry</th>
      <th>Location</th>
      <th>Description</th>
      <th>Submit Date</th>
      <th>Status</th>
      <th>Action Date</th>
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
            onClick={() => approveCompany(company.companyId,company.companyName)}
          >
            Approved
          </button>
          /
          <button className='reject'
             onClick={() => rejectCompany(company.companyId,company.companyName)}
          >
            Reject
          </button>
        </td>
      </tr>
    ))}
  
</table>


        </div>
     
      </div>
</div>
  )
}

export default CompanyValidation
