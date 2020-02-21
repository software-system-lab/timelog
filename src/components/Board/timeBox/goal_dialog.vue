<template>
  <el-dialog :visible="visible" :before-close="close" @open="openHandler">
    <el-card>
      <div slot='header'>
        <h2>Goal Setting</h2>
        <h3>Time Box: {{ timeBoxInfo.TimeBoxName }}</h3>
        <h3>Duration: {{ timeBoxInfo.StartDate }} ~ {{ timeBoxInfo.EndDate }}</h3>
      </div>
      <el-row>
        <el-table :data="goalList" sortable="true">
          <el-table-column prop="Activity Name" label="Activity">
            <template slot-scope="scope">
              {{scope.row.ActivityName}}
            </template>
          </el-table-column>
          <el-table-column prop="GoalHour" label="Goal(Hour)">
            <template slot-scope="scope">
              <el-input-number :min="0" :disabled="!scope.row.IsEdit" step-strictly v-model="scope.row.GoalHour"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <el-button type="primary" v-if="!scope.row.IsEdit" icon="el-icon-edit" circle @click="() => {scope.row.IsEdit=true}"></el-button>
              <el-button type="success" v-if="scope.row.IsEdit" icon="el-icon-check" circle @click="ModifyOrAdd(scope.row)"></el-button>
              <el-button type="danger" v-if="scope.row.IsEdit" icon="el-icon-close" circle @click="cancelGoal(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <br>
      <el-button type="primary" icon="el-icon-edit" @click="close">Close</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import logService from '@/services/LogService.js'

@Component({
  props: {
    timeBoxInfo: Object,
    activityList: Array,
    visible: Boolean
  }
})
export default class GoalDialog extends Vue {
  // Data members
  goalList = window.ActivityList

  // Methods
  openHandler () {
    this.goalList = []
    this.activityList.forEach(activity => {
      if (activity.ActivityID != null) {
        this.goalList.push(JSON.parse(JSON.stringify(activity)))
      }
    })
  }

  close () {
    this.$emit('close', 'goal_dialog')
  }

  async ModifyOrAdd (data) {
    data.IsEdit = false
    const result = await logService.ModifyOrAddAGoal(data, this.timeBoxInfo.TimeBoxID)
    if (result) {
      this.$emit('goalEdit', data)
    }
  }

  cancelGoal (data) {
    this.ActivityList.forEach(activity => {
      if (activity.ActivityID === data.ActivityID) {
        const keyList = Object.keys(data)
        keyList.forEach(key => {
          data[key] = activity[key]
        })
      }
    })
    data.IsEdit = false
  }
}
</script>
