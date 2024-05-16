import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';
import { useHistory } from 'react-router-dom'; // Import useHistory from React Router

const FindCompany = () => {
    const [formData, setFormData] = useState({
        companyName: '',
    });
    const [modalMessageHR, setModalMessageHR] = useState('');
     const [modalMessageCompany, setModalMessageCompany] = useState('');
    const history = useHistory(); // Access the history object

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const BASE_API_URL = "http://localhost:8081/api/jobbox";

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${BASE_API_URL}/findCompany`, {
                params: {
                    companyName: formData.companyName
                }
            });

            if (response.data) {
                setModalMessageHR('Company already exists. Please register as HR.');
                // Navigate to HR registration page if company exists
                
            } else {
                setModalMessageCompany('Company not found. Please fill in company details.');
            }
        } catch (error) {
            console.error('Error searching company:', error);
        }
    };

    const closeModal = () => {
        setModalMessageHR('');
        setModalMessageCompany('');
    };
   const companyName= formData.companyName;
   console.log(companyName);
    return (
        <div className='container-div'>
            <form className="searchCompany">
                <div className='company-form'>
                    <label htmlFor="company">Company Name:</label>
                    <input 
                        type="text" 
                        id="companyName" 
                        name="companyName" 
                        value={formData.companyName} 
                        onChange={handleChange} 
                        required 
                    />
                    <button className="searchCompanyButton" onClick={handleSearch}>Search</button>
                </div>
            </form>
            {modalMessageHR && (
                <div className="modal1">
                    <div className="modal-content1">
                        <span className="close1" onClick={closeModal}>&times;</span>
                        <p>{modalMessageHR}</p>
                        {/* No need for Link component here */}
                        <button onClick={() =>history.push("/hr-registeration",{ companyName})} className="companyFormButton">HR</button>
                    </div>
                </div>
            )}
             {modalMessageCompany&& (
                <div className="modal1">
                    <div className="modal-content1">
                        <span className="close1" onClick={closeModal}>&times;</span>
                        <p>{modalMessageCompany}</p>
                        {/* No need for Link component here */}
                        <button onClick={() => history.push("/companies")} className="companyFormButton">Fill Company Form</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindCompany;
