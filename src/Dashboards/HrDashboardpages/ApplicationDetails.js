import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ApplicationDetails.css";
const ApplicationDetails = () => {
    const BASE_API_URL = "http://localhost:8081/api/jobbox";
    const location = useLocation();
    const applicationId = location.state?.applicationId;
    const [application, setApplication] = useState();
    const [candidate, setCandidate] = useState();
    const [job, setJob] = useState();

    const fetchApplication = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/getApplication?applicationId=${applicationId}`);
            setApplication(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApplication();
    }, []);

    useEffect(() => {
        if (application) {
            const candidateId = application.candidateId;
            const jobId = application.jobId;
            const fetchCandidate = async () => {
                try {
                    const response = await axios.get(`${BASE_API_URL}/getUser?userId=${candidateId}`);
                    setCandidate(response.data);
                } catch (error) {
                    console.log(error);
                }
            };

            const fetchJob = async () => {
                try {
                    const response = await axios.get(`${BASE_API_URL}/getJob?jobId=${jobId}`);
                    setJob(response.data);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchCandidate();
            fetchJob();
        }
    }, [application]);

    return (
        <div className="application-details-container">
            {job && (
                <div className="jobdetails">
                    <h2>Job Details</h2>
                    <p><b>Job Title: </b>{job.jobTitle}</p>
                    <p><b>Company Name:</b> {job.companyName}</p>
                    <p><b>Requirements:</b> {job.requirements}</p>
                    <p><b>Eligibility:</b> {job.eligibility}</p>
                    <p><b>Position:</b> {job.numberOfPosition}</p>
                    <p><b>Experience:</b> {job.experience}</p>
                    <p><b>JobType:</b> {job.jobType}</p>
                    <p><b>Location:</b> {job.location}</p>
                    <p><b>Salary:</b> {job.salary}</p>

                    {/* Add more job details as needed */}
                </div>
            )}

            {candidate && (
                <div className="candidatedetails">
                    <h2>Candidate Details</h2>
                    <p><b>Name: </b>{candidate.userName}</p>
                    <p> <b>Email:</b> {candidate.userEmail}</p>
                    <p> <b>Phone:</b> {candidate.phone}</p>
                    
                </div>
            )}
        </div>
    );
};

export default ApplicationDetails;
