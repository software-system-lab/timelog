<template>
<div>
  <h1>Dash Board</h1>
  <Iteration @update="changeIteration" :iterationInfo="iterationInfo" ref="iteration"/>
  <br>
  <SpentTime :projectList="projectList" ref="spentTime"/>
  <br>
  <Goal :projectList="projectList" @setting="openIterationSetting" ref='goal'/>
  <IterationSetting :visible='iterationSetting' @close='closeIterationSetting' />
</div>
</template>

<script>
import IterationSetting from '@/components/Board/IterationSetting.vue'
import Iteration from '@/components/Board/iteration/index.vue'
import SpentTime from '@/components/Board/spent_time.vue'
import Goal from '@/components/Board/goal.vue'
import logService from '@/services/LogService.js'
import profileService from '@/services/ProfileService.js'

export default {
  data() {
    return {
      iterationInfo: {
        iterationID: null
      },
      projectList: [],
      iterationSetting: false,
    }
  },
  async created() {
    this.iterationInfo.iterationID = await profileService.getCurrentIteration();
    this.getProjectsData()
  },
  methods: {
    async getProjectList() {
      const userID = window.Profile.UserID
      let result = await logService.ProjectsAndLengthOfTime(userID, this.iterationInfo.iterationID)
      if (result != "no data") {
        this.projectList = result
      }
    },
    async getProjectsData() {
      await this.getProjectList()
      this.$refs.spentTime.update()
    },
    update() {
      this.getProjectsData()
      this.$refs.iteration.update()
    },
    changeIteration(iterationID) {
      this.iterationInfo.iterationID = iterationID
      this.update()
    },
    openIterationSetting() {
      this.iterationSetting = true
    },
    closeIterationSetting() {
      this.iterationSetting = false
      this.update()
    },
  },
  components: {
    IterationSetting,
    Iteration,
    SpentTime,
    Goal
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
