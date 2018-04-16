const DataBaseController = require('../DatabaseController.js');

module.exports = class {
  constructor() {
    this.db = DataBaseController.GetDB();
    this.data = null;
  }

  addALog(data, callback) {
    var time_start = data.recordDate + " " + data.recordStart;
    var time_until = data.recordDate + " " + data.recordStop;
    var tag = data.Tag;
    if (tag != "NULL")
      tag = "'" + tag + "'";
    var cmd = "INSERT INTO `record` (`User`, `Event`, `Tag`, `Time_start`, `Time_until`, `Comment`) \
VALUES (" + data.user + ",'" + data.Event + "'," + tag + ",'" + time_start + "','" + time_until + "','" + data.Comment + "');";
    //console.log(cmd);
    this.db.query(
      cmd,
      function(err, result, fields) {
        callback(err, result);
      });
  }

  modifyALog(data, callback) {
    var time_start = data.recordDate + " " + data.recordStart;
    var time_until = data.recordDate + " " + data.recordStop;
    var tag = data.Tag;
    if (tag != "NULL")
      tag = "'" + tag + "'";
    var cmd = "UPDATE `record` SET `Event`='" + data.Event + "',`Tag`=" + tag + ",`Time_start`='" + time_start + "',`Time_until`='" + time_until + "',`Comment`='" + data.Comment + "' WHERE `RecordID`=" + data.RecordID + ";";
    //console.log(cmd);
    this.db.query(
      cmd,
      function(err, result, fields) {
        callback(err, result);
      });
  }

  deleteALog(recordID, callback) {
    var cmd = "DELETE FROM `record` WHERE `record`.`RecordID` = " + recordID + ";";
    //console.log(cmd);
    this.db.query(
      cmd,
      function(err, result, fields) {
        callback(err, result);
      });
  }

  GetRecentLog(user, callback) {
    var cmd = "SELECT `RecordID`,`Event`, `Tag`, DATE_FORMAT(Time_start,'%Y-%m-%d') AS Date, DATE_FORMAT(TIMEDIFF(`Time_until`,`Time_start`),'%k:%i') AS timeInterval FROM `record` WHERE User ='" + user + "'ORDER BY `Time_until` DESC LIMIT 8;";
    //console.log(cmd);
    this.db.query(
      cmd,
      function(err, result, fields) {
        callback(err, result);
      });
  }

  GetALog(recordID, callback) {
    var cmd = "SELECT `Event`, `Tag`, DATE_FORMAT(Time_start,'%Y-%m-%d') AS `Date`, DATE_FORMAT(Time_start,'%k:%i') AS Start, DATE_FORMAT(Time_until,'%k:%i') AS End \
      , DATE_FORMAT(TIMEDIFF(`Time_until`,`Time_start`),'%k:%i') AS timeInterval,`Comment` FROM `record` WHERE RecordID ='" + recordID + "';";
    //console.log(cmd);
    this.db.query(
      cmd,
      function(err, result, fields) {
        callback(err, result);
      });
  }

  GetDurationData(duration, callback) {
    var cmd = "SELECT `RecordID`,`Event`, `Tag`, DATE_FORMAT(Time_start,'%Y-%m-%d') AS `Date`, DATE_FORMAT(Time_start,'%k:%i') AS Start, DATE_FORMAT(Time_until,'%k:%i') AS End \
      , DATE_FORMAT(TIMEDIFF(`Time_until`,`Time_start`),'%k:%i') AS timeInterval,`Comment` FROM `record` \
     WHERE User ='" + duration.user + "' AND Time_start BETWEEN '" + duration.start + "' AND '" + duration.end + "' ORDER BY `Time_until` DESC";
    // console.log(cmd);
    this.db.query(
      cmd,
      function(err, result, fields) {
        callback(err, result);
      });
  }
}