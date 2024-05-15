import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import './HrDashboard.css';
import HrLeftSide from "./HrLeftSide";

const ViewApplications=()=>
    {
        const BASE_API_URL = "http://localhost:8081/api/jobbox";
const location=useLocation();
const jobId=location.state?.jobId;
console.log(jobId);

        const [applications,setApplications]=useState([]);
        const [filterStatus, setFilterStatus] = useState('all');
        const handleFilterChange = (e) => {
            setFilterStatus(e.target.value);
        };

       
    
        const fetchApplications=async()=>
            {
                try{
                    const response= await axios.get(`${BASE_API_URL}/getApplicationsByJobId?jobId=${jobId}`);
                    console.log(response.data);
                    setApplications(response.data);
    
                }catch(error)
                {
                    console.log(error);
                }
            };
    
            useEffect(()=>{
                fetchApplications();
            }, [])
    
    
            const updateStatus = async (applicationId, newStatus) => {
                console.log(applicationId);
                console.log(newStatus);
                try {
                    const response = await axios.put(`${BASE_API_URL}/updateApplicationStatus?applicationId=${applicationId}&newStatus=${newStatus}`);
                    console.log(response.data);
                    fetchApplications(); 
                } catch (error) {
                    console.log(error);
                }
            };
    
            const history=useHistory();
    
            const viewDetails=async(applicationId)=>{
                history.push('/applicationDetails',{applicationId})
    
            }



    return(
            <div>
               
                                    <div className="filter">
                                                    
                                    <label htmlFor="status">Filter by Status:</label>
                                    <select id="status" onChange={handleFilterChange} value={filterStatus}>
                                        <option value="all">All</option>
                                        <option value="Shortlisted">Shortlisted</option>
                                        <option value="Under Review">Under Review</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <br />
                                {applications.length > 0 && (
                                <table id='application' >
                                    
                                        <tr style={{textAlign:'center'}}>
                                            <th>Job Title</th>
                                            <th>Company Name</th>
                                            <th>Resume ID</th>
                                            <th>Date/Time</th>
                                            <th>Application Status</th>
                                            <th>View Details</th>
                                            <th>Application Action</th>
                                        
                                        </tr>
                                    
                                        {applications.map(application => (
                            <tr key={application.id}>
                            <td>{application.jobRole}</td>
                            <td>{application.companyName}</td>
                            <td>{application.resumeId}</td>
                            <td>{application.appliedOn}</td>
                            <td>{application.applicationStatus}</td>
                            <td><button onClick={()=>viewDetails(application.applicationId)}>View</button></td>
                            <td>
                            <button onClick={() => updateStatus(application.applicationId, 'Shortlisted')}>Select</button>
                            <button onClick={() => updateStatus(application.applicationId, 'Not Shortlisted')} className="reject">Reject</button>

                            </td>
                            </tr>
                            ))}
                                </table>
                                )}
                                {applications.length === 0 && (
                                    <section class='not-yet'>
                                    <h2>Sorry, you haven't received any applications yet.</h2>
                                </section>
                                
                                    )}
            </div>
    )        
    
    }
    export default  ViewApplications;