const axios = require('axios');
const Config = require('../config.js');
const DB = require('../DatabaseController.js');

module.exports = class {
  constructor() {

  }
  ////personal
  async GetUserProfile(FBID) {
    var cmd = "SELECT * FROM `user` WHERE FBID = ?";
    let dbResult = await DB.query(cmd, [FBID]);
    if (dbResult.length != 0)
      return dbResult[0];
    return "no data";
  }

  async getUserProfileByUserID(userID) {
    var cmd = "SELECT * FROM `user` WHERE UserID = ?";
    let dbResult = await DB.query(cmd, [userID]);
    if (dbResult.length != 0)
      return dbResult[0];
    return "no data";
  }

  async Login(data) {
    var cmd = "SELECT `FBID` FROM `user` WHERE FBID = ?";
    let dbResult = await DB.query(cmd, [data.FBID]);

    if (dbResult.length == 0)
      return "unregistered";
    else {
      let access_token = await axios.get(`https://graph.facebook.com/oauth/access_token` +
        `?client_id=${Config.FBAppAccessToken.appId}&client_secret=${Config.FBAppAccessToken.appSecret}&grant_type=client_credentials`);

      let FBVerifyResult = await axios.get(`https://graph.facebook.com/debug_token?input_token=` + data.userAccessToken + `&access_token=` + access_token.data.access_token);

      if (FBVerifyResult.data.data.is_valid)
        return "logined";
      return "error";
    }
  }

  async Register(data) {
    let access_token = await axios.get(`https://graph.facebook.com/oauth/access_token` +
      `?client_id=${Config.FBAppAccessToken.appId}&client_secret=${Config.FBAppAccessToken.appSecret}&grant_type=client_credentials`);

    let FBVerifyResult = await axios.get(`https://graph.facebook.com/debug_token?input_token=` + data.UserAccessToken + `&access_token=` + access_token.data.access_token);

    if (FBVerifyResult.data.data.is_valid) {
      var cmd = "INSERT INTO `user` (`FBID`, `AccountID`, `UserName`, `Mail`, `Phone`) VALUES (?, ?, ?, ?, ?);";
      let dbResult = await DB.query(cmd, [data.FBID, data.AccountID, data.UserName, data.Mail, data.Phone]);
      if (dbResult)
        return true;
    }
    return false;
  }

  async EditUserProfile(data) {
    var cmd = "UPDATE `user` SET `UserName` = ?, `AccountID` = ?, `Mail` = ?, `Phone` = ? WHERE `user`.`UserID` = ?";
    let dbResult = await DB.query(cmd, [data.UserName, data.AccountID, data.Mail, data.Phone, data.UserID]);
    if (dbResult)
      return true;
    return false;
  }


  ////team
  async GetTeamData(teamID) {
    var cmd = "SELECT `TeamID`, `TeamName`, `Joinable`, `CreatorID` FROM `team` WHERE `TeamID` = ?";
    let dbResult = await DB.query(cmd, [teamID]);
    if (dbResult.length != 0)
      return dbResult[0];
    return "no data";
  }

  async CheckTeamPwd(teamID, teamAccessCode) {
    var cmd = "SELECT `TeamID` FROM `team` WHERE `TeamID` = ? AND `TeamAccessCode` = ?";
    let dbResult = await DB.query(cmd, [teamID, teamAccessCode]);
    if (dbResult.length != 0)
      return true;
    return false;
  }

  async GetTeamList(UserID) {
    var cmd = "SELECT `team`.`TeamID`, `team`.`TeamName` FROM `team`, `user_team_mapping` WHERE `user_team_mapping`.`UserID` = ? AND `user_team_mapping`.`TeamID` = `team`.`TeamID`";
    let dbResult = await DB.query(cmd, [UserID]);
    if (dbResult.length != 0)
      return dbResult;
    return [];
  }

  async GetTeamSize(TeamID) {
    var cmd = "SELECT * FROM `user_team_mapping` WHERE `TeamID` = ?";
    let dbResult = await DB.query(cmd, [TeamID]);
    return dbResult.length
  }

  async GetTeammatesByTeamID(teamID) {
    var cmd = "SELECT * FROM `user`, `user_team_mapping` WHERE `TeamID` = ? AND user.UserID=user_team_mapping.UserID"
    let dbResult = await DB.query(cmd, [teamID]);
    if (dbResult.length != 0)
      return dbResult;
    return "no data";
  }

  async GetIterations(userID) {
    var cmd = "SELECT * FROM `iteration` WHERE `UserID` = ?";
    return await DB.query(cmd, [userID])
  }

  async GetIterationByID(iterationID) {
    let cmd = "SELECT * FROM `iteration` WHERE `IterationID` = ?";
    let dbResult = await DB.query(cmd, [iterationID]);
    if (dbResult.length > 0) {
      return dbResult[0];
    }
    return {iterationID: null};
  }

  async EditIteration(data) {
    var cmd;
    var params = [];
    if (data.IterationID === null) {
      cmd = "INSERT INTO `iteration` (`UserID`, `IterationName`, `StartDate`, `EndDate`, `Content`) VALUES (?, ?, ?, ?, ?); ";
      params.push(data.UserID, data.IterationName, data.StartDate, data.EndDate, data.Content);
    } else {
      cmd = "UPDATE `iteration` SET `IterationName` = ?, `StartDate` = ?, `EndDate` = ?, `Content` = ?, `UpdateTime` = ? WHERE `IterationID` = ?";
      params.push(data.IterationName, data.StartDate, data.EndDate, data.Content, new Date, data.IterationID);
    }
    let dbResult = await DB.query(cmd, params);
    if (!dbResult) {
      return false
    }
    return true
  }

  async ChangeIteration(data) {
    let cmd = "UPDATE `user` SET `CurrentIterationID` = ? WHERE `UserID` = ?";
    let dbResult = await DB.query(cmd, [data.IterationID, data.UserID]);
    if (dbResult.length > 0)
      return true;
    return false;
  }
}
