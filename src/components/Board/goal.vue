<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>My Time Box Target</h2>
    </div>
    <div v-if="activity.ActivityID != null && activity.GoalHour > 0">
      <TargetBase
        v-for="activity in activityList"
        :key="activity.ActivityID"
        :activity="activity"></TargetBase>
    </div>
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
    activityList: Array
  }
})
export default class Goal extends LogComponent {}
</script>
