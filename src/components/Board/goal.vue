<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>My Iteration Target</h2>
    </div>
    <TargetBase v-for="project in projectList" :key="project.ProjectID" v-if="project.ProjectID != null && project.GoalHour > 0" :project="project"></TargetBase>
  </el-card>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import TargetBase from '@/components/Board/TargetBase'

@Component({
  components: {
    TargetBase
  },
  props: {
    projectList: Array
  }
})
export default class Goal extends Vue {}
</script>
