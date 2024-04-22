import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DreamCompany = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowMessage(true);
  };

  return (
    <div className='apply-dream-company'>
      <div className="centered-container">
        <form action="/dream-comapny" onSubmit={handleSubmit} className="centered-form">
          <label htmlFor="companyName">Company Name:</label><br />
          <input type="text" id="companyName" name="companyName" required /><br /><br />
          <label htmlFor="resume">Resume:</label><br />
          <input type="file" id="resume" name="resume" required /><br /><br />
          <input type="submit" value="Apply" />
        </form>
       
      </div>
      {showMessage && (
        <div className="msg">
          <h1>Congratulations</h1>
          <h3> You successfully applied to your Dream Company </h3>
          <h3><Link to="/candiadte-dashboard"> Go to dashboard </Link></h3>
        </div>
         )}
     
    </div>
  );
};

export default DreamCompany;
