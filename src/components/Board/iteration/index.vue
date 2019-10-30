<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Duration</h2>
    </div>
    <el-row>
      <el-col :md="12" :sm="24" id="board-duration-iteration" style="border-right: 1px;">
        <el-row>
          <h3>Iteration</h3>
        </el-row>
        <el-row>
          <el-col :md="12" :sm="24">
            <Selection @selected="iterationSelected" :iterationInfo="iterationInfo" ref="selection"/>
          </el-col>
          <el-col :md="6" :sm="24">
              <el-button @click="edit" class="iteration-button">Edit</el-button>
              <el-button @click="setGoal" class="iteration-button">Goal</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-button @click="newIteration" icon="el-icon-document-add">NewIteration</el-button>
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
    <InfoDialog :visible="infoDialogActive" :iterationInfo="iterationInfo" :isNew="isNew" @update="iterationSelected" @close="closeDialog" ref="infoDialog"/>
    <GoalDialog :visible="goalDialogActive" :iterationInfo="iterationInfo" :projectList="projectList" @close="closeDialog" />
  </el-card>
</template>

<script>
import moment from 'moment'
import Selection from '@/components/Board/iteration/selection.vue'
import InfoDialog from '@/components/Board/iteration/info_dialog.vue'
import GoalDialog from '@/components/Board/iteration/goal_dialog.vue'
import publishService from '@/services/publish_service.js'

export default {
  props: {
    iterationInfo: Object,
    projectList: Array
  },
  data() {
    return {
      infoDialogActive: false,
      goalDialogActive: false,
      isNew: false,
      endDateOption: {},
      pickedDate: []
    }
  },
  watch: {
    iterationInfo: function(itr) {
      if (itr.IterationID !== null) {
        this.iterationDate();
      }
    }
  },
  methods: {
    update() {
      this.$refs.infoDialog.update()
      this.$refs.selection.update()
      this.iterationDate()
    },
    iterationDate() {
      let startDate = new Date(this.iterationInfo.StartDate)
      let endDate = new Date(this.iterationInfo.EndDate)
      this.pickedDate = [startDate, endDate]
    },
    setEndDateOption() {
      this.endDateOption.disabledDate = time => {
        if (moment(this.iterationInfo.StartDate) > moment(time.getTime()))
          return true;
        return false;
      }
    },
    newIteration() {
      this.isNew = true
      this.infoDialogActive = true
    },
    closeDialog(type) {
      if (type === 'info_dialog') {
        this.infoDialogActive = false
      } else if (type === 'goal_dialog') {
        this.goalDialogActive = false
        this.$emit("updateGoal")
      }
    },
    iterationSelected(iterationID) {
      this.$emit("update", iterationID)
    },
    edit() {
      this.isNew = false
      this.infoDialogActive = true
    },
    setGoal() {
      this.goalDialogActive = true
    },
    displayByDate() {
      this.$emit("displayByDate", {
        start: this.pickedDate[0],
        end: this.pickedDate[1]
      })
    },
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
  },
  components: {
    Selection,
    InfoDialog,
    GoalDialog
  }
}
</script>
<style scoped>
.duration-datepicker-block-item {
  margin: 5%;
}
</style>
