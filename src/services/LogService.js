import HTTP from './HttpRequest'

/**
 * Log APIs
 */
export default {
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
    }
    return HTTP.post(`api/Log/AddALog`, postData);
  }
}
