<template>
<el-col :md="6" :sm="6" v-if="activity.ActivityID != null && activity.GoalHour > 0">
  <h5>{{activity.ActivityName}}</h5>
  <el-progress type="circle" :percentage="ActivityProgressPercentage" :color="ActivityProgressColor" :status="ActivityProgressStatus"></el-progress>
</el-col>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({
  props: {
    activity: Object
  }
})
export default class TargetBase extends Vue {
  // Computed
  get ActivityProgressPercentage () {
    var result = 0
    if (this.activity.GoalHour != null) { result = Number((this.activity.TimeLength / (this.activity.GoalHour * 3600000) * 100).toFixed(2)) } else { result = 100 }

    if (result > 100) { result = 100 }
    return result
  }

  get ActivityProgressColor () {
    const result = (this.activity.TimeLength / (this.activity.GoalHour * 3600000) * 100).toFixed(2)
    if (this.activity.GoalHour == null) {
      return '#ff9900'
    } else if (result < 50) {
      return '#e60000'
    } else if (result > 100) {
      return '#33cc00'
    }
    return '#0000FF'
  }

  get ActivityProgressStatus () {
    if (this.activity.GoalHour == null) return 'exception'
  }
}
</script>

<style scoped>
.el-col {
  height: 260px;
}

.el-input {
  width: 80%;
}
</style>
