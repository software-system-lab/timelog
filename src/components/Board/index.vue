<template>
<div>
  <h1>Dash Board</h1>
  <TimeBox
    @update="changeTimeBox"
    @updateGoal="getActivitiesData"
    @displayByDate="displayByDate"
    :timeBoxInfo="timeBoxInfo"
    :activityList="activityList"
    ref="timeBox"/>
  <br>
  <SpentTime :activityList="activityList" ref="spentTime"/>
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
import { Component } from 'vue-property-decorator'
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
  }
})
export default class Board extends LogView {
  // Data members
  timeBoxInfo = {
    timeBoxID: null
  }

  activityList = []
  timeBoxSetting = false
  goalDisplay = true

  // Life cycle
  async created () {
    const timeBoxID = await profileService.getCurrentTimeBox()
    this.timeBoxInfo = await profileService.GetTimeBoxById(timeBoxID)
    this.getActivitiesData()
    this.$refs.timeBox.timeBoxDate()
  }

  // Methods
  async getActivityList () {
    const userID = window.Profile.UserID
    const result = await logService.activityTimeByTimeBox(userID, this.timeBoxInfo.TimeBoxID)
    if (result !== 'no data') {
      this.activityList = result
    }
  }

  async getActivitiesData () {
    await this.getActivityList()
    this.$refs.spentTime.update(this.activityList)
  }

  update () {
    this.goalDisplay = true
    this.getActivitiesData()
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
    this.timeBoxInfo.TimeBoxID = ''
    const userID = window.Profile.UserID
    this.activityList = await logService.activityTime(userID, date.start, date.end)
    this.$refs.spentTime.update(this.activityList)
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
