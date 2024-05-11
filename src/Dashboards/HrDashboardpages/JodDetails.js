import React from 'react';

const JobDetails = ({ jobDetailsStr }) => {
  // Initialize jobDetails as an empty object
  let jobDetails = {};

  // Check if jobDetailsStr is a valid JSON string
  try {
    jobDetails = JSON.parse(jobDetailsStr) || {};
  } catch (error) {
    console.error('Error parsing job details:', error);
  }

  return (
    <div className="job-details-container">
      <h2>Job Details</h2>
      <p>Job Title: {jobDetails.setjobTitle}</p>
      {/* Check if jobDetails.others is defined before accessing properties */}
      {jobDetails.others?.applicationDeadline && (
        <p>Application Deadline: {jobDetails.others.applicationDeadline}</p>
      )}
      <p>Number of Positions: {jobDetails.others?.numberOfPositions}</p>
      <button>Post</button>
    </div>
  );
};

export default JobDetails;
