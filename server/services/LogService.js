const DB = require('../DatabaseController.js');

module.exports = class {
  constructor() {

  }

  //tag
  async AddALog(data) {
    var cmd = "INSERT INTO `log` (`FBUserID`, `Tags`, `Title`, `Date`, `StartTime`, `EndTime`, `Description`) VALUES (?, ?, ?, ?, ?, ?, ?);";
    let dbResult = await DB.query(cmd, [data.UserID, data.TagsString, data.Title, data.Date, data.StartTime, data.EndTime, data.Description]);
    if (dbResult)
      return true;
    return false;
  }

  //log
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
}