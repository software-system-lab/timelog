const DB = require('../DatabaseController')

module.exports = class {
  async save(userID, startDate, endDate) {
    var checkCmd = "SELECT * FROM `published_log` WHERE UserID=?"
    let logs = await DB.query(checkCmd, [userID])
    if (logs.length === 0) {
      var newPublishCmd = "INSERT INTO `published_log` (`UserID`, `StartDate`, `EndDate`) VALUES (?, ?, ?)"
      await DB.query(newPublishCmd, [userID, startDate, endDate])
    } else {
      var updatePublishCmd = "UPDATE `published_log` SET `StartDate` = ?, `EndDate` = ?, `UpdateTime` = ? WHERE `UserID` = ?"
      await DB.query(updatePublishCmd, [startDate, endDate, new Date(), userID])
    }
  }
  async getAll() {
    var cmd = "SELECT * FROM `published_log` WHERE 1"
    return await DB.query(cmd)
  }
}
