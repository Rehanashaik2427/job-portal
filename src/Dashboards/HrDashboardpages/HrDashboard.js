import React from 'react';
import { Link } from "react-router-dom";

const HrDashboard = () => {
  return (
    <div className='hr-dashboard-container'>
        <div className='hr-leftside'>
            <nav id='logo'>
            <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
            </nav>

            <nav>
                <h2>HR Name</h2>
            </nav>

            <section>
                <Link to='/hr-applications'>Applications</Link>
            </section>

        </div>

        <div className='hr-rightside'>

        </div>
        
    </div>
  )
}

export default HrDashboard
