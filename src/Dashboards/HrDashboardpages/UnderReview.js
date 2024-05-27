import axios from "axios";
import { default as React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HrLeftSide from './HrLeftSide';
import Pagination from './Pagination';

const UnderReview = () => {
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
    const totalPages = Math.ceil(applications.length / jobsPerPage);

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentApplications = applications.slice(indexOfFirstJob, indexOfLastJob);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const fetchApplications = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/getUndeReviewApplicationsByHRId?userEmail=${userEmail}`);
            console.log(response.data);
            setApplications(response.data);
        } catch (error) {
            console.log(error);
        }
    };

  

    const handleDownload = async (resumeId, candidateId) => {
        try {
            const res = await axios.get(`${BASE_API_URL}/getUserName`, {
                params: {
                    userId: candidateId
                }
            });

            const response = await axios.get(`http://localhost:8082/api/jobbox/downloadResume?resumeId=${resumeId}`, {
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
    useEffect(() => {
        fetchApplications();
    }, []);
  return (
    <div className='hr-dashboard-container'>
         <div className='hr-leftside'>
                <HrLeftSide user={user} />
            </div>
            <div className='hr-rightside'>
            {/* {currentApplications.length > 0 ? ( */}
                    <table id='application'>
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>Job Title</th>
                                <th>Resume ID</th>
                                <th>Date</th>
                               
                                <th>View Details</th>
                             
                            </tr>
                        </thead>
                        <tbody>
                            {currentApplications.map(application => (
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
                {/* ) : (
                    <section className='not-yet'>
                        <h2>Sorry, you haven't received any applications yet.</h2>
                    </section>
                )} */}
                
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageClick={handlePageClick}
                />
                </div>
    </div>
  )
}

export default UnderReview
