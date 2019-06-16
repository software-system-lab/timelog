import HTTP from './HttpRequest'
import moment from 'moment'
/**
 * Profile APIs
 */
export default {
  ////personal
  async GetProfile() {
    return HTTP.post(`api/Profile/GetProfile`, {
      FBID: window.FBProfile.id
    });
  },

  async Login(FBID, userAccessToken) {
    let req = {
      FBID,
      userAccessToken
    };
    return HTTP.post(`api/Profile/Login`, req);
  },

  async Register(userData, userAccessToken) {
    let postData = userData;
    postData.UserAccessToken = userAccessToken;
    return HTTP.post(`api/Profile/Register`, postData);
  },

  async EditUserProfile(data) {
    return HTTP.post(`api/Profile/EditUserProfile`, data);
  },

  async GetTeamList() {
    return HTTP.get(`api/Profile/GetTeamList`);
  },

  ////teams
  async GetTeammates() {
    let req = {
      TeamID: window.Profile.Team.TeamID
    };
    return HTTP.post(`api/Profile/GetTeammates`, req);
  },

  //sprint
  async ChangeIteration(iterationID) {
    let req = {
      IterationID: iterationID,
      UserID: window.Profile.UserID
    };

    console.log(HELLO)
    return await HTTP.post(`api/Profile/ChangeIteration`, req);
  },

  async GetIterations() {
    let req = {
      UserID: window.Profile.UserID
    };
    return await HTTP.post(`api/Profile/GetIterations`, req);
  },

  async GetIterationById(id) {
    let req = {
      IterationID: id
    };
    return await HTTP.post(`api/Profile/GetIterationById`, req);
  },

  async ModifyOrAddAIteration(rowData) {
    let req = {
      IterationID: rowData.IterationID,
      IterationName: rowData.IterationName,
      UserID: window.Profile.UserID,
      StartDate: moment(rowData.StartDate).format('YYYY-MM-DD'),
      EndDate: moment(rowData.EndDate).format('YYYY-MM-DD'),
      Content: rowData.Content
    };
    return await HTTP.post(`api/Profile/EditIteration`, req);
  },

  async DeleteAIteration(rowData) {
    let req = {
      IterationID: rowData.IterationID,
    };
    return await HTTP.post(`api/Profile/DeleteAIteration`, req);
  }
}