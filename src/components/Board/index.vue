<template>
<div>
  <h1>Dash Board</h1>
  <TimeBox
    @update="changeTimeBox"
    @updateGoal="getLogReportData"
    @displayByDate="displayByDate"
    :timeBoxInfo="timeBoxInfo"
    :activityList="activityList"
    ref="timeBox"/>
  <br>
  <SpentTime :LogReportData="logReportData" ref="spentTime"/>
  <br>
  <Goal
    v-if="goalDisplay"
    :activityList="activityList"
    @setting="openTimeBoxSetting"
    ref='goal'/>
</div>
</template>

<script>
import { LogView } from '@/components/interface.js'
import { Component, Watch } from 'vue-property-decorator'
import TimeBox from '@/components/Board/timeBox/index.vue'
import SpentTime from '@/components/Board/spent_time.vue'
import Goal from '@/components/Board/goal.vue'
import logService from '@/services/LogService.js'
import profileService from '@/services/ProfileService.js'

@Component({
  components: {
    TimeBox,
    SpentTime,
    Goal
  },
  props: {
    activityList: Array
  }
})
export default class Board extends LogView {
  // Data members
  timeBoxInfo = {
    timeBoxID: null
  }

  timeBoxSetting = false
  goalDisplay = true
  logReportData = []
  selectedDate = null

  @Watch('activityList')
  onActivityUpdate () {
    if (this.selectedDate) {
      this.displayByDate()
    } else {
      this.getLogReportData()
    }
  }

  // Life cycle
  async created () {
    const timeBoxID = await profileService.getCurrentTimeBox()
    this.timeBoxInfo = await profileService.GetTimeBoxById(timeBoxID)
    this.getLogReportData()
    this.$refs.timeBox.timeBoxDate()
  }

  // Methods
  async getLogReportData () {
    const userID = window.Profile.UserID
    const result = await logService.activityTimeByTimeBox(userID, this.timeBoxInfo.TimeBoxID)
    if (result !== 'no data') {
      this.logReportData.length = 0
      result.forEach(x => {
        this.logReportData.push(x)
      })
    }
    this.$refs.spentTime.update()
  }

  update () {
    this.goalDisplay = true
    this.getLogReportData()
    this.$refs.timeBox.update()
  }

  async changeTimeBox (timeBoxID) {
    this.timeBoxInfo = await profileService.GetTimeBoxById(timeBoxID)
    this.update()
  }

  openTimeBoxSetting () {
    this.timeBoxSetting = true
  }

  closeTimeBoxSetting () {
    this.timeBoxSetting = false
    this.update()
  }

  async displayByDate (date) {
    this.goalDisplay = false
    this.selectedDate = date
    this.timeBoxInfo.TimeBoxID = ''
    const userID = window.Profile.UserID
    const result = await logService.activityTime(userID, date.start, date.end)
    if (result !== 'no data') {
      this.logReportData.length = 0
      result.forEach(x => {
        this.logReportData.push(x)
      })
    }
    this.$refs.spentTime.update()
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
