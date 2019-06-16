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
    var cmd = "UPDATE `log` SET `ProjectID` = ?, `Title` = ?, `StartTime` = ?, `EndTime` = ?, `Description` = ? WHERE `LogID` = ?";
    let dbResult = await DB.query(cmd, [data.ProjectID, data.Title, data.StartTime, data.EndTime, data.Description, data.LogID]);
    if (dbResult)
      return true;
    return false;
  }

  async DeleteALog(data) {
    var cmd = "UPDATE `log` SET `IsDeleted` = ? WHERE `LogID` = ?;";
    let dbResult = await DB.query(cmd, [true, data.LogID]);
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

  async GetUserLogsByIterationID(iterationID) {
    var cmd = "SELECT * FROM `log`, `iteration` WHERE `log`.`StartTime` >= `iteration`.`StartDate` AND `log`.`EndTime` <= `iteration`.`EndDate` AND `IterationID` = ?";
    let dbResult = await DB.query(cmd, [iterationID]);
    if (dbResult.length != 0)
      return dbResult;
    return "no data";
  }

  async GetUserLogsBySearch(data) {
    console.log(data)
    var params = [];
    var cmd = "SELECT `log`.*, `project`.`ProjectName` FROM `log`, `project` WHERE `log`.`ProjectID` = `project`.`ProjectID` AND `log`.`IsDeleted` = ? AND (`log`.`Title` LIKE ? OR `log`.`Description` LIKE ?) ";
    params.push(false);
    params.push("%" + data.Description + "%", "%" + data.Description + "%");
    if (data.StartTime && data.EndTime) {
      cmd += " AND (`log`.`StartTime` >= ? AND `log`.`EndTime` <= ?)";
      params.push(data.StartTime, data.EndTime);
    }
    let dbResult = await DB.query(cmd, params);
    if (dbResult.length != 0)
      return dbResult;
    return "no data";
  }

  ////projects
  async GetUserProjects(data) {
    var cmd = "SELECT `ProjectID`, `ProjectName`, `IsPrivate`, `IsEnable` FROM `project` WHERE `UserID` = ? AND `IsDeleted` = ? ";
    let dbResult = await DB.query(cmd, [data, 0]);
    if (dbResult.length != 0)
      return dbResult;
    return "no data";
  }

  async ModifyOrAddAProject(data) {
    var dbResult;
    if (data.ProjectID == null) {
      var cmd = "INSERT INTO `project` (`UserID`, `ProjectName`, `IsPrivate`, `IsEnable`) VALUES (?, ?, ?, ?);";
      dbResult = await DB.query(cmd, [data.UserID, data.ProjectName, data.IsPrivate, data.IsEnable]);
    } else {
      var cmd = "UPDATE `project` SET `ProjectName` = ?, `IsPrivate` = ?, `IsEnable` = ? WHERE `ProjectID` = ?;";
      dbResult = await DB.query(cmd, [data.ProjectName, data.IsPrivate, data.IsEnable, data.ProjectID]);
    }
    if (dbResult)
      return true;
    return false;
  }

  async DeleteATag(projectID) {
    var cmd = "UPDATE `project` SET `IsDeleted` = ? WHERE `ProjectID` = ?;";
    let dbResult = await DB.query(cmd, [true, projectID]);
    if (dbResult)
      return true;
    return false;
  }

  //target
  async QueryTargetBySprint(data) {
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

  //// Iteration
  async CurrentIterationByIterationID(iterationID) {
    var cmd = "SELECT * FROM `iteration` WHERE iterationID = ?";
    let dbResult = await DB.query(cmd, [iterationID]);
    if (dbResult.length != 0)
      return dbResult;
    return "no data"
  }
}