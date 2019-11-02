const LogProvider = require('../providers/LogProvider.js')
const moment = require('moment')

module.exports = class {
  constructor() {
    this.logProvider = new LogProvider()
  }

  async getProjectTimeByIteration(userID, iterationID) {
    var projects = await this.getProjectList(userID);

    projects.forEach(project => {
      project.GoalHour = null;
      project.IsEdit = false;
    });

    let targets = await this.logProvider.QueryGoalByIteration({UserID: userID, IterationID: iterationID});
    if (targets != "no data") {
      targets.forEach(x => {
        let proj = projects.find(y => y.ProjectID == x.ProjectID);
        if (proj != undefined)
          proj.GoalHour = x.GoalHour;
      })
    }

    let logs = await this.logProvider.GetUserLogsByIterationID(iterationID);

    this.getProjectsTime(logs, projects)
    return projects
  }

  async getProjectTimeByDuration(userID, startDate, endDate) {
    var projects = await this.getProjectList(userID);
    let logs = await this.logProvider.GetUserLogsByRange(startDate, endDate)
    this.getProjectsTime(logs, projects)
    return projects
  }

  async getProjectList(userID) {
    let dbProjects = await this.logProvider.GetUserProjects(userID);
    var projects = [];

    if (dbProjects != 'no data')
      projects = dbProjects;
    projects.push({
      ProjectID: null,
      ProjectName: 'Untitled Events'
    });
    return projects
  }

  async getProjectsTime(logs, projects) {
    projects.forEach(project => {
      project.TimeLength = 0;
    })

    logs.forEach(log => {
      log.ProjectID
      let xx = projects.find(y => y.ProjectID == log.ProjectID);
      if (xx != undefined)
        xx.TimeLength += moment(log.EndTime) - moment(log.StartTime);
    });

    if (projects[projects.length - 1].TimeLength === 0) {
      projects.pop()
    }
    //sort by TimeLength DESC
    projects.sort((x, y) => x.TimeLength < y.TimeLength ? 1 : -1);
  }
}
