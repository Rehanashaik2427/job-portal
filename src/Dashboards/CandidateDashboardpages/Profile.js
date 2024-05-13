import { faBuilding, faFile, faFileLines, faHome, faHouse, faLayerGroup, faMoneyCheckDollar, faSearch, faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './CandidateDashboard.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import CandidateLeftSide from './CandidateLeftSide';


const Profile = () => {

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };


  const location = useLocation();
  const userName=location.state?.userName;
  const userEmail=location.state?.userEmail;
    const [educationList, setEducationList] = useState([]); // Array to store education details
    const [currentSection, setCurrentSection] = useState(0);
    const [formData, setFormData] = useState(() => {
      const storedData = localStorage.getItem('profileFormData');
      return storedData ? JSON.parse(storedData) : {
        candidateName: '',
        candidateEmail: '',
        candidatePhno: '',
      };
    });
  
    useEffect(() => {
      localStorage.setItem('profileFormData', JSON.stringify(formData));
    }, [formData]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    

    const handleNext = () => {
      setCurrentSection(currentSection + 1);
    };

    const handleBack = () => {
      setCurrentSection(currentSection - 1);
    };

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

    const renderPersonalDetails = () => {
      return (
        <div>
        <h2>Personal Details</h2>
        <section className="candidate-details">
          <div className="input-group">
            <label htmlFor="Name">Name :</label>
            <input type="text" placeholder="Candidate Name" name="candidateName" value={formData.candidateName} onChange={handleChange} required/>
          </div>
      
          <div className="input-group">
            <label htmlFor="Email">Email :</label>
            <input type="email" placeholder="Candidate Email" name="candidateEmail" value={formData.candidateEmail} onChange={handleChange} required/>
          </div>
      
          <div className="input-group">
            <label htmlFor="Phno">Phone Number :</label>
            <input type="text" placeholder="Candidate Phno" name="candidatePhno" value={formData.candidatePhno} onChange={handleChange} maxLength={10} required/>
          </div>
      
          <button onClick={handleNext}>Next</button>
        </section>
      </div>
      
      );
    };
    
  
    const renderEducation = () => {
      return (
        <div>
          <h2>Education</h2>
          <div>
            <section className="candidate-details">
              <div className="input-group">
                <label htmlFor="CollegeName">College Name :</label>
                <input type="text" placeholder="College Name" name="collegeName" value={formData.collegeName} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="degree">Degree :</label>
                <input type="text" placeholder="Degree" name="degree" value={formData.degree} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="yop">YOP :</label>
                <input type="text" placeholder="YOP" name="yop" value={formData.yop} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="marks">Marks :</label>
                <input type="text" placeholder="Marks" name="marks" value={formData.marks} onChange={handleChange} />
              </div>
            </section>
    
            <div  className='next-back'>
              <button onClick={handleBack}>Back</button>
              <button onClick={handleNext}>Next</button>
            </div>
    
            <div>
              {educationList.map((education, index) => (
                <section key={index} className="candidate-details">
                  <span>
                    <label htmlFor="CollegeName">College Name :</label>
                    <input type="text" placeholder="College Name" name="collegeName" value={education.collegeName} onChange={(e) => handleInputChange(e, index)} />
                  </span>
                  <span>
                  <label htmlFor="degree">Degree :</label>
                    <input type="text" placeholder="Degree" name="degree" value={education.degree} onChange={(e) => handleInputChange(e, index)} />
                  </span>
                  <span>
                    <label htmlFor="yop">YOP :</label>
                    <input type="text" placeholder="YOP" name="yop" value={education.yop} onChange={(e) => handleInputChange(e, index)} />
                  </span>
                  <span>
                    <label htmlFor="marks">Marks :</label>
                    <input type="text" placeholder="Marks" name="marks" value={education.marks} onChange={(e) => handleInputChange(e, index)} />
                  </span>
                </section>
              ))}
              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <Link to="#" onClick={handleAddForm}>
                  Add another one
                </Link>
              </div>
              {/* <div  className='next-back'>
              <button onClick={handleBack}>Back</button>
              <button onClick={handleNext}>Next</button>
            </div> */}
            </div>
          </div>
        </div>
      );
    };
    
  
    const renderExperience = () => {
      return (
        <div>
          <h2>Experience </h2>
          
          <div>
            
            <section className="candidate-details">
              <div className="input-group">
                <label htmlFor="CompanyName">Company Name :</label>
                <input type="text" placeholder="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="role">Job Role :</label>
                <input type="text" placeholder="Job Role" name="jobRole" value={formData.jobRole} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="yoj">Joining Year :</label>
                <input type="text" placeholder="Joining Year" name="yoj" value={formData.yoj} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="certificate">Certificate :</label>
                <input type="text" placeholder="Certificate" name="certificate" value={formData.certificate} onChange={handleChange} />
              </div>
            </section>
          </div>
          <div className='next-back'> <button onClick={handleBack}>Back</button></div>
          <div>
            {experienceList.map((experience, index) => (
              <section key={index} className="candidate-details">
                <div className="input-group">
                  <label htmlFor="CompanyName">Company Name :</label>
                  <input type="text" placeholder="Company Name" name="companyName" value={experience.companyName} onChange={(e) => handleInputChange(e, index)} />
                </div>
                <div className="input-group">
                  <label htmlFor="role">Job Role :</label>
                  <input type="text" placeholder="Job Role" name="jobRole" value={experience.jobRole} onChange={(e) => handleInputChange(e, index)} />
                </div>
                <div className="input-group">
                  <label htmlFor="yoj">Joining Year :</label>
                  <input type="text" placeholder="Joining Year" name="yoj" value={experience.yoj} onChange={(e) => handleInputChange(e, index)} />
                </div>
              </section>
            ))}
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <Link to="#" onClick={handleExperienceAddForm}>
                Add another one
              </Link>
            </div>
          </div>
         
        </div>
      );
    };
    
  
    const renderSection = () => {
      switch (currentSection) {
        case 0:
          return renderPersonalDetails();
        case 1:
          return renderEducation();
        case 2:
          return renderExperience();
        default:
          return null;
      }
    };
  
    const user = {
      userName: userName,
      
       userEmail: userEmail,
     };
  
    return (
      <div className='candidate-dashboard-container'>
      <div className='left-side'>
     <CandidateLeftSide user={user} />
   </div>

      <div className='rightside'>
        <div className="top-right-content">
        <div className="top-right-content">
          <div className="candidate-search">
            <input type='text' placeholder='serach'></input>
            <button>
              <FontAwesomeIcon icon={faSearch} className='button' style={{color:'skyblue'}}/>
            </button>
            <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{color:'black'}} onClick={toggleSettings}/></div>
          
          </div>
         
    
        </div>
        {showSettings && (
        <div id="settings-container">
          {/* Your settings options here */}
          <ul>
            <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/"> Sing out</Link></li>
            <li>Setting 2</li>
            {/* Add more settings as needed */}
          </ul>
        </div>
      )}
        {renderSection()}
      
     
    </div>
      </div>
    </div>
  )
}

export default Profile
