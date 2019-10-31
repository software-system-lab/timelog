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
    console.log(publishList)
    for (var i = 0; i < publishList.length; ++i) {
      const data = publishList[i]
      console.log("data", data)
      const userProfile = await this.profileProvider.getUserProfileByUserID(data.UserID)
      const projectList = await this.logService.getProjectTimeByDuration(data.UserID, data.StartDate, data.EndDate)

      var total = 0
      projectList.forEach(project => {
        total += project.TimeLength
      })
      userDataList.push({
        name: userProfile.UserName,
        duration: data.StartDate + " ~ " + data.EndDate,
        total: total,
        update: moment(data.UpdateTime).format("YYYY-MM-DD hh:mm"),
        projectList: projectList
      })
    }
    return userDataList
  }
}
