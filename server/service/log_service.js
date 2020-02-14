const LogProvider = require('../providers/LogProvider.js')
const moment = require('moment')

module.exports = class {
  constructor() {
    this.logProvider = new LogProvider()
  }

  async getActivityTimeByTimeBox(userID, timeBoxID) {
    var activities = await this.getActivityList(userID);

    activities.forEach(activity => {
      activity.GoalHour = null;
      activity.IsEdit = false;
    });

    let targets = await this.logProvider.QueryGoalByTimeBox({UserID: userID, TimeBoxID: timeBoxID});
    if (targets != "no data") {
      targets.forEach(x => {
        let proj = activities.find(y => y.activityID == x.activityID);
        if (proj != undefined)
          proj.GoalHour = x.GoalHour;
      })
    }

    let logs = await this.logProvider.GetUserLogsByTimeBoxID(userID, timeBoxID);

    this.getActivitiesTime(logs, activities)
    return activities
  }

  async getActivityTimeByDuration(userID, startDate, endDate) {
    var activities = await this.getActivityList(userID);
    let logs = await this.logProvider.GetUserLogsByRange(userID, startDate, endDate)
    this.getActivitiesTime(logs, activities)
    return activities
  }

  async getActivityList(userID) {
    let dbActivities = await this.logProvider.GetUserActivities(userID);
    var activities = [];

    if (dbActivities != 'no data')
      activities = dbActivities;
    activities.push({
      ActivityID: null,
      ActivityName: 'Untitled Events'
    });
    return activities
  }

  async getActivitiesTime(logs, activities) {
    activities.forEach(activity => {
      activity.TimeLength = 0;
    })

    logs.forEach(log => {
      log.ActivityID
      let xx = activities.find(y => y.ActivityID == log.ActivityID);
      if (xx != undefined)
        xx.TimeLength += moment(log.EndTime) - moment(log.StartTime);
    });

    if (activities[activities.length - 1].TimeLength === 0) {
      activities.pop()
    }
    //sort by TimeLength DESC
    activities.sort((x, y) => x.TimeLength < y.TimeLength ? 1 : -1);
  }
}
