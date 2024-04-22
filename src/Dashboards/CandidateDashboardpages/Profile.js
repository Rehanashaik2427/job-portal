import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';


const Profile = () => {
    const [educationList, setEducationList] = useState([]); // Array to store education details

    const handleAddForm = () => {
      setEducationList([...educationList, {
        collegeName: '',
        degree: '',
        yop: '',
        marks: '',
      }]);
    };
  

    const [experienceList, setExperienceList] = useState([]);

    const handleExperienceAddForm = () => {
      setExperienceList([...experienceList, {
        companyName: '',
        jobRole: '',
        yoj: '',
      }]);
    };
    const handleInputChange = (event, index) => {
      const updatedEducationList = [...educationList];
      updatedEducationList[index][event.target.name] = event.target.value;
      setEducationList(updatedEducationList);

      const updatedExperienceList = [...experienceList];
        updatedExperienceList[index][event.target.name] = event.target.value;
        setExperienceList(updatedExperienceList);
    };

    
  return (
    <div className="candidate-dashboard-container">
      <div className='left-side'>
        <nav id='logo'>
          <img src="https://jobbox.com.tr/wp-content/uploads/2022/12/jobbox-1-e1672119718429.png" alt="jobboxlogo" />
        </nav>
        <nav>
          <h2>Candidate Name</h2>
        </nav>
        <section id="dashboard">
          <FontAwesomeIcon icon={faHouse} /> <Link to="/candiadte-dashboard"> Dashboard</Link>
        </section>
        <section id="jobs">
          <FontAwesomeIcon icon={faLayerGroup} /> <Link to="/candiadte-jobs">Jobs</Link>
        </section>
        <section id="companies">
          <FontAwesomeIcon icon={faBuilding} /> <Link to="/candidate-companies"> Companies</Link>
        </section>
        <section id="my-application">
          <FontAwesomeIcon icon={faFileLines} /> <Link to="/my-application">My Application</Link>
        </section>
        <section id="my-resume">
          <FontAwesomeIcon icon={faFile} /> <Link to="/resume"> My Resume</Link>
        </section>
        <section id="my-profile">
          <FontAwesomeIcon icon={faUser} /> <Link to="/profile"> My Profile</Link>
        </section>
        <section id="payment">
          <FontAwesomeIcon icon={faMoneyCheckDollar} /> <Link to="/payment"> Payments/Credits</Link>
        </section>
        <section id="Home">
          <FontAwesomeIcon icon={faHome} /> <Link to="/"> Home</Link>
        </section> 
        <h3>Help</h3>
        <h3><Link to="../Jobbox_FrontPage/others.html">Contact us</Link></h3>
      </div>

      <div className='rightside'>
        <div className="search">
            <button><FontAwesomeIcon icon={faSearch} />search</button>
            <FontAwesomeIcon icon={faUser} id="user" className='icon'/>
        </div>

        <div>
      <div>
        <h2 > Personal Details</h2>
        <section className="candidate-details">
        <span>
                            <label for="Name">Name</label>
                            <h3>Candidate Name</h3>
                        </span>
                        <span>
                            <label for="Email">Email</label>
                            <h3>Candidate Email</h3>
                        </span>
                        <span>
                            <label for="Phno">Phno</label>
                            <h3>Candidate Phno</h3>
                        </span>
        </section>
      </div>
      <div>
        <h2> Education</h2>
        <section className="candidate-details">
        <span>
                        <label for="CollegeName">College Name</label>
                        <h3>College Name</h3>
                    </span>
                    <span>
                        <label for="degree">Degree</label>
                        <h3>Degree</h3>
                    </span>
                    <span>
                        <label for="yop">YOP</label>
                        <h3>YOP</h3>
                    </span>
                    <span>
                        <label for="marks">Marks</label>
                        <h3>marks</h3>
                    </span>
        </section>
        <div>

      {educationList.map((education, index) => (
        <section key={index} className="candidate-details">
          <span>
            <input
              type="text"
              placeholder="College Name"
              name="collegeName"
              value={education.collegeName}
              onChange={(e) => handleInputChange(e, index)}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="Degree"
              name="degree"
              value={education.degree}
              onChange={(e) => handleInputChange(e, index)}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="YOP"
              name="yop"
              value={education.yop}
              onChange={(e) => handleInputChange(e, index)}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="Marks"
              name="marks"
              value={education.marks}
              onChange={(e) => handleInputChange(e, index)}
            />
          </span>
        </section>
      ))}
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <Link to="#" onClick={handleAddForm}>
          Add another one
        </Link>
      </div>
    </div>
        
      </div>
      <div>
        <h2> Experience  </h2>
        <p>(If Any)</p>
        <section className="candidate-details">
        <span>
                        <label for="CompanyName">Company Name</label>
                        <h3>Company Name</h3>
                    </span>
                    <span>
                        <label for="role">Job Role</label>
                        <h3>Job Role</h3>
                    </span>
                    <span>
                        <label for="yoj">Joining Year</label>
                        <h3>YOJ</h3>
                    </span>
                    <span>
                        <label for="certificate">Certificate</label>
                        <h3>Certificate</h3>
                    </span>
          </section>
          </div>
          <div>
            {experienceList.map((experience, index) => (
            <section key={index} className="candidate-details">
            <span>
                <input
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={experience.companyName}
                onChange={(e) => handleInputChange(e, index)}
                />
            </span>

            <span>
                <input
                type="text"
                placeholder="Job Role"
                name="jobRole"
                value={experience.jobRole}
                onChange={(e) => handleInputChange(e, index)}
                />
            </span>
            <span>
                <input
                type="text"
                placeholder="YOJ"
                name="yoj"
                value={experience.yoj}
                onChange={(e) => handleInputChange(e, index)}
                />
            </span>
         
            </section>
        ))}
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Link to="#" onClick={handleExperienceAddForm}>
            Add another one
            </Link>
    </div>
</div>
    </div>
      </div>
    </div>
  )
}

export default Profile
