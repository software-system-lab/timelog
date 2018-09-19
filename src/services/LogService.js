import HTTP from './HttpRequest'

/**
 * Log APIs
 */
export default {
  //log
  async AddALog(logData) {
    let postData = {
      UserID: window.userProfile.id,
      //TagsID,
      TagsString: JSON.stringify(logData.Category),
      Title: logData.Event,
      Date: logData.Date,
      StartTime: logData.Duration[0],
      EndTime: logData.Duration[1],
      Description: logData.Description
    };
    return HTTP.post(`api/Log/AddALog`, postData);
  },

  //tag
  async GetUserTags() {
    return HTTP.post(`api/Log/GetUserTags`, {
      userID: window.userProfile.id
    });
  },

  async ModifyOrAddATag(tag) {
    let postData = {
      UserID: window.userProfile.id,
      TagID: tag.TagID,
      TagName: tag.Name,
    };
    return HTTP.post(`api/Log/ModifyOrAddATag`, postData);
  },

  async DeleteATag(tag) {
    let postData = {
      UserID: window.userProfile.id,
      TagID: tag.TagID,
      TagName: tag.Name,
    };
    return HTTP.post(`api/Log/DeleteATag`, postData);
  }
}
