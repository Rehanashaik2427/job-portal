import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HrLeftSide from './HrLeftSide';
import Pagination from "./Pagination";

const ShortlistedCandidates = () => {
    const BASE_API_URL = "http://localhost:8082/api/jobbox";
    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;
    const user = {
        userName: userName,
        userEmail: userEmail,
    };
    
    const [applications, setApplications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = applications.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(applications.length / jobsPerPage);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchApplications = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/getShortlistedApplicationsByHrId?userEmail=${userEmail}`);
            setApplications(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredApplications = applications.filter(application =>
        application.jobRole.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    const [showSettings, setShowSettings] = useState(false);
    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };
    useEffect(() => {
        fetchApplications();
    }, []);

    const handleDownload = async (resumeId, candidateId) => {
        try {
            const res = await axios.get(`${BASE_API_URL}/getUserName`, {
                params: { userId: candidateId }
            });

            const response = await axios.get(`${BASE_API_URL}/downloadResume?resumeId=${resumeId}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const fileName = (res.data.userName) + candidateId + "resume.pdf";
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    };

    return (
        <div className='hr-dashboard-container'>
            <div className='hr-leftside'>
                <HrLeftSide user={user} />
            </div>
            <div className='hr-rightside'>
                <div className="candidate-search">
                    <input
                        type='text'
                        name='search'
                        placeholder='Search by Job Title'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <div><FontAwesomeIcon icon={faUser} id="user" className='icon' style={{ color: 'black' }} onClick={toggleSettings} /></div>
                </div>
                {showSettings && (
                    <div id="modal-container">
                        <div id="settings-modal">
                            <ul>
                                <li><FontAwesomeIcon icon={faSignOutAlt} /><Link to="/">Sign out</Link></li>
                                <li>Setting </li>
                            </ul>
                            <button onClick={toggleSettings}>Close</button>
                        </div>
                    </div>
                )}
                {filteredApplications.length > 0 ? (
                    <table id='jobTable1'>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>Job Title</th>
                                <th>Resume ID</th>
                                <th>Date</th>
                                <th>View Details</th>     
                            </tr>
                        </thead>
                        <tbody>
                            {currentJobs.map(application => (
                                <tr key={application.id}>
                                    <td>{application.jobRole}</td>
                                    <td><button className='download' onClick={() => handleDownload(application.resumeId, application.candidateId)}>Resume</button></td>
                                    <td>{application.appliedOn}</td>
                                    
                                    <td>
                                        <Link
                                            to={{
                                                pathname: '/applicationDetails',
                                                state: { userEmail: userEmail, applicationId: application.applicationId }
                                            }}
                                        >
                                            <button>View</button>
                                        </Link>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <section className='not-yet'>
                        <h2>Sorry, no shortlisted applications found.</h2>
                    </section>
                )}
                
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageClick={handlePageClick}
                />
            </div>
        </div>
    );
}

export default ShortlistedCandidates;
