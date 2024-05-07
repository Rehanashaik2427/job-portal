import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from React Router

const RequirementsAndSkills = () => {
    const history = useHistory(); 
    const initialRequirements = ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'SQL'];
    const [requirements, setRequirements] = useState([]);
    const [newRequirement, setNewRequirement] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [selectedRequirements, setSelectedRequirements] = useState([]); // Array to store selected requirements

    useEffect(() => {
        // Load requirements from localStorage on component mount
        const savedRequirements = JSON.parse(localStorage.getItem('requirements')) || initialRequirements;
        setRequirements(savedRequirements);
    }, []);

    const handleAddRequirement = () => {
        if (newRequirement.trim() !== '') {
            const updatedRequirements = [...requirements, newRequirement];
            setRequirements(updatedRequirements);
            localStorage.setItem('requirements', JSON.stringify(updatedRequirements)); // Save requirements to localStorage
            setNewRequirement('');
            setShowInput(false);
        }
    };

    const handleInputClick = (req) => {
        // Toggle selection for the clicked requirement
        const isSelected = selectedRequirements.includes(req);
        if (isSelected) {
            setSelectedRequirements(selectedRequirements.filter(item => item !== req));
        } else {
            setSelectedRequirements([...selectedRequirements, req]);
        }
    };

    const handleBack = () => {
        history.push('/job-titles'); // Navigate to Job Titles page
    };

    const handleNext = () => {
        history.push('/job-type'); // Navigate to Requirements and Skills page
    };

    return (
        <div>
            <div className='job-post-details'>
                <h2 style={{ textAlign: 'center' }}>Requirements And Skills:</h2>
                <p style={{ textAlign: 'center' }}>Select job requirements and skills</p>
            </div>
            <div className="requirements-container">
                {requirements.map((req, index) => (
                    <span key={index}>
                        <input
                            type="text"
                            value={req}
                            readOnly
                            onClick={() => handleInputClick(req)} // Pass the requirement value to handleInputClick
                            style={{ backgroundColor: selectedRequirements.includes(req) ? 'skyblue' : '' }} // Apply skyblue background if selected
                        />
                    </span>
                ))}
                {showInput ? (
                    <span>
                        <input
                            type="text"
                            value={newRequirement}
                            onChange={(e) => setNewRequirement(e.target.value)}
                            placeholder="Enter new requirement"
                        />
                        <button onClick={handleAddRequirement}>Save</button>
                    </span>
                ) : (
                    <span>
                        <button onClick={() => setShowInput(true)}>Click here to add requirement</button>
                    </span>
                )}
            </div>

            <div className='note'>
                <p><strong>Note:</strong> If a requirement is not listed, click the button above to add it</p>
            </div>

            <div className='footer-buttons'>
                <button onClick={handleBack}>Back</button>
                <button className={selectedRequirements.length > 0 ? 'selected' : ''} onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default RequirementsAndSkills;
