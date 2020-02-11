const LogProvider = require('../providers/LogProvider.js')
const moment = require('moment')

module.exports = class {
  constructor() {
    this.logProvider = new LogProvider()
  }

  async getTaskTypeTimeByIteration(userID, iterationID) {
    var taskTypes = await this.getTaskTypeList(userID);

    taskTypes.forEach(taskType => {
      taskType.GoalHour = null;
      taskType.IsEdit = false;
    });

    let targets = await this.logProvider.QueryGoalByIteration({UserID: userID, IterationID: iterationID});
    if (targets != "no data") {
      targets.forEach(x => {
        let proj = taskTypes.find(y => y.taskTypeID == x.taskTypeID);
        if (proj != undefined)
          proj.GoalHour = x.GoalHour;
      })
    }

    let logs = await this.logProvider.GetUserLogsByIterationID(userID, iterationID);

    this.getTaskTypesTime(logs, taskTypes)
    return taskTypes
  }

  async getTaskTypeTimeByDuration(userID, startDate, endDate) {
    var taskTypes = await this.getTaskTypeList(userID);
    let logs = await this.logProvider.GetUserLogsByRange(userID, startDate, endDate)
    this.getTaskTypesTime(logs, taskTypes)
    return taskTypes
  }

  async getTaskTypeList(userID) {
    let dbTaskTypes = await this.logProvider.GetUserTaskTypes(userID);
    var taskTypes = [];

    if (dbTaskTypes != 'no data')
      taskTypes = dbTaskTypes;
    taskTypes.push({
      TaskTypeID: null,
      TaskTypeName: 'Untitled Events'
    });
    return taskTypes
  }

  async getTaskTypesTime(logs, taskTypes) {
    taskTypes.forEach(taskType => {
      taskType.TimeLength = 0;
    })

    logs.forEach(log => {
      log.TaskTypeID
      let xx = taskTypes.find(y => y.TaskTypeID == log.TaskTypeID);
      if (xx != undefined)
        xx.TimeLength += moment(log.EndTime) - moment(log.StartTime);
    });

    if (taskTypes[taskTypes.length - 1].TimeLength === 0) {
      taskTypes.pop()
    }
    //sort by TimeLength DESC
    taskTypes.sort((x, y) => x.TimeLength < y.TimeLength ? 1 : -1);
  }
}
