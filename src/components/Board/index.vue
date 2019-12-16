<template>
<div>
  <h1>Dash Board</h1>
  <Iteration @update="changeIteration" @updateGoal="getProjectsData" @displayByDate="displayByDate" :iterationInfo="iterationInfo" :projectList="projectList" ref="iteration"/>
  <br>
  <SpentTime :projectList="projectList" ref="spentTime"/>
  <br>
  <Goal v-if="goalDisplay" :projectList="projectList" @setting="openIterationSetting" ref='goal'/>
</div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
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
export default class Board extends Vue {
  // Data members
  iterationInfo = {
    iterationID: null
  };
  projectList = []
  iterationSetting = false
  goalDisplay = true


  // Life cycle
  async created() {
    const iterationID = await profileService.getCurrentIteration()
    this.iterationInfo = await profileService.GetIterationById(iterationID)
    this.getProjectsData()
    this.$refs.iteration.iterationDate()
  }


  // Methods
  async getProjectList() {
    const userID = window.Profile.UserID
    let result = await logService.projectTimeByIteration(userID, this.iterationInfo.IterationID)
    if (result != "no data") {
      this.projectList = result
    }
  }

  async getProjectsData() {
    await this.getProjectList()
    this.$refs.spentTime.update(this.projectList)
  }

  update() {
    this.goalDisplay = true
    this.getProjectsData()
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
    this.projectList = await logService.projectTime(userID, date.start, date.end)
    this.$refs.spentTime.update(this.projectList)
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
