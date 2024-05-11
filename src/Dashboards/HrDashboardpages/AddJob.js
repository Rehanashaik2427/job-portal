import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Eligible from './Eligibile';
import JobTitles from './JobTitles';
import JobType from './JobType';
import Others from './Others';
import RequirementsAndSkills from './RequirementsAndSkills';
import Salary from './Salary';
import SetLocation from './SetLocation';

const AddJob = () => {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDetails, setJobDetails] = useState({
    jobTitle: JobTitles,
    requirementsAndSkills: RequirementsAndSkills,
    jobType:JobType,
    location: Location,
    Eligible:Eligible,
    salary: Salary,
    others:Others
  });
  const history = useHistory();

  const handleAddJob = (newJobDetails) => {
    
    setJobDetails({ ...jobDetails, ...newJobDetails });
    // Add your job submission logic here, potentially using an API call
    console.log("Final Job Details:", JSON.stringify(jobDetails));

    // Navigate to JobDetails with job details as JSON string
    history.push('/job-details', JSON.stringify(jobDetails));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Job details:', jobTitle);
    // Reset form fields after submission
    setJobTitle('');
    // Move to the next step after form submission
    setStep(2);
  };

  const handleJobTitleSelect = (title) => {
    setJobTitle(title);
    // Move to the next step after selecting a job title
    setStep(2);
  };

  return (
    <div className="add-job-container">
      {step === 1 && (
        <div className='job-post-details'>
          <form onSubmit={handleSubmit}>
            <JobTitles onSelect={handleJobTitleSelect} />
            {/* Include other job details input fields */}
          </form>
        </div>
      )}
      {step === 2 && (
        <div className='job-post-details'>
          <RequirementsAndSkills step={step} setStep={setStep} />
          {/* Include other job details input fields */}
        </div>
      )}

      {step === 3 && (
        <div className='job-post-details'>
          <JobType step={step} setStep={setStep} />
          {/* Include other job details input fields */}
        </div>
      )}
      {step === 4 && (
        <div className='job-post-details'>
          <SetLocation step={step} setStep={setStep} />
          {/* Include other job details input fields */}
          <Others addJob={handleAddJob} />
        </div>
      )}
    </div>
  );
};

export default AddJob;
