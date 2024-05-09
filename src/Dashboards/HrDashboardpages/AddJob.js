import React, { useState } from 'react';
import JobTitles from './JobTitles';
import JobType from './JobType';
import RequirementsAndSkills from './RequirementsAndSkills';
import SetLocation from './SetLocation';

const AddJob = () => {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Job details:', { jobTitle });
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

  
  const handleBack = () => {
    setStep(step - 1); // Go back a step in the parent component
  };

  const handleNext = () => {
    setStep(step + 1); // Move to the next step in the parent component
  };


  return (
    <div className="add-job-container">
      {step === 1 && (
        <div className='job-post-details'>
          <form onSubmit={handleSubmit}>
            <JobTitles onSelect={handleJobTitleSelect} />
            <div className='footer-buttons'>
           
            </div>
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
          {step === 3 && (
        <div className='job-post-details'>
          <SetLocation step={step} setStep={setStep} />
          {/* Include other job details input fields */}
        </div>
      )}
    </div>
  );
};

export default AddJob;
