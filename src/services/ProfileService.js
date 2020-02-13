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

  //TimeBox
  async ChangeTimeBox(timeBoxID) {
    let req = {
      TimeBoxID: timeBoxID,
      UserID: window.Profile.UserID
    };
    return await HTTP.post(`/Profile/ChangeTimeBox`, req);
  },

  async GetTimeBoxes() {
    let req = {
      UserID: window.Profile.UserID
    };
    return (await HTTP.post(`/Profile/GetTimeBoxes`, req)).reverse();
  },

  async GetTimeBoxById(id) {
    let req = {
      TimeBoxID: id
    };
    return await HTTP.post(`/Profile/GetTimeBoxById`, req);
  },

  async ModifyOrAddATimeBox(rowData) {
    let req = {
      TimeBoxID: rowData.TimeBoxID,
      TimeBoxName: rowData.TimeBoxName,
      UserID: window.Profile.UserID,
      StartDate: moment(rowData.StartDate).format('YYYY-MM-DD'),
      EndDate: moment(rowData.EndDate).format('YYYY-MM-DD'),
      Content: rowData.Content
    };
    const result =  await HTTP.post(`/Profile/EditTimeBox`, req);
    return result.TimeBoxID
  },

  async DeleteATimeBox(rowData) {
    let req = {
      TimeBoxID: rowData.TimeBoxID,
    };
    return await HTTP.post(`/Profile/DeleteATimeBox`, req);
  },

  async getCurrentTimeBox() {
    let req = {
      UserID: window.Profile.UserID
    }
    const result = await HTTP.post('/Profile/timeBox/current', req);
    return result.TimeBoxID
  },

  async getCurrentTimeBoxRange() {
    let req = {
      UserID: window.Profile.UserID
    }
    return await HTTP.post('/Profile/timeBox/currentRange', req);
  }
}
