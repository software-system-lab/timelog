<template>
  <el-dialog :visible="visible" :before-close="close" @open="openHandler">
    <el-card>
      <div slot='header'>
        <h2>Goal Setting</h2>
        <h3>Iteration: {{ iterationInfo.IterationName }}</h3>
        <h3>Duration: {{ iterationInfo.StartDate }} ~ {{ iterationInfo.EndDate }}</h3>
      </div>
      <el-row>
        <el-table :data="goalList" sortable="true">
          <el-table-column prop="Project Name" label="Project">
            <template slot-scope="scope">
              {{scope.row.ProjectName}}
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
import logService from '@/services/LogService.js'

export default {
  props: {
    iterationInfo: Object,
    projectList: Array,
    visible: Boolean
  },
  data() {
    return {
      goalList: window.ProjectList
    }
  },
  methods: {
    openHandler() {
      this.goalList = []
      this.projectList.forEach(project => {
        if (project.ProjectID != null) {
          this.goalList.push(JSON.parse(JSON.stringify(project)))
        }
      })
    },
    close() {
      this.$emit("close", "goal_dialog")
    },
    ModifyOrAdd(data) {
      data.IsEdit = false;
      logService.ModifyOrAddAGoal(data, this.iterationInfo.IterationID)
      this.projectList.forEach(project => {
        if (project.ProjectID === data.ProjectID) {
          project.GoalHour = data.GoalHour
        }
      })
    },
    cancelGoal(data) {
      this.projectList.forEach(project => {
        if (project.ProjectID === data.ProjectID) {
          const keyList = Object.keys(data)
          keyList.forEach(key => {
            data[key] = project[key]
          })
        }
      })
      data.IsEdit = false;
    }
  }
}
</script>
