import React from 'react';

const JobType = () => {
  return (
    <div className="jobtype">
        <div className='jobtype-heading'>
            <h2>Job Type</h2>
            <p>Select JobType</p>
        </div>
      <form>
        <div className='jobtype-group'>
          <input type="checkbox" id="internship" name="jobType" value="Internship" />
          <label htmlFor="internship">Internship</label>
        </div>
        <div>
          <input type="checkbox" id="contract" name="jobType" value="Contract" />
          <label htmlFor="contract">Contract</label>
        </div>
        <div>
          <input type="checkbox" id="fullTime" name="jobType" value="Full Time" />
          <label htmlFor="fullTime">Full Time</label>
        </div>
        <div>
          <input type="checkbox" id="freelancer" name="jobType" value="Freelancer" />
          <label htmlFor="freelancer">Freelancer</label>
        </div>
        <div>
          <input type="checkbox" id="entryLevel" name="jobType" value="Entry Level & New Grad" />
          <label htmlFor="entryLevel">Entry Level & New Grad</label>
        </div>
        <div>
          <input type="checkbox" id="junior" name="jobType" value="Junior (1 to 2 years)" />
          <label htmlFor="junior">Junior (1 to 2 years)</label>
        </div>
        <div>
          <input type="checkbox" id="midLevel" name="jobType" value="Mid-level (3 to 4 years)" />
          <label htmlFor="midLevel">Mid-level (3 to 4 years)</label>
        </div>
        <div>
          <input type="checkbox" id="senior" name="jobType" value="Senior (5 to 8 years)" />
          <label htmlFor="senior">Senior (5 to 8 years)</label>
        </div>
        <div>
          <input type="checkbox" id="expert" name="jobType" value="Expert & Leadership (9+ years)" />
          <label htmlFor="expert">Expert & Leadership (9+ years)</label>
        </div>
      </form>
    </div>
  );
};

export default JobType;
