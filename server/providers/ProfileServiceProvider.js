const axios = require('axios');
const Config = require('../config.js');
const DB = require('../DatabaseController.js');

module.exports = class {
  constructor() {

  }
  ////personal
  async GetUserProfile(userID) {
    var cmd = "SELECT `FBUserID`,`UserName`,`Team`,`Mail` FROM `user` WHERE FBUserID = ?";
    let dbResult = await DB.query(cmd, [userID]);
    if (dbResult.length != 0)
      return dbResult[0];
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

  async Register(data) {
    let access_token = await axios.get(`https://graph.facebook.com/oauth/access_token` +
      `?client_id=${Config.FBAppAccessToken.appId}&client_secret=${Config.FBAppAccessToken.appSecrete}&grant_type=client_credentials`);

    let FBVerifyResult = await axios.get(`https://graph.facebook.com/debug_token?input_token=` + data.UserAccessToken + `&access_token=` + access_token.data.access_token);

    let TeamVerifyResult = await this.CheckTeamPwd(data.TeamID, data.TeamPwd);

    if (FBVerifyResult.data.data.is_valid && TeamVerifyResult) {
      var cmd = "INSERT INTO `user` (`FBUserID`, `UserName`, `Mail`, `Phone`, `Team`) VALUES (?, ?, ?, ?, ?);";
      let dbResult = await DB.query(cmd, [data.UserID, data.UserName, data.Email, data.PhoneNumber, data.TeamID]);
      if (dbResult)
        return true;
    }
    return false;
  }


  ////team
  async GetTeamData(teamID) {
    var cmd = "SELECT `TeamID`,`TeamName`,`NowSprint` FROM `team` WHERE `TeamID` = ?";
    let dbResult = await DB.query(cmd, [teamID]);
    if (dbResult.length != 0)
      return dbResult[0];
    return "no data";
  }

  async CheckTeamPwd(teamID, teamPwd) {
    var cmd = "SELECT `TeamID` FROM `team` WHERE `TeamID` = ? AND `TeamPwd` = ?";
    let dbResult = await DB.query(cmd, [teamID, teamPwd]);
    if (dbResult.length != 0)
      return true;
    return false;
  }

  async GetAllTeam() {
    var cmd = "SELECT `TeamID`,`TeamName` FROM `team`";
    let dbResult = await DB.query(cmd, []);
    if (dbResult.length != 0)
      return dbResult;
    return "no data";
  }

  async ChangeSprint(data) {
    var cmd = "UPDATE `team` SET `NowSprint` = ? WHERE `team`.`TeamID` = ?;";
    var dbResult = await DB.query(cmd, [data.SprintID, data.TeamID]);
    if (dbResult)
      return true;
    return false;
  }

  //sprint
  async GetSprints(teamID) {
    var cmd = "SELECT * FROM `sprint` WHERE `TeamID` = ? ORDER BY `EndDate` DESC LIMIT 30";
    let dbResult = await DB.query(cmd, [teamID]);
    if (dbResult.length != 0)
      return dbResult;
    return "no data";
  }

  async GetSprintById(sprintID) {
    var cmd = "SELECT * FROM `sprint` WHERE `SprintID` = ? ";
    let dbResult = await DB.query(cmd, [sprintID]);
    if (dbResult.length != 0)
      return dbResult[0];
    return "no data";
  }

  async ModifyOrAddASprint(data) {
    var dbResult;
    if (data.SprintID == null) {
      var cmd = "INSERT INTO `sprint` (`SprintName`, `TeamID`, `StartDate`, `EndDate`, `Content`) VALUES (?, ?, ?, ?, ?);";
      dbResult = await DB.query(cmd, [data.SprintName, data.TeamID, data.StartDate, data.EndDate, data.Content]);
    } else {
      var cmd = "UPDATE `sprint` SET `SprintName` = ?, `StartDate` = ?, `EndDate` = ?, `Content` = ? WHERE `sprint`.`SprintID` = ?;";
      dbResult = await DB.query(cmd, [data.SprintName, data.StartDate, data.EndDate, data.Content, data.SprintID]);
    }
    if (dbResult)
      return true;
    return false;
  }

  async DeleteASprint(sprintID) {
    var cmd = "DELETE FROM `sprint` WHERE `sprint`.`SprintID` = ?;";
    var dbResult = await DB.query(cmd, [sprintID]);
    if (dbResult)
      return true;
    return false;
  }
}
