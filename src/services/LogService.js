import HTTP from './HttpRequest'
import moment from 'moment'
/**
 * Log APIs
 */
export default {
  //log
  async AddALog(logData) {
    let postData = {
      UserID: window.Profile.UserID,
      ActivityID: logData.ActivityID,
      Title: logData.Title,
      StartTime: moment(logData.StartDate + ' ' + logData.StartTime).format('YYYY-MM-DD HH:mm'),
      EndTime: moment(logData.EndDate + ' ' + logData.EndTime).format('YYYY-MM-DD HH:mm'),
      Description: logData.Description
    };
    return HTTP.post(`/Log/AddALog`, postData);
  },

  async ModifyALog(logData) {
    let postData = {
      LogID: logData.LogID,
      UserID: window.Profile.UserID,
      ActivityID: logData.ActivityID,
      Title: logData.Title,
      StartTime: moment(logData.StartDate + ' ' + logData.StartTime).format('YYYY-MM-DD HH:mm'),
      EndTime: moment(logData.EndDate + ' ' + logData.EndTime).format('YYYY-MM-DD HH:mm'),
      Description: logData.Description
    };
    return HTTP.post(`/Log/ModifyALog`, postData);
  },

  async DeleteALog(logData) {
    let postData = {
      LogID: logData.LogID,
      UserID: window.Profile.UserID,
    };
    return HTTP.post(`/Log/DeleteALog`, postData);
  },

  async GetUserLogs(description, startTime, endTime) {
    let postData = {
      UserID: window.Profile.UserID,
      Description: description,
      StartTime: startTime.format('YYYY-MM-DD'),
      EndTime: endTime.add(1, 'd').format('YYYY-MM-DD')
    };
    let httpResult = await HTTP.post(`/Log/GetUserLogs`, postData);
    if (httpResult != "no data")
      httpResult.forEach(x => {
        x.Duration = `${x.StartTime} ~ ${x.EndTime}`;
      });
    return httpResult;
  },

  async GetAlog(logID) {
    let req = {
      LogID: logID
    };
    let httpResult = await HTTP.post(`/Log/GetAlog`, req);
    if (httpResult != 'no data') {
      let start = moment(httpResult.StartTime);
      let end = moment(httpResult.EndTime);
      httpResult.StartDate = new Date(start.format('YYYY-MM-DD'));
      httpResult.StartTime = start.format('HH:mm');
      httpResult.EndDate = new Date(end.format('YYYY-MM-DD'));
      httpResult.EndTime = end.format('HH:mm');
    }

    return httpResult
  },

  //Activity
  async GetUserActivities() {
    let userActivities = await HTTP.post(`/Log/GetUserActivities`, {
      UserID: window.Profile.UserID
    });
    if (userActivities != "no data"){
      userActivities.sort(function(a, b){
        if (b.ActivityName === "others"){
          return -1;
        } else if(a.ActivityName === "others"){
          return 1;
        } else {
          return 0;
        }
      });
    }
    return userActivities;
  },

  async ModifyOrAddAnActivity(activity) {
    let postData = {
      UserID: window.Profile.UserID,
      ActivityID: activity.ActivityID,
      ActivityName: activity.ActivityName,
      IsPrivate: activity.IsPrivate,
      IsEnable: activity.IsEnable
    };
    return HTTP.post(`/Log/ModifyOrAddAnActivity`, postData);
  },

  async DeleteAnActivity(activityID) {
    let postData = {
      ActivityID: activityID
    };
    return HTTP.post(`/Log/DeleteAnActivity`, postData);
  },

  //target
  async ModifyOrAddAGoal(activity, timeBoxID) {
    let postData = {
      UserID: window.Profile.UserID,
      TimeBoxID: timeBoxID,
      ActivityID: activity.ActivityID,
      GoalHour: activity.GoalHour,
    };
    return HTTP.post(`/Log/ModifyOrAddAGoal`, postData);
  },

  //analysis
  async activityTimeByTimeBox(userID, TimeBoxID) {
    let postData = {
      UserID: userID,
      TimeBoxID: TimeBoxID,
    };
    return HTTP.post(`/Log/activityTimeByTimeBox`, postData);
  },

  async activityTime(userID, startDate, endDate) {
    let postData = {
      UserID: userID,
      StartDate: moment(startDate).format('YYYY-MM-DD'),
      EndDate: moment(endDate).add(1, 'd').format('YYYY-MM-DD')
    }
    return HTTP.post(`/Log/activityTime`, postData);
  }
}
