const DataBaseController = require('../DatabaseController.js');

module.exports = class {
  constructor() {
    this.db = DataBaseController.GetDB();
    this.data = null;
  }

  GetUserTags(user, callback) {
    var cmd = "SELECT * FROM `typetag` WHERE `User` = '" + user + "';";
    //console.log(cmd);
    this.db.query(
      cmd,
      function(err, results, fields) {
        callback(err, results);
      });
  }
}