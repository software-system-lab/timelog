<template>
<div>
  <h1>Dash Board</h1>
  <SpentTime :LogReportData="logReportData" :publishVisible="true" @publish="publish" ref="spentTime"/>
  <br>
  <Goal
    v-if="goalDisplay"
    :activityList="activityList"
    ref='goal'/>
</div>
</template>

<script>
import { LogView } from '@/components/interface.js'
import { Component, Watch } from 'vue-property-decorator'
import SpentTime from '@/components/Board/spent_time.vue'
import Goal from '@/components/Board/goal.vue'
import logService from '@/services/LogService.js'
import profileService from '@/services/ProfileService.js'
import publishService from '@/services/publish_service.js'

@Component({
  components: {
    SpentTime,
    Goal
  },
  props: {
    activityList: Array
  }
})
export default class Board extends LogView {
  // Data members
  timeBoxID = null
  duration = null
  goalDisplay = true
  logReportData = []

  @Watch('activityList')
  onActivityUpdate () {
    if (this.duration) {
      this.displayByDate()
    } else {
      this.getLogReportData()
    }
  }

  // Life cycle
  async created () {
    this.timeBoxID = await profileService.getCurrentTimeBox()
    this.getLogReportData()
  }

  // Methods
  async getLogReportData () {
    const userID = window.Profile.UserID
    const result = await logService.activityTimeByTimeBox(userID, this.timeBoxID)
    if (result !== 'no data') {
      this.logReportData = [...result]
    }
    this.$refs.spentTime.update()
  }

  update () {
    this.goalDisplay = true
    this.getLogReportData()
  }

  async displayByTimeBoxID (timeBoxID) {
    this.timeBoxID = timeBoxID
    const timeBoxInfo = await profileService.GetTimeBoxById(this.timeBoxID)
    this.duration = (({ StartDate, EndDate }) => ({ StartDate, EndDate }))(timeBoxInfo)
    this.update()
  }

  async displayByDate (date) {
    this.goalDisplay = false
    this.duration = date
    this.timeBoxID = null
    const userID = window.Profile.UserID
    const result = await logService.activityTime(userID, date.StartDate, date.EndDate)
    if (result !== 'no data') {
      this.logReportData = [...result]
    }
    this.$refs.spentTime.update()
  }

  async publish () {
    const result = await publishService.publish(window.Profile.UserID, this.duration.StartDate, this.duration.EndDate)
    if (result === 'success') {
      this.$message({
        message: 'Log Published!',
        type: 'success'
      })
    } else {
      this.$message.error('Failed to publish log.')
    }
  }
}
</script>

<style scoped>
.el-form {
  width: 90%
}

#time-box-setting {
  position: relative;
  right: -45%;
  top: 20px
}
</style>
