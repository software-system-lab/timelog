const axios = require('axios')
const Config = require('../config.js')
const DB = require('../DatabaseController.js')

module.exports = class {
  // personal
  async GetUserProfile (FBID) {
    var cmd = 'SELECT * FROM `user` WHERE FBID = ?'
    const dbResult = await DB.query(cmd, [FBID])
    if (dbResult.length !== 0) {
      return dbResult[0]
    }
    return 'no data'
  }

  async getUserProfileByUserID (userID) {
    var cmd = 'SELECT * FROM `user` WHERE UserID = ?'
    const dbResult = await DB.query(cmd, [userID])
    if (dbResult.length !== 0) {
      return dbResult[0]
    }
    return 'no data'
  }

  async Login (data) {
    var cmd = 'SELECT `FBID` FROM `user` WHERE FBID = ?'
    const dbResult = await DB.query(cmd, [data.FBID])

    if (dbResult.length === 0) {
      return 'unregistered'
    } else {
      const accessToken = await axios.get('https://graph.facebook.com/oauth/access_token' +
        `?client_id=${Config.FBAppAccessToken.appId}&client_secret=${Config.FBAppAccessToken.appSecret}&grant_type=client_credentials`)

      const FBVerifyResult = await axios.get('https://graph.facebook.com/debug_token?input_token=' + data.userAccessToken + '&access_token=' + accessToken.data.access_token)

      if (FBVerifyResult.data.data.is_valid) {
        return 'logined'
      }
      return 'error'
    }
  }

  async Register (data) {
    const accessToken = await axios.get('https://graph.facebook.com/oauth/access_token' +
      `?client_id=${Config.FBAppAccessToken.appId}&client_secret=${Config.FBAppAccessToken.appSecret}&grant_type=client_credentials`)

    const FBVerifyResult = await axios.get('https://graph.facebook.com/debug_token?input_token=' + data.UserAccessToken + '&access_token=' + accessToken.data.access_token)

    if (FBVerifyResult.data.data.is_valid) {
      var cmd = 'INSERT INTO `user` (`FBID`, `AccountID`, `UserName`, `Mail`, `Phone`) VALUES (?, ?, ?, ?, ?)'
      const dbResult = await DB.query(cmd, [data.FBID, data.AccountID, data.UserName, data.Mail, data.Phone])
      if (dbResult) {
        return true
      }
    }
    return false
  }

  async EditUserProfile (data) {
    var cmd = 'UPDATE `user` SET `UserName` = ?, `AccountID` = ?, `Mail` = ?, `Phone` = ? WHERE `user`.`UserID` = ?'
    const dbResult = await DB.query(cmd, [data.UserName, data.AccountID, data.Mail, data.Phone, data.UserID])
    if (dbResult) {
      return true
    }
    return false
  }

  // team
  async GetTeamData (teamID) {
    var cmd = 'SELECT `TeamID`, `TeamName`, `Joinable`, `CreatorID` FROM `team` WHERE `TeamID` = ?'
    const dbResult = await DB.query(cmd, [teamID])
    if (dbResult.length !== 0) {
      return dbResult[0]
    }
    return 'no data'
  }

  async CheckTeamPwd (teamID, teamAccessCode) {
    var cmd = 'SELECT `TeamID` FROM `team` WHERE `TeamID` = ? AND `TeamAccessCode` = ?'
    const dbResult = await DB.query(cmd, [teamID, teamAccessCode])
    if (dbResult.length !== 0) {
      return true
    }
    return false
  }

  async GetTeamList (UserID) {
    var cmd = 'SELECT `team`.`TeamID`, `team`.`TeamName` FROM `team`, `user_team_mapping` WHERE `user_team_mapping`.`UserID` = ? AND `user_team_mapping`.`TeamID` = `team`.`TeamID`'
    const dbResult = await DB.query(cmd, [UserID])
    if (dbResult.length !== 0) {
      return dbResult
    }
    return []
  }

  async GetTeamSize (TeamID) {
    var cmd = 'SELECT * FROM `user_team_mapping` WHERE `TeamID` = ?'
    const dbResult = await DB.query(cmd, [TeamID])
    return dbResult.length
  }

  async GetTeammatesByTeamID (teamID) {
    var cmd = 'SELECT * FROM `user`, `user_team_mapping` WHERE `TeamID` = ? AND user.UserID=user_team_mapping.UserID'
    const dbResult = await DB.query(cmd, [teamID])
    if (dbResult.length !== 0) {
      return dbResult
    }
    return 'no data'
  }

  async GetTimeBoxes (userID) {
    var cmd = 'SELECT * FROM `time_box` WHERE `UserID` = ?'
    return DB.query(cmd, [userID])
  }

  async GetTimeBoxByID (timeBoxID) {
    const cmd = 'SELECT * FROM `time_box` WHERE `TimeBoxID` = ?'
    const dbResult = await DB.query(cmd, [timeBoxID])
    if (dbResult.length > 0) {
      return dbResult[0]
    }
    return { timeBoxID: null }
  }

  async EditTimeBox (data) {
    var cmd
    var params = []
    if (data.TimeBoxID === null) {
      cmd = 'INSERT INTO `time_box` (`UserID`, `TimeBoxName`, `StartDate`, `EndDate`, `Content`) VALUES (?, ?, ?, ?, ?) '
      params.push(data.UserID, data.TimeBoxName, data.StartDate, data.EndDate, data.Content)
    } else {
      cmd = 'UPDATE `time_box` SET `TimeBoxName` = ?, `StartDate` = ?, `EndDate` = ?, `Content` = ?, `UpdateTime` = ? WHERE `TimeBoxID` = ?'
      params.push(data.TimeBoxName, data.StartDate, data.EndDate, data.Content, new Date(), data.TimeBoxID)
    }
    const dbResult = await DB.query(cmd, params)
    if (!dbResult) {
      return false
    }
    return true
  }

  async ChangeTimeBox (data) {
    const cmd = 'UPDATE `user` SET `CurrentTimeBoxID` = ? WHERE `UserID` = ?'
    const dbResult = await DB.query(cmd, [data.TimeBoxID, data.UserID])
    if (dbResult.length > 0) {
      return true
    }
    return false
  }
}
