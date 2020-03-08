<template>
  <div>
    <el-select
      v-model="timeBoxID"
      :clearable="false"
      placeholder="Select"
      @change="(timeBoxID) => $emit('selected', timeBoxID)"
    >
      <el-option-group>
        <el-option v-for="(it, idx) in timeBoxList" :key="idx" :label="it.TimeBoxName" :value="it.TimeBoxID">
        </el-option>
      </el-option-group>
      <el-option-group>
        <el-option key="AddTimeBox" :value="null">
          <el-button @click="addTimeBox">New Time Box</el-button>
        </el-option>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
import { LogComponent } from '@/components/interface.js'
import { Component, Watch } from 'vue-property-decorator'
import profileService from '@/services/ProfileService.js'

@Component({
  props: {
    timeBoxInfo: Object
  }
})
export default class Selection extends LogComponent {
  // Data members
  timeBoxList = []
  timeBoxID = null

  @Watch('timeBoxInfo')
  timeBoxInfoChanged ({ TimeBoxID }) {
    this.timeBoxID = TimeBoxID
  }

  // Life cycle
  created () {
    this.timeBoxID = this.timeBoxInfo.timeBoxID
    this.update()
  }

  // Methods
  async update () {
    this.timeBoxList = (await profileService.GetTimeBoxes()).reverse()
  }

  addTimeBox () {
    this.$emit('addNewTimeBox')
  }

  clearTimeBox () {
    this.timeBoxID = null
  }
}
</script>
