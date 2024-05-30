import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HrLeftSide from './HrLeftSide';
import Pagination from './Pagination';

const TotalApplicantsHr = () => {
    const BASE_API_URL = "http://localhost:8082/api/jobbox";
    const location = useLocation();
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;
    const jobId = location.state?.jobId;
    const user = { userName, userEmail };

    const [applications, setApplications] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSelect = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/getFilterApplicationsByJobId`, {
                params: {
                    jobId: jobId,
                    filterStatus: filterStatus,
                    searchQuery: searchQuery
                }
            });
            setApplications(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchApplications = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/getApplicationsByHrId`, {
                params: { userEmail: userEmail }
            });
            setApplications(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (applicationId, newStatus) => {
        try {
            await axios.put(`${BASE_API_URL}/updateApplicationStatus`, null, {
                params: {
                    applicationId: applicationId,
                    newStatus: newStatus
                }
            });
            fetchApplications();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDownload = async (resumeId, candidateId) => {
        try {
            const res = await axios.get(`${BASE_API_URL}/getUserName`, {
                params: { userId: candidateId }
            });

            const response = await axios.get(`${BASE_API_URL}/downloadResume`, {
                params: { resumeId: resumeId },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const fileName = `${res.data.userName}_${candidateId}_resume.pdf`;
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    };

    const [showSettings, setShowSettings] = useState(false);
    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    useEffect(() => {
        handleSelect();
    }, [filterStatus, searchQuery]);

    // Filter applications based on the search query for job titles
    const filteredApplications = applications.filter(application =>
        application.jobRole.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentApplications = filteredApplications.slice(indexOfFirstJob, indexOfLastJob);

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
                        placeholder='Search'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    {/* <button type="submit">
                        <FontAwesomeIcon icon={faSearch} className='button' style={{ color: 'skyblue' }} />
                    </button> */}
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
                {/* <select value={filterStatus} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="notShortlisted">Not Shortlisted</option>
                </select> */}
                {currentApplications.length > 0 ? (
                    <table id='jobTable1'>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>Job Title</th>
                                <th>Resume ID</th>
                                <th>Date</th>
                                <th>Application Status</th>
                                <th>View Details</th>
                                <th>Application Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentApplications.map(application => (
                                <tr key={application.id}>
                                    <td>{application.jobRole}</td>
                                    <td><button className='download' onClick={() => handleDownload(application.resumeId, application.candidateId)}>Resume</button></td>
                                    <td>{application.appliedOn}</td>
                                    <td>{application.applicationStatus}</td>
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
                                    <td>
                                        <button onClick={() => updateStatus(application.applicationId, 'Shortlisted')} className="select">Select</button>
                                        <button onClick={() => updateStatus(application.applicationId, 'Not Shortlisted')} className="reject">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <section className='not-yet'>
                        <h2>Sorry, you haven't received any applications yet.</h2>
                    </section>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredApplications.length / jobsPerPage)}
                    handlePageClick={handlePageClick}
                />
            </div>
        </div>
    );
}

export default TotalApplicantsHr;
