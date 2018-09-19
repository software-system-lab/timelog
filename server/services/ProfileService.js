const axios = require('axios');
const Config = require('../config.js');
const DB = require('../DatabaseController.js');

module.exports = class {
  constructor() {

  }

  async GetUserProfile(userID) {
    var cmd = "SELECT `FBUserID`,`UserName`,`Team`,`Mail` FROM `user` WHERE FBUserID = ?";
    let dbResult = await DB.query(cmd, [userID]);
    if(dbResult.length != 0)
      return dbResult;
    return "no data";
  }

  async Login(data) {
    var cmd = "SELECT `FBUserID` FROM `user` WHERE FBUserID = ?";
    let dbResult = await DB.query(cmd, [data.userID]);
    if (dbResult.length == 0)
      return "unregistered";
    else {
      let access_token = await axios.get(`https://graph.facebook.com/oauth/access_token` +
        `?client_id=${Config.FBAppAccessToken.appId}&client_secret=${Config.FBAppAccessToken.appSecrete}&grant_type=client_credentials`);

      let FBVerifyResult = await axios.get(`https://graph.facebook.com/debug_token?input_token=` + data.userAccessToken + `&access_token=` + access_token.data.access_token);

      if (FBVerifyResult.data.data.is_valid)
        return "logined";
      return "error";
    }
  }
}
