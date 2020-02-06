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
      TaskTypeID: logData.TaskTypeID,
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
      TaskTypeID: logData.TaskTypeID,
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

  //TaskType
  async GetUserTaskTypes() {
    let httpResult = await HTTP.post(`/Log/GetUserTaskTypes`, {
      UserID: window.Profile.UserID
    });
    if (httpResult != "no data")
    //從這裡改
      httpResult.forEach(x => {
        x.Duration = `${x.StartTime} ~ ${x.EndTime}`;
      });
    return httpResult;
  },

  async ModifyOrAddATaskType(taskType) {
    let postData = {
      UserID: window.Profile.UserID,
      TaskTypeID: taskType.TaskTypeID,
      TaskTypeName: taskType.TaskTypeName,
      IsPrivate: taskType.IsPrivate,
      IsEnable: taskType.IsEnable
    };
    return HTTP.post(`/Log/ModifyOrAddATaskType`, postData);
  },

  async DeleteATaskType(taskTypeID) {
    let postData = {
      TaskTypeID: taskTypeID
    };
    return HTTP.post(`/Log/DeleteATaskType`, postData);
  },

  //target
  async ModifyOrAddAGoal(taskType, iterationID) {
    let postData = {
      UserID: window.Profile.UserID,
      IterationID: iterationID,
      TaskTypeID: taskType.TaskTypeID,
      GoalHour: taskType.GoalHour,
    };
    return HTTP.post(`/Log/ModifyOrAddAGoal`, postData);
  },

  //analysis
  async taskTypeTimeByIteration(userID, IterationID) {
    let postData = {
      UserID: userID,
      IterationID: IterationID,
    };
    return HTTP.post(`/Log/taskTypeTimeByIteration`, postData);
  },

  async taskTypeTime(userID, startDate, endDate) {
    let postData = {
      UserID: userID,
      StartDate: moment(startDate).format('YYYY-MM-DD'),
      EndDate: moment(endDate).add(1, 'd').format('YYYY-MM-DD')
    }
    return HTTP.post(`/Log/taskTypeTime`, postData);
  }
}
