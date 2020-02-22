<template>
<div>
  <div v-if="addLogVisible" id="add-log-popup" class="overlay">
    <div class="popup">
      <AddLog @close="closePopup" @saved="update" @activityUpdate="updateActivityList" :activityList="activityList"/>
    </div>
  </div>
  <el-container>
    <el-aside class="hidden-sm-and-down" width="200px">
      <router-view name="header" @addLog="openPopup"></router-view>
    </el-aside>
    <el-container>
      <el-popover placement="right" width="300" trigger="click" class="hidden-md-and-up">
        <router-view name="header"></router-view>
        <el-button slot="reference" class="el-icon-more-outline"></el-button>
      </el-popover>
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
import _logService from '@/services/LogService.js'

@Component({
  components: {
    AddLog
  }
})
export default class LoginedLayout extends LogComponent {
  // Data members
  addLogVisible = false
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

  async updateActivityList () {
    const activityList = await _logService.GetUserActivities()
    this.activityList.length = 0
    activityList.forEach(x => {
      this.activityList.push({
        ActivityID: x.ActivityID,
        ActivityName: x.ActivityName,
        IsPrivate: !!x.IsPrivate,
        IsEnable: !!x.IsEnable,
        InputDisabled: true
      })
    })
  }

  update () {
    this.$refs.view.update()
    this.closePopup()
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
