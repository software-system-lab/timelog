const PublishProvider = require('../providers/publish_provider.js')
const ProfileProvider = require('../providers/ProfileServiceProvider.js')
const LogService = require('./log_service.js')
const moment = require('moment')

module.exports = class {
  constructor() {
    this.publishProvider = new PublishProvider()
    this.profileProvider = new ProfileProvider()
    this.logService = new LogService()
  }

  async getUserDataList() {
    const userDataList = []
    const publishList = await this.publishProvider.getAll()
    for (var i = 0; i < publishList.length; ++i) {
      const data = publishList[i]
      const userProfile = await this.profileProvider.getUserProfileByUserID(data.UserID)
      const activityList = (await this.logService.getActivityTimeByDuration(data.UserID, data.StartDate, moment(data.EndDate).add(1, "days").format("YYYY-MM-DD"))).filter(activity => !activity.IsPrivate)

      var total = 0
      activityList.forEach(activity => {
        total += activity.TimeLength
      })
      userDataList.push({
        name: userProfile.UserName,
        duration: data.StartDate + " ~ " + data.EndDate,
        total: total,
        update: moment(data.UpdateTime).format("YYYY-MM-DD hh:mm"),
        activityList: activityList
      })
    }
    return userDataList
  }
}
