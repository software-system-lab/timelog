import HTTP from './HttpRequest'

/**
 * Profile APIs
 */
export default {
  ////personal
  async GetProfile() {
    return HTTP.post(`api/Profile/GetProfile`, {
      userID: window.FBProfile.id
    });
  },

  async Login(userID, userAccessToken) {
    let req = {
      userID,
      userAccessToken
    };
    return HTTP.post(`api/Profile/Login`, req);
  },

  async Register(userData,userAccessToken) {
    let postData = userData;
    postData.UserAccessToken = userAccessToken;
    return HTTP.post(`api/Profile/Register`, postData);
  },


  ////teams
  async GetTeamList() {
    return HTTP.get(`api/Profile/GetTeamList`);
  },

  //sprint
  async GetSprints() {
    let req = {
      TeamID: window.Profile.Team.TeamID
    };
    let httpResult = await HTTP.post(`api/Profile/GetSprints`, req);
    if (httpResult != "no data")
      httpResult.forEach(x => {
        x.Duration = `${x.StartDate.toString().slice(0,10)} ~ ${x.EndDate.toString().slice(0,10)}`;
      });
    return httpResult;
  },

  async ChangeSprint(sprintID) {
    let req = {
      SprintID: sprintID,
      TeamID: window.Profile.Team.TeamID
    };
    let httpResult = await HTTP.post(`api/Profile/ChangeSprint`, req);
    if (httpResult != "no data")
      httpResult.Duration = [httpResult.StartDate, httpResult.EndDate]
    return httpResult;
  },

  async GetSprint(sprintID) {
    let req = {
      SprintID: sprintID
    };
    let httpResult = await HTTP.post(`api/Profile/GetSprint`, req);
    if (httpResult != "no data")
      httpResult.Duration = [httpResult.StartDate, httpResult.EndDate]
    return httpResult;
  },

  async ModifyOrAddASprint(rowData) {
    let req = {
      SprintID: rowData.SprintID,
      SprintName: rowData.SprintName,
      TeamID: window.Profile.Team.TeamID,
      StartDate: rowData.Duration[0],
      EndDate: rowData.Duration[1],
      Content: rowData.Content
    };
    return await HTTP.post(`api/Profile/ModifyOrAddASprint`, req);
  },

  async DeleteASprint(rowData) {
    let req = {
      SprintID: rowData.SprintID,
    };
    return await HTTP.post(`api/Profile/DeleteASprint`, req);
  }
}
