import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Companies = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactNumber: '',
    companyEmail: '',
    industry:'',
    location: '',
    date: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`http://localhost:9090/api/companies/check?companyName=${formData.companyName}`);
    //const data = await response.json();
  
    if (response.ok) {
      // Company does not exist, proceed with form submission
      try {
        const submissionResponse = await fetch("http://localhost:9090/api/companies/company", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (submissionResponse.ok) {
          console.log("Company added");
          setSuccessMessage('Company details submitted successfully!');
          setFormData({
            companyName: '',
            contactNumber: '',
            companyEmail: '',
            industry: '',
            location: '',
            date: '',
          });
        } else {
          throw new Error('Failed to add company');
        }
      } catch (error) {
        console.error("Error adding company:", error);
        setErrorMessage(formData.companyName + ' company already exists'+<Link to='/hr-registeration'>please fill ur details here</Link>);

      }
    } 
   
  };
  


  return (
    <div className="comapny-container">
      <h2>Company Details</h2>

      <form id="companyForm" onSubmit={handleSubmit}>
        <input type="hidden" id="redirectToError" value="false" />
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="tel"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />

        <label htmlFor="companyEmail">Company Email:</label>
        <input
          type="email"
          id="companyEmail"
          name="companyEmail"
          value={formData.companyEmail}
          onChange={handleChange}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />


        <label htmlFor="industry">Industry:</label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
        />

        <label htmlFor="date">DateTime:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Submit" />

        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Companies;
