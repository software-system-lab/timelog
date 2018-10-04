import HTTP from './HttpRequest'

/**
 * Log APIs
 */
export default {
  //log
  async AddALog(logData) {
    let postData = {
      UserID: window.Profile.FBUserID,
      SprintID: window.Profile.Sprint.SprintID,
      TagsString: JSON.stringify(logData.Tag),
      Title: logData.Event,
      Date: logData.Date,
      StartTime: logData.Duration[0],
      EndTime: logData.Duration[1],
      Description: logData.Description
    };
    return HTTP.post(`api/Log/AddALog`, postData);
  },

  async ModifyALog(logData) {
    let postData = {
      LogID: logData.LogID,
      UserID: window.Profile.FBUserID,
      SprintID: logData.SprintID,
      TagsString: JSON.stringify(logData.Tags),
      Title: logData.Title,
      Date: logData.Date,
      StartTime: logData.Duration[0],
      EndTime: logData.Duration[1],
      Description: logData.Description
    };
    return HTTP.post(`api/Log/ModifyALog`, postData);
  },

  async DeleteALog(logData) {
    let postData = {
      LogID: logData.LogID,
      UserID: window.Profile.FBUserID,
    };
    return HTTP.post(`api/Log/DeleteALog`, postData);
  },

  async GetUserLogs(sprintID = window.Profile.Sprint.SprintID) {
    let postData = {
      UserID: window.Profile.FBUserID,
      SprintID: sprintID,
    };
    let httpResult = await HTTP.post(`api/Log/GetUserLogs`, postData);
    if (httpResult != "no data")
      httpResult.forEach(x => {
        x.Tags = JSON.parse(x.Tags);
        x.Duration = `${x.Date.toString()} ${x.StartTime.toString()} ~ ${x.EndTime.toString()}`;
      });
    return httpResult;
  },

  async GetAlog(logID) {
    let req = {
      LogID: logID
    };
    let httpResult = await HTTP.post(`api/Log/GetAlog`, req);
    if (httpResult != 'no data') {
      httpResult.Tags = JSON.parse(httpResult.Tags);
      httpResult.Duration = [httpResult.StartTime, httpResult.EndTime]
    }

    return httpResult
  },

  //tag
  async GetUserTags() {
    return HTTP.post(`api/Log/GetUserTags`, {
      UserID: window.Profile.FBUserID
    });
  },

  async ModifyOrAddATag(tag) {
    let postData = {
      UserID: window.Profile.FBUserID,
      TagID: tag.TagID,
      TagName: tag.TagName,
    };
    return HTTP.post(`api/Log/ModifyOrAddATag`, postData);
  },

  async DeleteATag(tag) {
    let postData = {
      UserID: window.Profile.FBUserID,
      TagID: tag.TagID,
      TagName: tag.Name,
    };
    return HTTP.post(`api/Log/DeleteATag`, postData);
  },

  //target
  async ModifyOrAddATarget(tag) {
    let postData = {
      UserID: window.Profile.FBUserID,
      SprintID: window.Profile.Sprint.SprintID,
      TagID: tag.TagID,
      TimeTarget: tag.TimeTarget,
    };
    return HTTP.post(`api/Log/ModifyOrAddATarget`, postData);
  },
  
  //analysis
  async TagsAndLengthOfTime(teammateID = window.Profile.FBUserID) {
    let postData = {
      UserID: teammateID,
      SprintID: window.Profile.Sprint.SprintID,
    };
    return HTTP.post(`api/Log/TagsAndLengthOfTime`, postData);
  }
}
