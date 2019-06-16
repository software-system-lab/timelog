<template>
<el-col :md="6" :sm="6">
  <h5>{{project.ProjectName}}</h5>
  <el-progress type="circle" :percentage="ProjectProgressPercentage" :color="ProjectProgressColor" :status="ProjectProgressStatus"></el-progress>
</el-col>
</template>

<script>
import _logService from '../../services/LogService.js'

export default {
  props: ['project'],
  computed: {
    ProjectProgressPercentage() {
      if (this.project.TimeTarget != null)
        return Number((this.project.TimeLength / (this.project.TimeTarget * 60) * 100).toFixed(2));
      return 100;
    },
    ProjectProgressColor() {
      let result = (this.project.TimeLength / (this.project.TimeTarget * 60) * 100).toFixed(2);
      if (this.project.TimeTarget == null)
        return '#ff9900'; //orange
      else if (result < 50)
        return '#e60000'; //red
      else if (result > 100)
        return '#33cc00'; //green
      return '#0000FF'; //blue
    },
    ProjectProgressStatus() {
      if (this.project.TimeTarget == null) return 'exception';
    }
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
