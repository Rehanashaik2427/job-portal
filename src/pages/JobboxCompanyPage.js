import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch } from '@fortawesome/free-solid-svg-icons';

const JobboxCompanyPage=()=>{

    const BASE_API_URL="http://localhost:8081/api/jobbox";
    const [companies, setCompanies] = useState([]);
    
   
    
  
  
    const fetchCompany = async () => {
      try {
        const response = await axios.get(BASE_API_URL+"/displayCompanies"); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        setCompanies(response.data); // Set the fetched jobs to state
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
  
    // useEffect hook to fetch jobs when the component mounts
    useEffect(() => {
      fetchCompany();
    }, []);
  
  
  
    const [search, setSearch] = useState('');
  
    const handleSearchChange = (event) => {
      setSearch(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try{
        const response = await axios.get(`${BASE_API_URL}/searchCompany?search=${search}`);
        setCompanies(response.data);
  
      }catch(error){
  console.log("No data Found"+error);
      }
      console.log("Search submitted:", search);
    };
  
  
  
    
    return(
        <div className="top-right-content">
          <div className="candidate-search">
          <form className="candidate-search" onSubmit={handleSubmit}>
      <input
        type='text'
        name='search'
        placeholder='Search'
        value={search}
        onChange={handleSearchChange}
      />
      <button type="submit">
        <FontAwesomeIcon icon={faSearch} className='button' style={{ color: 'skyblue' }} />
      </button>
    </form>
           
           
          
          </div>
         
    
       


        <div className="companyJob">
          <h1> Companies that we have</h1>
          <div className="cards">
            {companies.length > 0 ? (
              companies.map((company) => (
                <div className="company-card-job" key={company.companyId}>
                  <p className="company-name">Company Name: <b>{company.companyName}</b></p>
                  <p>Company Email <b>{company.companyEmail}</b></p>
                  <p>Industry : <b>{company.industry}</b></p>
                  <Link  to={{
          pathname: '/eachCompanyPage',
          state: { companyId :company.companyId}
        }} ><button className='com'><h3>View</h3></button></Link>
                                       
                           
                </div>
              ))
            ) : (
              <p>Loading companies...</p>
            )}



          </div>
        </div>
        </div>
    )
}; export default JobboxCompanyPage;