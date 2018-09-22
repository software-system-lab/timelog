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


  ////teams
  //sprint
  async GetSprints() {
    let req = {
      TeamID: window.Profile.TeamID
    };
    let httpResult = await HTTP.post(`api/Profile/GetSprints`, req);
    httpResult.forEach(x => {
      x.Duration = `${x.StartDate.toString().slice(0,10)} ~ ${x.EndDate.toString().slice(0,10)}`;
    });
    return httpResult;
  },

  async GetSprint(sprintID) {
    let req = {
      SprintID: sprintID
    };
    let httpResult = await HTTP.post(`api/Profile/GetSprint`, req);
    httpResult.Duration = [httpResult.StartDate, httpResult.EndDate]
    return httpResult;
  },

  async ModifyOrAddASprint(rowData) {
    let req = {
      SprintID: rowData.SprintID,
      SprintName: rowData.SprintName,
      TeamID: window.Profile.TeamID,
      StartDate: rowData.Duration[0],
      EndDate: rowData.Duration[1],
      Content: rowData.Content
    };
    let httpResult = await HTTP.post(`api/Profile/ModifyOrAddASprint`, req);
    return httpResult;
  }
}
