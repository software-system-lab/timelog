<template>
<div>
  <div v-if="addLogVisible" id="add-log-popup" class="overlay">
    <div class="popup">
      <AddLog @close="closePopup" @saved="update" @activityUpdate="updateActivityList" :activityList="activityList"/>
    </div>
  </div>
  <div v-if="changeTimeBoxVisible" class="overlay">
    <div class="popup">
      <ChangeTimeBox/>
    </div>
  </div>
  <el-container>
    <el-aside class="hidden-sm-and-down" width="200px">
      <router-view name="header"
        :activityList="activityList"
        @addLog="openPopup"
        @timeBoxSelected="updateMainView"
        @goalUpdated="goalUpdated"
        @durationChanged="durationChanged"
      />
    </el-aside>
    <el-container>
      <el-main>
        <router-view :activityList="activityList" @activityUpdate="updateActivityList" ref="view"/>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import { LogComponent } from '@/components/interface.js'
import { Component } from 'vue-property-decorator'
import AddLog from '@/components/log/add_log.vue'
import ChangeTimeBox from '@/components/changeTimeBox.vue'
import _logService from '@/services/LogService.js'

@Component({
  components: {
    AddLog,
    ChangeTimeBox
  }
})
export default class LoginedLayout extends LogComponent {
  // Data members
  addLogVisible = false
  changeTimeBoxVisible = false
  activityList = []

  // Life cycle
  created () {
    this.updateActivityList()
  }

  // Methods
  openPopup () {
    this.addLogVisible = true
  }

  closePopup () {
    this.addLogVisible = false
  }

  openTimeBox () {
    this.changeTimeBoxVisible = true
    console.log('open time box')
  }

  closeTimeBox () {
    this.changeTimeBoxVisible = false
  }

  async updateActivityList () {
    const activityList = await _logService.GetUserActivities()
    activityList.forEach(x => {
      x.IsPrivate = !!x.IsPrivate
      x.IsEnable = !!x.IsEnable
      x.InputDisabled = true
    })
    this.activityList = [...activityList]
  }

  update () {
    this.$refs.view.update()
    this.closePopup()
  }

  updateMainView (timeBoxID) {
    this.$refs.view.displayByTimeBoxID(timeBoxID)
  }

  durationChanged (duration) {
    this.$refs.view.displayByDate(duration)
  }

  goalUpdated () {
    this.$refs.view.getLogReportData()
  }
}
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  z-index: 999;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}
</style>
