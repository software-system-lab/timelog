const DB = require('../DatabaseController.js')

module.exports = class {
  // log
  async AddALog (data) {
    var cmd = 'INSERT INTO `log` (`UserID`, `ActivityID`, `Title`, `StartTime`, `EndTime`, `Description`) VALUES (?, ?, ?, ?, ?, ?)'
    const dbResult = await DB.query(cmd, [data.UserID, data.ActivityID, data.Title, data.StartTime, data.EndTime, data.Description])
    if (dbResult) {
      return true
    }
    return false
  }

  async ModifyALog (data) {
    var cmd = 'UPDATE `log` SET `ActivityID` = ?, `Title` = ?, `StartTime` = ?, `EndTime` = ?, `Description` = ? WHERE `LogID` = ?'
    const dbResult = await DB.query(cmd, [data.ActivityID, data.Title, data.StartTime, data.EndTime, data.Description, data.LogID])
    if (dbResult) {
      return true
    }
    return false
  }

  async DeleteALog (data) {
    var cmd = 'UPDATE `log` SET `IsDeleted` = ? WHERE `LogID` = ?'
    const dbResult = await DB.query(cmd, [true, data.LogID])
    if (dbResult) {
      return true
    }
    return false
  }

  async GetALog (logID) {
    var cmd = 'SELECT * FROM `log` WHERE `LogID` = ?'
    const dbResult = await DB.query(cmd, [logID])
    if (dbResult.length !== 0) {
      return dbResult[0]
    }
    return 'no data'
  }

  async GetUserLogsByTimeBoxID (userID, timeBoxID) {
    var cmd = 'SELECT * FROM `log`, `time_box` WHERE `log`.`UserID` = ? AND `log`.`StartTime` >= `time_box`.`StartDate` AND `log`.`EndTime` <= DATE_ADD(`time_box`.`EndDate`, INTERVAL 1 DAY) AND `TimeBoxID` = ? AND `log`.`IsDeleted` = ?'
    const dbResult = await DB.query(cmd, [userID, timeBoxID, false])
    return dbResult
  }

  async GetUserLogsByRange (userID, startDate, endDate) {
    var cmd = 'SELECT * FROM `log` WHERE `UserID` = ? AND `StartTime` >= ? AND `EndTime` <= ? AND `IsDeleted` = ?'
    const result = await DB.query(cmd, [userID, startDate, endDate, false])
    return result
  }

  async GetUserLogsBySearch (data) {
    var params = []
    var cmd = 'SELECT `log`.* FROM `log` WHERE `log`.`IsDeleted` = ? AND `log`.`UserID` = ? AND (`log`.`Title` LIKE ? OR `log`.`Description` LIKE ?)'
    params.push(false)
    params.push(data.UserID)
    params.push('%' + data.Description + '%', '%' + data.Description + '%')
    if (data.StartTime && data.EndTime) {
      cmd += ' AND (`log`.`StartTime` >= ? AND `log`.`EndTime` < ?)'
      params.push(data.StartTime, data.EndTime)
    }
    const dbResult = await DB.query(cmd, params)
    if (dbResult.length !== 0) {
      return dbResult
    }
    return 'no data'
  }

  // task types
  async GetUserActivities (userID) {
    var cmd = 'SELECT * FROM `activity` WHERE `UserID` = ? AND `IsDeleted` = ?'
    const dbResult = await DB.query(cmd, [userID, false])
    return dbResult
  }

  async ModifyOrAddAnActivity (data) {
    var dbResult
    if (data.ActivityID == null) {
      const cmd = 'INSERT INTO `activity` (`UserID`, `ActivityName`, `IsPrivate`, `IsEnable`) VALUES (?, ?, ?, ?)'
      dbResult = await DB.query(cmd, [data.UserID, data.ActivityName, data.IsPrivate, data.IsEnable])
    } else {
      const cmd = 'UPDATE `activity` SET `ActivityName` = ?, `IsPrivate` = ?, `IsEnable` = ? WHERE `ActivityID` = ?'
      dbResult = await DB.query(cmd, [data.ActivityName, data.IsPrivate, data.IsEnable, data.ActivityID])
    }
    if (dbResult) {
      return true
    }
    return false
  }

  async DeleteAnActivity (activityID) {
    var cmd = 'UPDATE `activity` SET `IsDeleted` = ? WHERE `ActivityID` = ?'
    const dbResult = await DB.query(cmd, [true, activityID])
    if (dbResult) {
      return true
    }
    return false
  }

  // target
  async QueryGoalByTimeBox (data) {
    var cmd = 'SELECT * FROM `goal` WHERE `TimeBoxID` =? '
    const dbResult = await DB.query(cmd, [data.TimeBoxID])
    if (dbResult.length > 0) {
      return dbResult
    }
    return 'no data'
  }

  async ModifyOrAddAGoal (data) {
    var cmd = 'INSERT INTO `goal` (`TimeBoxID`, `ActivityID`, `GoalHour`) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE `GoalHour` = ?'
    const dbResult = await DB.query(cmd, [data.TimeBoxID, data.ActivityID, data.GoalHour, data.GoalHour])
    if (dbResult) {
      return true
    }
    return false
  }

  // TimeBox
  async QueryTimeBoxByTimeBoxID (timeBoxID) {
    var cmd = 'SELECT * FROM `time_box` WHERE timeBoxID = ?'
    const dbResult = await DB.query(cmd, [timeBoxID])
    if (dbResult.length !== 0) {
      return dbResult
    }
    return 'no data'
  }
}
