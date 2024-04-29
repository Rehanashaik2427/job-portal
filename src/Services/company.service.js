import axios from "axios";

const BASE_API_URL="http://cors-anywhere.herokuapp.com/http://localhost:9090/api/companies";

class CompanyService{
   
     saveCompany(formData){
        return axios.post(BASE_API_URL+"/comapny",formData);
     }

}
export  default new CompanyService();