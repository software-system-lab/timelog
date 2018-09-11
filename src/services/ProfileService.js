import axios from 'axios'
/**
 * Profile API
 */
export default{ 
   async GetProfile(){
    var response = await axios.get(`api/Profile/GetProfile`); 
    return response.data;
    // var response = await HTTP.get(`api/NurseExecutionDoctorOrders/InpatientList/queryPaitentInfo?inpatientEncounterId=${encodeURIComponent(inpatientEncounterId)}`, config); return response.data;
   },
}
