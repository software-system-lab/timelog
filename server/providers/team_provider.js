const DB = require('../DatabaseController.js');

module.exports = class {
  async getTeamName(teamID) {
    var cmd = "SELECT `TeamName` FROM `team` WHERE `TeamID` = ?";
    return await DB.query(cmd, [teamID])
  }

  async createTeam(params) {
    var createTeamCmd = "INSERT INTO `team` (`TeamName`, `TeamAccessCode`, `Joinable`, `CreatorID`) VALUES (?, ?, ?, ?)";
    let teamResult = await DB.query(createTeamCmd, [params.TeamName, params.TeamCode, true, params.UserID]);
    var createUserTeamMapCmd = "INSERT INTO `user_team_mapping` (`UserID`, `TeamID`) VALUES(?, ?)";
    let mapResult = await (DB.query(createUserTeamMapCmd, [params.UserID, teamResult.insertId]))
    if (mapResult)
      return teamResult.insertId;
    return false;
  }

  async joinTeam(params) {
    var checkTeamExist = "SELECT * FROM `team` WHERE `TeamName` = ?"
    let checkResult = await DB.query(checkTeamExist, [params.TeamName]);
    if (checkResult.length === 0) return "Not found";
    const teamID = checkResult[0].TeamID
    var checkCmd = "SELECT * FROM `team` WHERE `TeamName` = ? AND `TeamAccessCode` = ? AND `Joinable` = ?";
    checkResult = await DB.query(checkCmd, [params.TeamName, params.TeamCode, true])
    if (checkResult.length === 0) return "Forbidden"
    var cmd = "INSERT INTO `user_team_mapping` (`UserID`, `TeamID`) VALUES(?, ?)";
    let result = await DB.query(cmd, [params.UserID, teamID])
    if (result)
      return teamID
    return "Internal Error"
  }
}