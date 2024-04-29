import React, { useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const BASE_API_URL = "http://localhost:8080/api/jobbox";

=======
import companyService from '../Services/company.service';
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
const Companies = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactNumber: '',
    companyEmail: '',
    industry:'',
    location: '',
<<<<<<< HEAD
    discription: '', // Corrected typo
    industry: '',
    date: '',
=======
    dateTime: '',
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
<<<<<<< HEAD
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_API_URL}/saveCompany`, formData);
      console.log('Company details submitted:', response.data);

      // Display success message with potential backend data (if applicable)
      setSuccessMessage(`Company details submitted successfully! ${response.data?.message || ''}`);  // Check for backend message

=======

  const saveCompanyDetails = (e) => {
    e.preventDefault();

    companyService.saveCompany(formData).then((res) => {
      setSuccessMessage('Company details submitted successfully!');
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
      // Clear form data
      setFormData({
        companyName: '',
        contactNumber: '',
        companyEmail: '',
<<<<<<< HEAD
        location: '',
        discription: '',
        industry: '',
        date: '',
      });
      history.push('/hr-registeration')
    } catch (error) {
      console.error('Error during submission:', error);
      alert('An error occurred during submission. Please try again later.'); // Generic error message
    }
=======
        industry:'',
        location: '',
        dateTime: '',
      });
      console.log(formData);
    }).catch((error) => {
      console.log(error);
    });
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
  };

  return (
    <div className="company-container">
      <h2>Company Details</h2>
<<<<<<< HEAD

      <form id="companyForm" onSubmit={handleSubmit}>
      
=======
      
      <form id="companyForm" onSubmit={saveCompanyDetails}>
        <input type="hidden" id="redirectToError" value="false" />
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
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

<<<<<<< HEAD
<label htmlFor="industry">Industry:</label>
=======
        <label htmlFor="industry">Industry:</label>
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
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

<<<<<<< HEAD
<label htmlFor="discription">Description:</label>
        <input
          type="text"
          id="description"
          name="discription"
          value={formData.discription}
          onChange={handleChange}
        />

        <label htmlFor="date">DateTime:</label>
=======
        <label htmlFor="dateTime">Date and Time:</label>
>>>>>>> 6b17a2a43d049a6e99c4904b6dcf9d968d79be08
        <input
          type="datetime-local"
          id="dateTime"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Submit" />

        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Companies;
