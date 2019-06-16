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
      ProjectID: logData.ProjectID,
      Title: logData.Title,
      StartTime: moment(logData.StartDate + ' ' + logData.StartTime).format('YYYY-MM-DD HH:mm'),
      EndTime: moment(logData.EndDate + ' ' + logData.EndTime).format('YYYY-MM-DD HH:mm'),
      Description: logData.Description
    };
    return HTTP.post(`api/Log/AddALog`, postData);
  },

  async ModifyALog(logData) {
    let postData = {
      LogID: logData.LogID,
      UserID: window.Profile.UserID,
      ProjectID: logData.ProjectID,
      Title: logData.Title,
      StartTime: moment(logData.StartDate + ' ' + logData.StartTime).format('YYYY-MM-DD HH:mm'),
      EndTime: moment(logData.EndDate + ' ' + logData.EndTime).format('YYYY-MM-DD HH:mm'),
      Description: logData.Description
    };
    return HTTP.post(`api/Log/ModifyALog`, postData);
  },

  async DeleteALog(logData) {
    let postData = {
      LogID: logData.LogID,
      UserID: window.Profile.UserID,
    };
    return HTTP.post(`api/Log/DeleteALog`, postData);
  },

  async GetUserLogs(description, startTime, endTime) {
    let postData = {
      UserID: window.Profile.UserID,
      Description: description,
      StartTime: startTime.format('YYYY-MM-DD'),
      EndTime: endTime.format('YYYY-MM-DD')
    };
    let httpResult = await HTTP.post(`api/Log/GetUserLogs`, postData);
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
    let httpResult = await HTTP.post(`api/Log/GetAlog`, req);
    if (httpResult != 'no data') {
      let start = new moment(httpResult.startTime);
      let end = new moment(httpResult.endTime);
      httpResult.StartDate = start.format('YYYY-MM-DD');
      httpResult.StartTime = start.format('HH:mm');
      httpResult.EndDate = start.format('YYYY-MM-DD');
      httpResult.EndTime = start.format('HH:mm');
    }

    return httpResult
  },

  //Project
  async GetUserProjects() {
    return HTTP.post(`api/Log/GetUserProjects`, {
      UserID: window.Profile.UserID
    });
  },

  async ModifyOrAddAProject(project) {
    let postData = {
      UserID: window.Profile.UserID,
      ProjectID: project.ProjectID,
      ProjectName: project.ProjectName,
      IsPrivate: project.IsPrivate,
      IsEnable: project.IsEnable
    };
    return HTTP.post(`api/Log/ModifyOrAddAProject`, postData);
  },

  async DeleteAProject(projectID) {
    let postData = {
      ProjectID: projectID
    };
    return HTTP.post(`api/Log/DeleteAProject`, postData);
  },

  //target
  async ModifyOrAddAGoal(project) {
    let postData = {
      UserID: window.Profile.UserID,
      IterationID: window.Profile.CurrentIterationID,
      ProjectID: project.ProjectID,
      GoalHour: project.GoalHour,
    };
    return HTTP.post(`api/Log/ModifyOrAddAGoal`, postData);
  },

  //analysis
  async ProjectsAndLengthOfTime(userID = window.Profile.UserID) {
    let postData = {
      UserID: userID,
      IterationID: window.Profile.currentIterationID,
    };
    return HTTP.post(`api/Log/ProjectsAndLengthOfTime`, postData);
  }
}