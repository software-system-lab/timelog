const DB = require('../DatabaseController.js');

module.exports = class {
  constructor() {

  }

  async AddALog(data) {
    var cmd = "INSERT INTO `log` (`FBUserID`, `TagsID`, `TagsString`, `Title`, `Date`, `StartTime`, `EndTime`, `Description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    let dbResult = await DB.query(cmd, [data.UserID, 1, data.TagsString, data.Title, data.Date, data.StartTime, data.EndTime, data.Description]);
    if (dbResult)
      return true;
    return false;
  }
}
