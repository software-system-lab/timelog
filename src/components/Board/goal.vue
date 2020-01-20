<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>My Iteration Target</h2>
    </div>
    <TargetBase
      v-if="taskType.TaskTypeID != null && taskType.GoalHour > 0"
      v-for="taskType in taskTypeList"
      :key="taskType.TaskTypeID"
      :taskType="taskType"></TargetBase>
  </el-card>
</template>

<script>
import { LogComponent } from '@/components/interface.js'
import { Component } from 'vue-property-decorator'
import TargetBase from '@/components/Board/TargetBase'

@Component({
  components: {
    TargetBase
  },
  props: {
    taskTypeList: Array
  }
})
export default class Goal extends LogComponent {}
</script>
