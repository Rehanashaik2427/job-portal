import React, { useState } from 'react';
import Eligibile from './Eligibile';
import JobType from './JobType'; // Import the JobType component
const SetLocation = () => {
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [step, setStep] = useState(1);

    const handleSelectAllClick = () => {
        const allLocations = ['Bengaluru', 'Bihar', 'Chennai', 'Delhi', 'Kerala', 'Coimbatore', 'Uttar Pradesh', 'Gurgaon', 'Pune', 'Ahmedabad', 'Mumbai', 'Hyderabad', 'Indore', 'Kochi', 'Maharashtra', 'Mangalore', 'Mysore', 'Noida', 'Thiruvananthapuram', 'Visakhapatnam', 'Bhubaneswar', 'Other Cities', 'Remote (Outside India)', 'Remote (Within India)'];
    
        if (selectAll) {
            setSelectedLocations([]);
        } else {
            setSelectedLocations(allLocations);
        }
        setSelectAll(!selectAll);
    
        // Change background color of all checkboxes to skyblue
        const checkboxes = document.querySelectorAll('input[name="jobLocation"]');
        checkboxes.forEach((checkbox) => {
            checkbox.parentElement.style.backgroundColor = !selectAll ? 'skyblue' : '';
        });
    };
    
    const handleCheckboxClick = (event) => {
        const location = event.target.value;
        if (event.target.checked) {
            setSelectedLocations([...selectedLocations, location]);
        } else {
            setSelectedLocations(selectedLocations.filter((item) => item !== location));
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
        console.log('Selected Job Locations:', selectedLocations); // Log selected locations to the console

        if (step === 1) {
            setStep(2); // Move to step 2
        } else if (step === 2) {
            console.log('Selected Job Locations:', selectedLocations); // Log selected locations to the console
            // Navigate to Eligible component
            // You can use conditional rendering to switch between components
            return <Eligibile />;
        }
    };


    // Conditional rendering based on step
    if (step === 1) {
        return (
            <div>
  <div>
            <div className='location'>
                <h2>Location</h2>
                <p>Select Job Location</p>
            </div>

            <div className='location-container'>
                
                    <div className='first-column'>
                        {['Bengaluru', 'Bihar', 'Chennai', 'Delhi', 'Kerala', 'Coimbatore', 'Uttar Pradesh', 'Gurgaon'].map((location) => (
                            <div className={`location-group ${selectedLocations.includes(location) ? 'selected' : ''}`} key={location}>
                                <input type="checkbox" id={location} name="jobLocation" value={location} onChange={handleCheckboxClick} checked={selectedLocations.includes(location)} />
                                <label htmlFor={location}>{location}</label>
                            </div>
                        ))}
                    </div>

                    {/* Second and Third Columns */}

                    <div className='second-column'>
                        {['Pune', 'Ahmedabad', 'Mumbai', 'Hyderabad', 'Indore', 'Kochi', 'Maharashtra', 'Mangalore'].map((location) => (
                            <div className={`location-group ${selectedLocations.includes(location) ? 'selected' : ''}`} key={location}>
                                <input type="checkbox" id={location} name="jobLocation" value={location} onChange={handleCheckboxClick} checked={selectedLocations.includes(location)} />
                                <label htmlFor={location}>{location}</label>
                            </div>
                        ))}
                    </div>
                    {/* Include similar code for other locations */}

                    <div className='third-column'>
                        {['Mysore', 'Noida', 'Thiruvananthapuram', 'Visakhapatnam', 'Bhubaneswar', 'Other Cities', 'Remote (Outside India)', 'Remote (Within India)'].map((location) => (
                            <div className={`location-group ${selectedLocations.includes(location) ? 'selected' : ''}`} key={location}>
                                <input type="checkbox" id={location} name="jobLocation" value={location} onChange={handleCheckboxClick} checked={selectedLocations.includes(location)} />
                                <label htmlFor={location}>{location}</label>
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
        </div>            </div>
        );
    } else if (step === 2) {
        return <Eligibile />;
    } else {
        // Default case for step
        return <JobType />;
    }
};
    

export default SetLocation;
