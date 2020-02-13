<template>
  <el-select v-model="timeBoxInfo.TimeBoxID" clearable placeholder="Select" @change="onSelect">
    <el-option v-for="(it, idx) in timeBoxList" :key="idx" :label="it.TimeBoxName" :value="it.TimeBoxID">
    </el-option>
  </el-select>
</template>

<script>
import { LogComponent } from '@/components/interface.js'
import { Component } from 'vue-property-decorator'
import profileService from '@/services/ProfileService.js'

@Component({
  props: {
    timeBoxInfo: Object
  }
})
export default class Selection extends LogComponent {
  // Data members
  timeBoxList = []


  // Life cycle
  created() {
    this.update()
  }


  // Methods
  async update() {
    this.timeBoxList = await profileService.GetTimeBoxes()
  }

  async onSelect(timeBoxID) {
    this.$emit("selected", timeBoxID)
  }
}
</script>
