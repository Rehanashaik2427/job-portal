import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CandidateLeftSide from './CandidateLeftSide';
import './CandidateDashboard.css';
import axios from 'axios';

const ResumeAdd = () => {
    const BASE_API_URL = "http://localhost:8082/api/jobbox";

    const location = useLocation();
    const userName = location.state?.userName;
    const userId = location.state?.userId;
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [fileType, setFileType] = useState('file');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Corrected: Access 'files' array, not 'file'
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleFileTypeChange = (event) => {
        setFileType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('message', message);
        formData.append('fileType', fileType);
        formData.append('userId', userId);

        try {
        

            const response = await axios.post(BASE_API_URL + '/uploadResume', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              console.log('File uploaded successfully:', response.data);
            if (response.ok) {
                setSuccessMessage('Resume uploaded successfully!');
                alert(successMessage);
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const user = {
        userName: userName,
        userId: userId,
    };
    
    return (
        <div className='candidate-dashboard-container'>
            <div className='left-side'>
                <CandidateLeftSide user={user} />
            </div>
            <div className='resume-page'>
                <h2>Add Resume</h2>
                <form onSubmit={handleSubmit} className='resume-Add'>
                    <div className='select-type'>
                        <label>Select Type:</label>
                        <select value={fileType} onChange={handleFileTypeChange}>
                            <option value="file">File</option>
                            <option value="image">Image</option>
                            <option value="brief">Brief</option> {/* Corrected: Use 'brief' */}
                        </select>
                    </div>
                    <div className='select-file'>
                        <label>Select {fileType === 'file' ? 'File' : fileType === 'image' ? 'Image' : 'Brief'}:</label>
                        <input type={fileType === 'file' ? 'file' : fileType === 'image' ? 'file' : 'file'} accept={fileType === 'file' ? '.pdf, .doc, .docx' : fileType === 'image' ? 'image/*' : '.txt'} onChange={handleFileChange} />
                    </div>
                    <div className='message-type'>
                        <label>Message:</label>
                        <textarea value={message} onChange={handleMessageChange}></textarea>
                    </div>
                    <div>
                        <button type="submit" className='uploadResume'>Upload Resume</button>
                    </div>
                </form>
                {successMessage && <p>{successMessage}</p>}
            </div>
        </div>
    );
};

export default ResumeAdd;
