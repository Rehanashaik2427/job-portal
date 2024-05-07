import React, { useState } from 'react';
import JobTitles from './JobTitles';
const AddJob = () => {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Job details:', { jobTitle });
    // Reset form fields after submission
    setJobTitle('');
    // Reset step to 1 after form submission
    setStep(1);
  };

  const handleJobTitleSelect = (title) => {
    setJobTitle(title);
    setStep(2); // Move to the next step after selecting a job title
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className='job-post-details'>
           
            <JobTitles onSelect={handleJobTitleSelect} />
          </div>
        );
      case 2:
        return (
          <div className='job-post-details'>
            <h2 style={{ textAlign: 'center' }}>Job Details:</h2>
            <p>Selected Job Title: {jobTitle}</p>
            {/* Include other job details input fields */}
            <button type="submit">Submit Job</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="add-job-container">
      <form onSubmit={handleSubmit}>
        {renderStep()}
      </form>
    </div>
  );
};

export default AddJob;
