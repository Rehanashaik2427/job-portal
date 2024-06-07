import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';
import AdminleftSide from './AdminleftSide';

const AddCompanyDetails = () => {


  const BASE_API_URL="http://localhost:8082/api/jobbox";



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
    </div>
</div>
  )
}

export default AddCompanyDetails
