<template>
  <div>
    <InfoDialog
      :timeBoxInfo="timeBoxInfo"
      :visible="infoDialogVisible"
      :isNew="isNew"
      @update="timeBoxUpdated"
      @close="closeDialog"
    />
    <GoalDialog
      :visible="goalDialogVisible"
      :timeBoxInfo="timeBoxInfo"
      :activityList="activityList"
      @goalUpdated="goalUpdated"
      @close="closeDialog"
    />
    <el-card shadow="never">
      <el-col>
        <el-row>
          <el-row>
            <h3>Duration</h3>
          </el-row>
          <el-row>
            <Selection
              :timeBoxInfo="timeBoxInfo"
              @selected="timeBoxSelected"
              @addNewTimeBox="showTimeBoxEditor"
              @timeBoxReset="() => disableButtons(true)"
              ref="selection"
            />
          </el-row>
          <el-row>
            <el-col id="edit-and-goal">
              <el-button :disabled="editDisabled" @click="editTimeBox">Edit</el-button>
              <el-button :disabled="goalDisabled"  @click="showGoalManager">Goal</el-button>
            </el-col>
          </el-row>
          <el-divider/>
          <el-row>
            <el-date-picker
              v-model="timeBoxInfo.StartDate"
              type="date"
              placeholder="Start Time"
              :clearable="false"
              @change="durationChanged"
            />
            <p>To</p>
            <el-date-picker
              v-model="timeBoxInfo.EndDate"
              type="date"
              placeholder="End Time"
              :clearable="false"
              @change="durationChanged"
            />
          </el-row>
        </el-row>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import { LogComponent } from '@/components/interface.js'
import { Component } from 'vue-property-decorator'
import Selection from '@/components/timeBox/selection.vue'
import InfoDialog from '@/components/timeBox/info_dialog.vue'
import GoalDialog from '@/components/timeBox/goal_dialog.vue'
import profileService from '@/services/ProfileService.js'

@Component({
  components: {
    Selection,
    InfoDialog,
    GoalDialog
  },
  props: {
    activityList: Array
  }
})
export default class TimeBox extends LogComponent {
  // Data members
  infoDialogVisible = false
  goalDialogVisible = false
  isNew = false
  editDisabled = false
  goalDisabled = false
  timeBoxInfo = {
    timeBoxID: null,
    StartDate: '',
    EndDate: ''
  }

  // Methods
  async created () {
    const timeBoxID = await profileService.getCurrentTimeBox()
    this.timeBoxInfo = await profileService.GetTimeBoxById(timeBoxID)
  }

  async updateTimeBoxInfo (timeBoxID) {
    this.timeBoxInfo = await profileService.GetTimeBoxById(timeBoxID)
  }

  timeBoxSelected (timeBoxID) {
    if (timeBoxID) {
      this.updateTimeBoxInfo(timeBoxID)
      this.disableButtons(false)
      this.$emit('timeBoxSelected', timeBoxID)
    } else {
      this.disableButtons(true)
    }
  }

  timeBoxUpdated (timeBoxID) {
    this.updateTimeBoxInfo(timeBoxID)
    this.disableButtons(false)
    this.$refs.selection.update()
    this.$emit('timeBoxSelected', timeBoxID)
  }

  disableButtons (disabled) {
    this.editDisabled = disabled
    this.goalDisabled = disabled
  }

  showTimeBoxEditor () {
    this.isNew = true
    this.infoDialogVisible = true
  }

  durationChanged () {
    this.clearTimeBox()
    this.$emit('durationChanged', this.timeBoxInfo)
  }

  clearTimeBox () {
    this.$refs.selection.clearTimeBox()
    this.disableButtons(true)
  }

  closeDialog () {
    this.infoDialogVisible = false
    this.goalDialogVisible = false
  }

  editTimeBox () {
    this.isNew = false
    this.infoDialogVisible = true
  }

  showGoalManager () {
    this.goalDialogVisible = true
  }

  goalUpdated () {
    this.$emit('goalUpdated')
  }
}

</script>
<style scoped>
div > .el-date-editor {
  width: 100%;
}

#edit-and-goal > button{
  margin: 0px;
  width: 50%;
}
</style>
