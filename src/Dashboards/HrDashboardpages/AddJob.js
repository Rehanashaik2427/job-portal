import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";




const BASE_API_URL="http://localhost:8080/api/jobbox";
const AddJob=()=>{

    const history=useHistory();

 const location = useLocation();
      const userEmail = location.state?.userEmail;
      
      console.log(userEmail)
   

      const [userData, setUserData] = useState();
      const [userId, setUserId] = useState();
      const [userName, setUserName] = useState();
      const [companyName, setCompanyName] = useState();

      const fetchUserData = async (userEmail) => {
        try {
            const response = await axios.get(`${BASE_API_URL}/getHrByEmail`, {
                params: {
                  userEmail: userEmail
                }
              });

              console.log(response.data);
              
              setUserId(response.data.userId);
              setUserName(response.data.userName);
              setCompanyName(response.data.companyName);
              
          setUserData(response.data);
          
        } catch (error) {
          
          setUserData(null);
        }
      };
    
      useEffect(() => {
       
          fetchUserData(userEmail);
        
      }, [userEmail]);

      console.log(userData);

      console.log(userId);
      console.log(userName);
      console.log(companyName);

      const hrId=userId;
      const hrName=userName;
      const company=companyName;

      console.log(hrId);
      console.log(hrName);
      console.log(company);

    



      const [jobDetails, setJobDetails] = useState({
        hrId: hrId,
        hrName: hrName,
        hrEmail: userEmail,
        companyName: company,
        jobTitle: '',
        jobType: '',
        eligibility: '',
        applicationDeadline: '',
        location: '',
        requirements: '',
        numberOfPosition: '',
        experience: '',
        salary: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails((prevJobDetails) => ({
          ...prevJobDetails,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Job details submitted:', jobDetails);
        try {
            const response = await axios.post(`${BASE_API_URL}/postingJob`, jobDetails);
          console.log('Job details submitted:', response.data);
          // Reset the form after successful submission
          setJobDetails({
            hrId: '',
            hrName: "",
            hrEmail: '',
            companyName: '',
            jobTitle: '',
            jobType: '',
            eligibility: '',
            applicationDeadline: '',
            location: '',
            requirements: '',
            numberOfPosition: '',
            experience: '',
            salary: '',
          });
          history.push("/post-jobs",{userEmail},{userName})

        } catch (error) {
          console.error('Error posting job details:', error);
        }
      };

return(


    <div className='hr-job-posting-form'>
          <h2 style={{textAlign:'center'}}>Post a Job</h2>
          <form className='hr-job-posting-form' onSubmit={handleSubmit}>
            {/* <div className='job-details'>
              <label htmlFor='hrId'>HR ID: <input type='text' id='hrId' name='hrId' value={jobDetails.hrId} onChange={handleChange} required/></label>
              <label htmlFor='hrName'>HR Name: <input type='text' id='hrName' name='hrName' value={jobDetails.hrName} onChange={handleChange} required/></label>
              <label htmlFor='companyName'>Company Name: <input type='text' id='companyName' name='companyName' value={jobDetails.companyName} onChange={handleChange} required/></label>
            </div> */}
            <div className='job-details'>
              <label htmlFor='title'>Job Title: <input type='text' id='title' name='jobTitle' value={jobDetails.jobTitle} onChange={handleChange} required /></label>
              <label htmlFor='jobType'>Job Type:<br/> 
                <select id='jobType' name='jobType' value={jobDetails.jobType} onChange={handleChange} required>
                  <option value=''>Select Job Type</option>
                  <option value='FullTime'>Full Time</option>
                  <option value='PartTime'>Part Time</option>
                  <option value='Contract'>Contract</option>
                  <option value='Intern'>Intern</option>
                  <option value='Freelancer'>Freelancer</option>
                </select>
              </label>
              <label htmlFor='eligibility'>Eligibility: <input type='text' id='eligibility' name='eligibility' value={jobDetails.eligibility} onChange={handleChange} required /></label>
            </div>
            <div className='job-details'>
              <label id='applicationdate' htmlFor='applicationDeadline' >Application Deadline: <br/><input type='date' className='date' id='applicationDeadline' name='applicationDeadline' value={jobDetails.applicationDeadline} onChange={handleChange} required /></label>
              <label htmlFor='location'>Location: <input type='text' id='location' name='location' value={jobDetails.location} onChange={handleChange} required /></label>
              <label htmlFor='requirements'>Requirements/Skills:<br/> <textarea id='requirements' name='requirements' value={jobDetails.requirements} onChange={handleChange} required /></label>
            </div>
            <div className='job-details'>
              <label htmlFor='openings'>Openings:<br/> <input type='number' id='openings' name='numberOfPosition' value={jobDetails.openings} onChange={handleChange} required /></label>
              <label htmlFor='experience'>Experience: <input type='text' id='experience' name='experience' value={jobDetails.experience} onChange={handleChange} required /></label>
              <label htmlFor='salary'>Salary: <input type='text' id='salary' name='salary' value={jobDetails.salary} onChange={handleChange} required /></label>
            </div>
            <div className='job-button'>
              <button type="submit">Post</button>
            </div>
          </form>
        </div>
)

};
export default AddJob;