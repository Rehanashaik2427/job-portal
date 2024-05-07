import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from React Router

const JobTitles = () => {
    const history = useHistory(); // Access the history object
    const initialTitles = ['SDE', "Full Stack Developer", ".Net Developer", "Java Developer", "Data Analyst", "SQL Developer", "UI/UX Designer", "Tester", "Service Now Developer", "Content writer", "Contact Support", "System Engineer", "Process Trainee", "Graduate Trainee"];
    const [jobTitles, setJobTitles] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(null); // Track selected title

    useEffect(() => {
        // Load job titles from localStorage on component mount
        const savedTitles = JSON.parse(localStorage.getItem('jobTitles')) || initialTitles;
        setJobTitles(savedTitles);
    }, []);

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
        history.push('/requirements-and-skills'); // Navigate to Requirements and Skills page
    };

    const handleInputClick = (title) => {
        setSelectedTitle(title); // Update selected title
    };

    return (
        <div>
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
        </div>
    );
};

export default JobTitles;
