import { faAddressCard, faBriefcase, faHome, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from "react-router-dom";
import './HrDashboard.css';

const HrDashboard = () => {


//   useEffect(() => {
//     const ctx = document.getElementById('myChart');
//     if (ctx) {
//       // Check if a chart instance already exists and destroy it
//       if (chartRef.current) {
//         chartRef.current.destroy();
//       }

//       const myChart = new Chart(ctx, {
//         type: 'pie',
//         data: {
//           labels: ['Posting Jobs', 'Total Applications', 'Shortlisted Candidates', 'Activities', 'Active Status'],
//           datasets: [{
//             label: 'Data',
//             data: [1000, 3000, 200, 1000, 500],
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(255, 206, 86, 0.2)',
//               'rgba(75, 192, 192, 0.2)',
//               'rgba(153, 102, 255, 0.2)',
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 1)',
//             ],
//             borderWidth: 2
//           }]
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           title: {
//             display: true,
//             text: 'Job Dashboard Data'
//           }
//         }
//       });

//       // Save the chart instance to the ref for future reference
//       chartRef.current = myChart;
//     }
//   }, []);

  return (
    <div className='candidate-dashboard-container'>
      <div className='hr-leftside'>
        <nav id='logo'>
          <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>
        <nav>
          <h2>HR Name</h2>
        </nav>   
        <section id="hr-dashboard">
          <FontAwesomeIcon icon={faHouse} /> <Link to="/hr-dashboard"> Dashboard</Link>
        </section>
        <section>
          <FontAwesomeIcon icon={faBriefcase} /> <Link to='/post-jobs'>Jobs</Link>
        </section>
        <section>
          <FontAwesomeIcon icon={faAddressCard} /> <Link to='/hr-applications'>Applications</Link>
        </section>
        <section>
          <FontAwesomeIcon icon={faBriefcase} /> <Link to='/posted-jobs'>Posted Jobs</Link>
        </section>
        <section>
          <FontAwesomeIcon icon={faUsers} /> <Link to='/people'>People</Link>
        </section>
        <section>
          <FontAwesomeIcon icon={faUser} /> <Link to='/hr-profile'>Profile</Link>
        </section>
        <section>
          <FontAwesomeIcon icon={faHome} /> <Link to='/'>Home</Link>
        </section>
      </div>
      <div className='hr-rightside'>
        <div className="content">
            <div className="box-container">

                {/* First row - first box */}
                <div className="box">
                    <h2>Jobs</h2>
                    <h4 style={{ alignContent: 'center' }}>1000+jobs</h4>
                    <img src="https://cdn-icons-png.flaticon.com/128/3688/3688609.png" className="animated-icons" alt="Jobs Icon" />
                    <p>Everyday 100+ jobs are posted by us</p>
                </div>

                {/* First row - second box */}
                <div className="box">
                    <h2>Total Applications</h2>
                    <img src="https://cdn-icons-png.flaticon.com/128/942/942748.png" className="animated-icons" alt="Applications Icon" />
                    <p >Total Applications count 200+</p>
                </div>

                {/* Second row - first box */}
                <div className="box">
                    <h2>Shortlisted candidates</h2>
                    <img src="https://cdn-icons-png.flaticon.com/128/11356/11356039.png" className="animated-icons" alt="Candidates Icon" />
                    <p>click here to see <a href="#">list of candidates</a></p>
                </div>

                  {/* Second row - second box */}
                <div className="box">
                    <h2>Activities</h2>
                        <img src="https://cdn-icons-png.flaticon.com/128/15597/15597760.png" className="animated-icons" alt="Activities Icon" />
                        <table>
                            <tr>
                                <td>Posting jobs</td>
                                <td >1000+</td>
                            </tr>
                            <tr>
                                <td>Total Applications</td>
                                <td >3000+</td>
                            </tr>
                            <tr>
                                <td>Shortlisted-Candidates</td>
                                <td >200+</td>
                            </tr>
                        </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HrDashboard;
