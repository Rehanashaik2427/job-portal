import React, { useState } from 'react';
import Salary from './Salary';
import SetLocation from './SetLocation';

const Eligible = () => {
    const [eligibleCandidates, setEligibleCandidates] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [step, setStep] = useState(1);

    const handleSelectAllClick = () => {
        const eligibleCandidatesList = ['B.TECH & B.E(All Branches)', 'B.TECH & B.E(CSE , ECE , EEE,IT)', 'B.TECH & B.E(CSE , IT)', 'B.SC', 'M.TECH,B.TECH & B.E(All Branches)', 'MBA', 'MCA', 'OTHERS'];

        if (selectAll) {
            setEligibleCandidates([]);
        } else {
            setEligibleCandidates(eligibleCandidatesList);
        }
        setSelectAll(!selectAll);

        // Change background color of all checkboxes to skyblue
        const checkboxes = document.querySelectorAll('input[name="eligibleCandidates"]');
        checkboxes.forEach((checkbox) => {
            checkbox.parentElement.style.backgroundColor = !selectAll ? 'skyblue' : '';
        });
    };

    const handleCheckboxClick = (event) => {
        const candidate = event.target.value;
        if (event.target.checked) {
            setEligibleCandidates([...eligibleCandidates, candidate]);
        } else {
            setEligibleCandidates(eligibleCandidates.filter((item) => item !== candidate));
        }

        // Change background color of the clicked checkbox to skyblue
        event.target.parentElement.style.backgroundColor = event.target.checked ? 'skyblue' : '';
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const handleNext = () => {
        console.log('Selected Eligible Candidates:', eligibleCandidates);
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            // Log selected items to console
           
            // Navigate to Salary component
            // You can use conditional rendering to switch between components
            return <Salary />;
        }
    };

    if (step === 1) {
        return (
            <div>
                <div className='eligible-heading'>
                    <h2>Eligible Candidates</h2>
                    <p>Select Eligible Candidates</p>
                </div>
                <div className='eligible-list'>
                    
                        <div className='eligible-group-column'>
                            {['B.TECH & B.E(All Branches)', 'B.TECH & B.E(CSE , ECE , EEE,IT)', 'B.TECH & B.E(CSE , IT)', 'B.SC', 'M.TECH,B.TECH & B.E(All Branches)', 'MBA', 'MCA', 'OTHERS'].map((candidate) => (
                                <div className={`eligible-group ${eligibleCandidates.includes(candidate) ? 'selected' : ''}`} key={candidate}>
                                    <input type="checkbox" id={candidate} name="eligibleCandidates" value={candidate} onChange={handleCheckboxClick} checked={eligibleCandidates.includes(candidate)} />
                                    <label htmlFor={candidate}>{candidate}</label>
                                </div>
                            ))}
                        </div>
                 
                </div>
                <div className="center-button">
                    <button className="select-all" onClick={handleSelectAllClick}>
                        {selectAll ? 'Deselect All' : 'Select All'}
                    </button>
                </div>
                <div className='footer-buttons'>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
        );
    } else if (step === 2) {
        return <Salary />;
    } else {
        // Default case for step
        return <SetLocation />;
    }
};

export default Eligible;
