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
}