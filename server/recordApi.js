const DataBaseController = require('../DatabaseController.js');

module.exports = class {
  constructor() {
    this.db = DataBaseController.GetDB();
    this.data = null;
  }

  addALog(data, callback) {
    var time_start = data.recordDate + " " + data.recordStart;
    var time_until = data.recordDate + " " + data.recordStop;
    var cmd = "INSERT INTO `record` (`User`, `Tag`, `Time_start`, `Time_until`, `Comment`) \
VALUES (" + data.user + "," + data.Tag + ",'" + time_start + "','" + time_until + "','" + data.Comment + "');";
    console.log(cmd);
    this.db.query(
      cmd,
      function(err, result, fields) {
        callback(err, result);
      });
  }
}