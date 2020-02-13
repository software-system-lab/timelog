<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Duration</h2>
    </div>
    <el-row>
      <el-col :md="12" :sm="24" id="board-duration-time-box" style="border-right: 1px;">
        <el-row>
          <h3>Time Box</h3>
        </el-row>
        <el-row>
          <el-col :md="12" :sm="24">
            <Selection @selected="timeBoxSelected" :timeBoxInfo="timeBoxInfo" ref="selection"/>
          </el-col>
          <el-col :md="6" :sm="24">
              <el-button :disabled="timeBoxInfo.TimeBoxID === ''" @click="edit" class="time-box-button">Edit</el-button>
              <el-button :disabled="timeBoxInfo.TimeBoxID === ''" @click="setGoal" class="time-box-button">Goal</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-button @click="newTimeBox" icon="el-icon-document-add">New Time Box</el-button>
        </el-row>
      </el-col>
      <el-col :md="12" :sm="24" id="board-duration-datepicker">
        <el-row>
          <h3>Date</h3>
        </el-row>
        <el-row>
          <div class="duration-datepicker-block">
            <div class="duration-datepicker-block-item">
              <el-date-picker
                v-model="pickedDate"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date">
              </el-date-picker>
            </div>
            <div class="duration-datepicker-block-item">
              <el-button type="primary" icon="el-icon-success" @click="displayByDate">OK</el-button>
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="warning" @click="publish">Publish</el-button>
    </el-row>
    <InfoDialog :visible="infoDialogActive" :timeBoxInfo="timeBoxInfo" :isNew="isNew" @update="timeBoxSelected" @close="closeDialog" ref="infoDialog"/>
    <GoalDialog :visible="goalDialogActive" :timeBoxInfo="timeBoxInfo" :taskTypeList="taskTypeList" @goalEdit="goalEdit" @close="closeDialog" />
  </el-card>
</template>

<script>
import { LogComponent } from '@/components/interface.js'
import { Component, Watch } from 'vue-property-decorator'
import moment from 'moment'
import Selection from '@/components/Board/timeBox/selection.vue'
import InfoDialog from '@/components/Board/timeBox/info_dialog.vue'
import GoalDialog from '@/components/Board/timeBox/goal_dialog.vue'
import publishService from '@/services/publish_service.js'

@Component({
  components: {
    Selection,
    InfoDialog,
    GoalDialog
  },
  props: {
    timeBoxInfo: Object,
    taskTypeList: Array
  }
})
export default class TimeBox extends LogComponent {
  // Data members
  infoDialogActive = false
  goalDialogActive = false
  isNew = false
  endDateOption = {}
  pickedDate = []

  @Watch('timeBoxInfo')
  onTimeBoxInfoChange(itr) {
    if (itr.TimeBoxID !== null) {
      this.timeBoxDate();
    }
  }


  // Methods
  update() {
    this.$refs.infoDialog.update()
    this.$refs.selection.update()
    this.timeBoxDate()
  }

  timeBoxDate() {
    let startDate = new Date(this.timeBoxInfo.StartDate)
    let endDate = new Date(this.timeBoxInfo.EndDate)
    this.pickedDate = [startDate, endDate]
  }

  setEndDateOption() {
    this.endDateOption.disabledDate = time => {
      if (moment(this.timeBoxInfo.StartDate) > moment(time.getTime()))
        return true
      return false
    }
  }

  newTimeBox() {
    this.isNew = true
    this.infoDialogActive = true
  }

  closeDialog(type) {
    if (type === 'info_dialog') {
      this.infoDialogActive = false
    } else if (type === 'goal_dialog') {
      this.goalDialogActive = false
    }
  }

  timeBoxSelected(timeBoxID) {
    this.$emit("update", timeBoxID)
  }

  edit() {
    this.isNew = false
    this.infoDialogActive = true
  }

  setGoal() {
    this.goalDialogActive = true
  }

  goalEdit() {
    this.$emit("updateGoal")
  }

  displayByDate() {
    this.$emit("displayByDate", {
      start: this.pickedDate[0],
      end: this.pickedDate[1]
    })
  }

  async publish() {
    let result = await publishService.publish(window.Profile.UserID, this.pickedDate[0], this.pickedDate[1])
    if (result === 'success') {
      this.$message({
        message: 'Log Published!',
        type: 'success'
      });
    } else {
      this.$message.error('Failed to publish log.')
    }
  }
}
</script>
<style scoped>
.duration-datepicker-block-item {
  margin: 5%;
}
</style>
