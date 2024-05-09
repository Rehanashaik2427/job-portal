import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";
import Salary from './Salary';
const Others = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [positions, setPositions] = useState(0);
    const [step, setStep] = useState(1);
    const [salary, setSalary] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handlePositionsChange = (e) => {
        setPositions(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here, including the selectedDate and positions values
        console.log("positions", positions);
        console.log("due date", selectedDate)
        // Assuming you want to go to step 0 after form submission
        // Add the job details to the Jobs component
        // const jobDetails = {
        //     jobId: 1, // Assuming you have a way to generate a unique job ID
        //     jobTitle: 'Your Job Title',
        //     jobType: 'Your Job Type',
        //     location: 'Your Location',
        //     requirements: 'Your Requirements',
        //     eligibility: 'Your Eligibility',
        //     numberOfPosition: positions,
        //     salary: 'Your Salary',
        //     applicationDeadline: selectedDate ? selectedDate.toLocaleDateString() : 'N/A', // Format date if selected
        // };
        // addJob(jobDetails);

        setShowSuccessMessage(true); // Show success message
    };

    const handleBack = () => {
        setStep(0);
        setSalary(true);
    };

    return (
        <div>
            {step === 1 && (
                <div className='others'>
                    <h2>Other Details</h2>
                    <div onSubmit={handleSubmit}>
                        <div className='positions'>
                            <h3>Number of Positions</h3>
                            <p>Add how many vacancies are there</p>
                            <label htmlFor="positions"></label>
                            <strong>Number of Positions:</strong><input
                                type="number"
                                id="positions"
                                name="positions"
                                min="0"
                                max="300"
                                value={positions}
                                onChange={handlePositionsChange}
                            />
                        </div>
                        <div className='deadline'>
                            <h3>Application Deadline</h3>
                            <p>Add Due date to apply job</p>
                            <div className="form-group">
                                <label htmlFor="dateInput"></label>
                                <strong>Select Date:</strong><DatePicker
                                    id="dateInput"
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy" // You can customize the date format here
                                    placeholderText="Select date"
                                />
                            </div>
                        </div>
                        <div className='footer-buttons'>
                            <button onClick={handleBack}>Back</button>
                        </div>

                        <div className='post-button' onClick={handleSubmit}>
                            <button type="submit" style={{ backgroundColor: 'skyblue' }}>Post</button>
                        </div>
                    </div>
                    {showSuccessMessage && (
                        <div className="success-message">
                            <p>Successfully Posted!</p>
                            <Link to="/post-jobs">Click here to go to dashboard</Link>
                        </div>
                    )}
                </div>
            )}

            {step === 0 && <Salary />}
        </div>
    );
};

export default Others;
