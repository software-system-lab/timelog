<template>
<div>
  <h1>Dash Board</h1>
  <TimeBox
    @update="changeTimeBox"
    @updateGoal="getTaskTypesData"
    @displayByDate="displayByDate"
    :timeBoxInfo="timeBoxInfo"
    :taskTypeList="taskTypeList"
    ref="timeBox"/>
  <br>
  <SpentTime :taskTypeList="taskTypeList" ref="spentTime"/>
  <br>
  <Goal
    v-if="goalDisplay"
    :taskTypeList="taskTypeList"
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
  taskTypeList = []
  timeBoxSetting = false
  goalDisplay = true


  // Life cycle
  async created() {
    const timeBoxID = await profileService.getCurrentTimeBox()
    this.timeBoxInfo = await profileService.GetTimeBoxById(timeBoxID)
    this.getTaskTypesData()
    this.$refs.timeBox.timeBoxDate()
  }


  // Methods
  async getTaskTypeList() {
    const userID = window.Profile.UserID
    let result = await logService.taskTypeTimeByTimeBox(userID, this.timeBoxInfo.TimeBoxID)
    if (result != "no data") {
      this.taskTypeList = result
    }
  }

  async getTaskTypesData() {
    await this.getTaskTypeList()
    this.$refs.spentTime.update(this.taskTypeList)
  }

  update() {
    this.goalDisplay = true
    this.getTaskTypesData()
    this.$refs.timeBox.update()
  }

  async changeTimeBox(timeBoxID) {
    this.timeBoxInfo = await profileService.GetTimeBoxById(timeBoxID)
    this.update()
  }

  openTimeBoxSetting() {
    this.timeBoxSetting = true
  }

  closeTimeBoxSetting() {
    this.timeBoxSetting = false
    this.update()
  }

  async displayByDate(date) {
    this.goalDisplay = false
    this.timeBoxInfo.TimeBoxID = ""
    const userID = window.Profile.UserID
    this.taskTypeList = await logService.taskTypeTime(userID, date.start, date.end)
    this.$refs.spentTime.update(this.taskTypeList)
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
