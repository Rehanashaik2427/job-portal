import React, { useEffect, useState } from 'react';
import RequirementsAndSkills from './RequirementsAndSkills'; // Import RequirementsAndSkills component

const JobTitles = () => {
    const initialTitles = ['SDE', "Full Stack Developer", ".Net Developer", "Java Developer", "Data Analyst", "SQL Developer", "UI/UX Designer", "Tester", "Service Now Developer", "Content writer", "Contact Support", "System Engineer", "Process Trainee", "Graduate Trainee"];
    const [jobTitles, setJobTitles] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [selectedTitle, setSelectedTitle] = useState([]); // Track selected title
    const [showInput, setShowInput] = useState(false);
    const [step, setStep] = useState(1); // Step state to manage the form steps
    const [showRequirements, setShowRequirements] = useState(false); // Manage visibility of RequirementsAndSkills component

    useEffect(() => {
        // Load job titles from localStorage on component mount
        const savedTitles = JSON.parse(localStorage.getItem('jobTitles')) || initialTitles;
        setJobTitles(savedTitles);
    }, [selectedTitle]);

    const handleAddTitle = () => {
        if (newTitle.trim() !== '') {
            const updatedTitles = [...jobTitles, newTitle];
            setJobTitles(updatedTitles);
            localStorage.setItem('jobTitles', JSON.stringify(updatedTitles)); // Save titles to localStorage
            setNewTitle('');
            setShowInput(false);
        }
    };

    const handleNext = () => {
        console.log('Selected Title:', selectedTitle); // Display selected title in the console
        if (step === 1 && selectedTitle !== '') {
            setStep(2); // Move to the next step when the "Next" button is clicked
            setShowRequirements(true); // Show RequirementsAndSkills component on Next button click
           
        }
    };

    const handleInputClick = (title) => {
        // Toggle selection of titles
        setSelectedTitle((prevTitle) => (prevTitle === title ? '' : title));
    };
    
    return (
        <div>
            {step === 1 && (
                <>
                    <div className='job-post-details'>
                        <h2 style={{ textAlign: 'center' }}>Job Title:</h2>
                        <p style={{ textAlign: 'center' }}>Select job title</p>
                    </div>
                    <div className="job-titles-container">
                        {jobTitles.map((title, index) => (
                            <span key={index}>
                                <input
                                    type="text"
                                    value={title}
                                    readOnly
                                    style={{ backgroundColor: selectedTitle === title ? 'skyblue' : '' }} // Apply skyblue background if selected
                                    onClick={() => handleInputClick(title)} // Handle input click
                                />
                            </span>
                        ))}
                        {showInput ? (
                            <span>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Enter new job title"
                                />
                                <button onClick={handleAddTitle}>Add Title</button>
                            </span>
                        ) : (
                            <span>
                                <button onClick={() => setShowInput(true)}>Click here to add job title</button>
                            </span>
                        )}
                    </div>

                    <div className='note'>
                        <p><strong>Note:</strong> If Job Title is not there, click the button above to add job title</p>
                    </div>

                    <div className='footer-buttons'>
                        <button className='selected' onClick={handleNext}>Next</button>
                    </div>
                </>
            )}

{step === 2 && showRequirements && (
        <div> {/* Wrap RequirementsAndSkills in a separate div */}
          <RequirementsAndSkills />
        </div>
      )}        </div>
    );
};

export default JobTitles;
