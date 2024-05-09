import React, { useState } from 'react';
import RequirementsAndSkills from './RequirementsAndSkills';
import SetLocation from './SetLocation';

const JobType = () => {
  const [selectedJobType, setSelectedJobType] = useState(''); // State to track selected job type as a string
  const [step, setStep] = useState(1);
  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    setSelectedJobType(id); // Set the selected type directly to the checkbox ID
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    console.log("job type :", selectedJobType); // Log the selected job type as a string
    if (step === 1) {
      setStep(2); // Move to the next step
    }
  };

  return (
    <div>
      {step === 1 && (
        <>
          <div className='jobtype-heading'>
            <h2>Job Type</h2>
            <p>Select JobType</p>
          </div>
          <div className="jobtype">
            <div className='jobtype-form'>
              <div className={`jobtype-group ${selectedJobType === 'internship' ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  id="internship"
                  name="jobType"
                  value="Internship"
                  checked={selectedJobType === 'internship'}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="internship">Internship</label>
              </div>
              <div className={`jobtype-group ${selectedJobType === 'contract' ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  id="contract"
                  name="jobType"
                  value="Contract"
                  checked={selectedJobType === 'contract'}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="contract">Contract</label>
              </div>
              <div className={`jobtype-group ${selectedJobType === 'fullTime' ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  id="fullTime"
                  name="jobType"
                  value="Full Time"
                  checked={selectedJobType === 'fullTime'}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="fullTime">Full Time</label>
              </div>
              <div className={`jobtype-group ${selectedJobType === 'freelancer' ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  id="freelancer"
                  name="jobType"
                  value="Freelancer"
                  checked={selectedJobType === 'freelancer'}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="freelancer">Freelancer</label>
              </div>
            </div>
          </div>

          <div className='footer-buttons'>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </>
      )}

      {step === 2 && <SetLocation />}
      {step === 0 && <RequirementsAndSkills />}
    </div>
  );
};

export default JobType;
