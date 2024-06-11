import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './AdminDashboard.css';
import AdminleftSide from './AdminleftSide';
const AdminDashboard = () => {
  return (
    <div className='body'>
     

        <div className='leftside'>
          <AdminleftSide />
        </div>

        <div className="rightSide">
      <div>
        <h2>Admin Dashboard</h2>
      </div>

      <div className="adminDashboard">
        <span>
          <h2>5000+</h2>
          company validated
        </span>
        <span>
          <h2>20000+</h2>
          HR validated
        </span>
        <span>
          <h3>Allowing access to HR</h3>
          <h3>for Job Posting</h3>
        </span>
        <span>
          <h3>Allowing access to Candidate</h3>
          <h3>for Applying Jobs</h3>
        </span>
        <span>
          <h2>200+</h2>
          HR Blocked
        </span>
      </div>

      <div className="applyforValidation">
        <h4>Check for processing User validation!!</h4>
        <p>
            <Link to="/admin-action">Check</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard;
