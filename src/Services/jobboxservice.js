import axios from "axios";

const BASE_API_URL="http://localhost:8080/api/jobbox";

const postJob=async (job)=>{
    try{
        // eslint-disable-next-line no-undef
        const response=await axios.post(BASE_API_URL+"/postingJob",job);
    }catch(error)
    {
        console.log(error);
        throw error;
    }
}