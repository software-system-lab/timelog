<template>
<el-col :md="6" :sm="6">
  <h5>{{activity.ActivityName}}</h5>
  <el-progress type="circle" :percentage="ActivityProgressPercentage" :color="ActivityProgressColor" :status="ActivityProgressStatus"></el-progress>
</el-col>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import _logService from '../../services/LogService.js'

@Component({
  props: {
    activity: Object
  }
})
export default class TargetBase extends Vue {
  // Computed
  get ActivityProgressPercentage() {
    var result = 0
    if (this.activity.GoalHour != null)
      result = Number((this.activity.TimeLength / (this.activity.GoalHour * 3600000) * 100).toFixed(2))
    else
      result = 100

    if (result > 100)
      result = 100
    return result
  }

  get ActivityProgressColor() {
    let result = (this.activity.TimeLength / (this.activity.GoalHour * 3600000) * 100).toFixed(2)
    if (this.activity.GoalHour == null)
      return '#ff9900' //orange
    else if (result < 50)
      return '#e60000' //red
    else if (result > 100)
      return '#33cc00' //green
    return '#0000FF' //blue
  }

  get ActivityProgressStatus() {
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
