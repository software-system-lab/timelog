const DB = require('../DatabaseController.js');

module.exports = class {
  constructor() {

  }

  ////log
  async AddALog(data) {
    var cmd = "INSERT INTO `log` (`FBUserID`, `Tags`, `SprintID`, `Title`, `Date`, `StartTime`, `EndTime`, `Description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    let dbResult = await DB.query(cmd, [data.UserID, data.TagsString, data.SprintID, data.Title, data.Date, data.StartTime, data.EndTime, data.Description]);
    if (dbResult)
      return true;
    return false;
  }

  async ModifyALog(data) {
    var cmd = "UPDATE `log` SET `Tags` = ?, `Title` = ?, `Date` = ?, `StartTime` = ?, `EndTime` = ?, `Description` = ? WHERE `log`.`LogID` = ?";
    let dbResult = await DB.query(cmd, [data.TagsString, data.Title, data.Date, data.StartTime, data.EndTime, data.Description, data.LogID]);
    if (dbResult)
      return true;
    return false;
  }

  async DeleteALog(data) {
    var cmd = "DELETE FROM `log` WHERE `log`.`LogID` = ?;";
    let dbResult = await DB.query(cmd, [data.LogID]);
    if (dbResult)
      return true;
    return false;
  }

  async GetALog(logID) {
    var cmd = "SELECT * FROM `log` WHERE `LogID` = ?;";
    let dbResult = await DB.query(cmd, [logID]);
    if (dbResult.length != 0)
      return dbResult[0];
    return "no data";;
  }

  async GetUserLogsInCurrentSprint(data) {
    var cmd = "SELECT * FROM `log` WHERE`FBUserID` = ? AND `SprintID` = ?;";
    let dbResult = await DB.query(cmd, [data.UserID, data.SprintID]);
    if (dbResult.length != 0)
      return dbResult;
    return "no data";
  }

  ////tag
  async GetUserTags(data) {
    var cmd = "SELECT * FROM `tag` WHERE `FBUserID` = ?";
    let dbResult = await DB.query(cmd, [data]);
    if (dbResult.length != 0)
      return dbResult;
    return "no data";
  }

  async ModifyOrAddATag(data) {
    var dbResult;
    if (data.TagID == null) {
      var cmd = "INSERT INTO `tag` (`FBUserID`, `TagName`) VALUES (?, ?);";
      dbResult = await DB.query(cmd, [data.UserID, data.TagName]);
    } else {
      var cmd = "UPDATE `tag` SET `TagName` = ? WHERE `tag`.`TagID` = ?;";
      dbResult = await DB.query(cmd, [data.TagName, data.TagID]);
    }
    if (dbResult)
      return true;
    return false;
  }

  async DeleteATag(TagID) {
    var cmd = "DELETE FROM `tag` WHERE `tag`.`TagID` = ?";
    let dbResult = await DB.query(cmd, [TagID]);
    if (dbResult)
      return true;
    return false;
  }

  //target
  async QueryTarget(data) {
    var cmd = "SELECT * FROM `target` WHERE `UserID` = ? AND `SprintID` =?;";
    let dbResult = await DB.query(cmd, [data.UserID, data.SprintID]);
    if (dbResult.length != 0)
      return dbResult;
    return "no data";
  }

  async ModifyOrAddATarget(data) {
    var cmd = "INSERT INTO `target` (`UserID`, `SprintID`, `TagID`, `TargetHour`) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE `TargetHour` = ?;";
    let dbResult = await DB.query(cmd, [data.UserID, data.SprintID, data.TagID, data.TimeTarget, data.TimeTarget]);
    if (dbResult)
      return true;
    return false;
  }
}
