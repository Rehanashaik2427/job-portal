import React, { useEffect, useState } from 'react';
import Eligible from './Eligibile';
import Others from './Others';

const Salary = () => {
    const initialSalary =['0-10000','0-15000','0-20000','0-25000','0-30000','0-35000','0-40000','0-45000','0-50000'];
    const [step, setStep] = useState(1);
    const[salary , setSalary] = useState([]);
    const [newSalary, setNewSalary] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [selectedSalary, setSelectedSalary] = useState('');
    const [others, setOthers] = useState(false);
    const [eligibile , setEligibile] = useState(false);

    useEffect(() => {
        // Load requirements from localStorage on component mount
        const savedSalary = JSON.parse(localStorage.getItem('salary')) || initialSalary;
        setSalary(savedSalary);
    }, []);

    const handleAddSalary = () => {
        if (newSalary.trim() !== '') {
            const updatedSalary= [...salary, newSalary];
            setSalary(updatedSalary);
            localStorage.setItem('salary', JSON.stringify(updatedSalary)); // Save requirements to localStorage
            setNewSalary('');
            setShowInput(false);
        }
    };
  

    const handleInputClick = (req) => {
        // Update selected salary only if it's different from the current selection
        if (selectedSalary !== req) {
          setSelectedSalary(req);
        } else {
          setSelectedSalary(''); // Clear selection if clicking the same selected range
        }
      };
    const handleBack = () => {
       setStep(0);
       setEligibile(true);
    };

    const handleNext = () => {
        console.log("salary :",selectedSalary)
        if (step === 1) {
            setStep(2);
        } else{
           
            setOthers(true);
        }
    };


        return (
            <div>
                {step===1 && (
                    <>
                        <div className='job-post-details'>
                            <h2 style={{ textAlign: 'center' }}>Salary</h2>
                            <p style={{ textAlign: 'center' }}>Select salary range</p>
                        </div>
                        

                        <div className="requirements-container">
                        {salary.map((req, index) => (
                            <span key={index}>
                                <input
                                    type="text"
                                    value={req}
                                    readOnly
                                    onClick={() => handleInputClick(req)} // Pass the requirement value to handleInputClick
                                    style={{ backgroundColor: selectedSalary.includes(req) ? 'skyblue' : '' }} // Apply skyblue background if selected
                                />
                            </span>
                        ))}
                        {showInput ? (
                            <span>
                                <input
                                    type="text"
                                    value={newSalary}
                                    onChange={(e) => setNewSalary(e.target.value)}
                                    placeholder="Enter salary range"
                                />
                                <button onClick={handleAddSalary}>Save</button>
                            </span>
                        ) : (
                            <span>
                                <button onClick={() => setShowInput(true)}>Click here to add requirement</button>
                            </span>
                        )}
                        </div>
                        <div className='note'>
                            <p><strong>Note:</strong> If salary range are not present add it.</p>
                        </div>
                        <div className='footer-buttons'>
                            <button onClick={handleBack}>Back</button>
                            <button onClick={handleNext}>Next</button>
                        </div>
                    </>
                )
                }
              
              {step === 2 && (
                <Others />
            )}

            {eligibile && <Eligible />}
            </div>
        );
    };

export default Salary;
