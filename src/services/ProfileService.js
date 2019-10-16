import HTTP from './HttpRequest'
import moment from 'moment'
/**
 * Profile APIs
 */
export default {
  ////personal
  GetProfile() {
    return HTTP.post(`/Profile/GetProfile`, {
      FBID: window.FBProfile.id
    });
  },

  async Login(FBID, userAccessToken) {
    let req = {
      FBID,
      userAccessToken
    };
    return HTTP.post(`/Profile/Login`, req);
  },

  async Register(userData, userAccessToken) {
    let postData = userData;
    postData.UserAccessToken = userAccessToken;
    return HTTP.post(`/Profile/Register`, postData);
  },

  async EditUserProfile(data) {
    return HTTP.post(`/Profile/EditUserProfile`, data);
  },

  async GetTeamList(UserID) {
    return HTTP.get(`/Profile/GetTeamList?id=${UserID}`);
  },

  ////teams
  async GetTeammates(teamID) {
    let req = {
      TeamID: teamID
    };
    return HTTP.post(`/Profile/GetTeammates`, req);
  },

  //Iteration
  async ChangeIteration(iterationID) {
    let req = {
      IterationID: iterationID,
      UserID: window.Profile.UserID
    };
    return await HTTP.post(`/Profile/ChangeIteration`, req);
  },

  async GetIterations() {
    let req = {
      UserID: window.Profile.UserID
    };
    return await HTTP.post(`/Profile/GetIterations`, req);
  },

  async GetIterationById(id) {
    let req = {
      IterationID: id
    };
    return await HTTP.post(`/Profile/GetIterationById`, req);
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
    return await HTTP.post(`/Profile/EditIteration`, req);
  },

  async DeleteAIteration(rowData) {
    let req = {
      IterationID: rowData.IterationID,
    };
    return await HTTP.post(`/Profile/DeleteAIteration`, req);
  }
}
