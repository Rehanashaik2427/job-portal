import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FaBuilding, FaComments, FaHome, FaPlus, FaUniversalAccess, FaUser, FaUserCheck, FaUserLock } from 'react-icons/fa'; // Import the icons you need from React Icons
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';
import { useState,useEffect } from 'react';
import axios from 'axios';


const BASE_API_URL="http://localhost:8080/api/jobbox";

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
     
      // If needed, update the state or perform additional actions after successful approval
    } catch (error) {
      console.log('Error approving request:', error);
      // Handle error here, e.g., show a notification to the user
    }
  };


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
