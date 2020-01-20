<template>
<div>
  <h1>Dash Board</h1>
  <Iteration
    @update="changeIteration"
    @updateGoal="getTaskTypesData"
    @displayByDate="displayByDate"
    :iterationInfo="iterationInfo"
    :taskTypeList="taskTypeList"
    ref="iteration"/>
  <br>
  <SpentTime :taskTypeList="taskTypeList" ref="spentTime"/>
  <br>
  <Goal
    v-if="goalDisplay"
    :taskTypeList="taskTypeList"
    @setting="openIterationSetting"
    ref='goal'/>
</div>
</template>

<script>
import { LogView } from '@/components/interface.js'
import { Component } from 'vue-property-decorator'
import Iteration from '@/components/Board/iteration/index.vue'
import SpentTime from '@/components/Board/spent_time.vue'
import Goal from '@/components/Board/goal.vue'
import logService from '@/services/LogService.js'
import profileService from '@/services/ProfileService.js'

@Component({
  components: {
    Iteration,
    SpentTime,
    Goal
  }
})
export default class Board extends LogView {
  // Data members
  iterationInfo = {
    iterationID: null
  }
  taskTypeList = []
  iterationSetting = false
  goalDisplay = true


  // Life cycle
  async created() {
    const iterationID = await profileService.getCurrentIteration()
    this.iterationInfo = await profileService.GetIterationById(iterationID)
    this.getTaskTypesData()
    this.$refs.iteration.iterationDate()
  }


  // Methods
  async getTaskTypeList() {
    const userID = window.Profile.UserID
    let result = await logService.taskTypeTimeByIteration(userID, this.iterationInfo.IterationID)
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
    this.$refs.iteration.update()
  }

  async changeIteration(iterationID) {
    this.iterationInfo = await profileService.GetIterationById(iterationID)
    this.update()
  }

  openIterationSetting() {
    this.iterationSetting = true
  }

  closeIterationSetting() {
    this.iterationSetting = false
    this.update()
  }

  async displayByDate(date) {
    this.goalDisplay = false
    this.iterationInfo.IterationID = ""
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

#iteration-setting {
  position: relative;
  right: -45%;
  top: 20px
}
</style>
