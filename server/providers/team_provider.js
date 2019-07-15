const DB = require('../DatabaseController.js');

module.exports = class {
  async getTeamName(teamID) {
    var cmd = "SELECT `TeamName` FROM `team` WHERE `TeamID` = ?";
    return await DB.query(cmd, [teamID])
  }
}