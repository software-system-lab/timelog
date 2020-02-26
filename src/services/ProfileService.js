import HTTP from './HttpRequest'
import moment from 'moment'
/**
 * Profile APIs
 */
export default {
  // personal
  GetProfile () {
    return HTTP.post('/Profile/GetProfile', {
      FBID: window.FBProfile.id
    })
  },

  Login (FBID, userAccessToken) {
    const req = {
      FBID,
      userAccessToken
    }
    return HTTP.post('/Profile/Login', req)
  },

  Register (userData, userAccessToken) {
    const postData = userData
    postData.UserAccessToken = userAccessToken
    return HTTP.post('/Profile/Register', postData)
  },

  EditUserProfile (data) {
    return HTTP.post('/Profile/EditUserProfile', data)
  },

  GetTeamList (UserID) {
    return HTTP.get(`/Profile/GetTeamList?id=${UserID}`)
  },

  // teams
  GetTeammates (teamID) {
    const req = {
      TeamID: teamID
    }
    return HTTP.post('/Profile/GetTeammates', req)
  },

  // TimeBox
  ChangeTimeBox (timeBoxID) {
    const req = {
      TimeBoxID: timeBoxID,
      UserID: window.Profile.UserID
    }
    return HTTP.post('/Profile/ChangeTimeBox', req)
  },

  GetTimeBoxes () {
    const req = {
      UserID: window.Profile.UserID
    }
    return HTTP.post('/Profile/GetTimeBoxes', req)
  },

  GetTimeBoxById (id) {
    const req = {
      TimeBoxID: id
    }
    return HTTP.post('/Profile/GetTimeBoxById', req)
  },

  async ModifyOrAddATimeBox (rowData) {
    const req = {
      TimeBoxID: rowData.TimeBoxID,
      TimeBoxName: rowData.TimeBoxName,
      UserID: window.Profile.UserID,
      StartDate: moment(rowData.StartDate).format('YYYY-MM-DD'),
      EndDate: moment(rowData.EndDate).format('YYYY-MM-DD'),
      Content: rowData.Content
    }
    const result = await HTTP.post('/Profile/EditTimeBox', req)
    return result.TimeBoxID
  },

  DeleteATimeBox (rowData) {
    const req = {
      TimeBoxID: rowData.TimeBoxID
    }
    return HTTP.post('/Profile/DeleteATimeBox', req)
  },

  async getCurrentTimeBox () {
    const req = {
      UserID: window.Profile.UserID
    }
    const result = await HTTP.post('/Profile/timeBox/current', req)
    return result.TimeBoxID
  },

  getCurrentTimeBoxRange () {
    const req = {
      UserID: window.Profile.UserID
    }
    return HTTP.post('/Profile/timeBox/currentRange', req)
  }
}
