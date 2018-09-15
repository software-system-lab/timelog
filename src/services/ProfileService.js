import HTTP from './HttpRequest'

/**
 * Profile APIs
 */
export default {
  async GetProfile() {
    return HTTP.get(`api/Profile/GetProfile`);
    // var response = await HTTP.get(`api/NurseExecutionDoctorOrders/InpatientList/queryPaitentInfo?inpatientEncounterId=${encodeURIComponent(inpatientEncounterId)}`, config); return response.data;
  },
  async Login(userID, userAccessToken){
    let req = {userID,userAccessToken}
    return HTTP.post(`api/Profile/Login`,req);
  }
}
