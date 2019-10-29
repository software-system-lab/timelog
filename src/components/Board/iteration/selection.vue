<template>
  <el-select v-model="iterationInfo.iterationID" placeholder="Select" @change="onSelect">
    <el-option v-for="(it, idx) in iterationList" :key="idx" :label="it.IterationName" :value="it.IterationID">
    </el-option>
  </el-select>
</template>

<script>
import profileService from '@/services/ProfileService.js'

export default {
  props: {
    iterationInfo: Object
  },
  data() {
    return {
      iterationList: []
    }
  },
  created() {
    this.update()
  },
  methods: {
    async update() {
      this.iterationList = await profileService.GetIterations()
      await this.getIterationInfo()
    },
    async getIterationInfo() {
      this.IterationForm = await profileService.GetIterationById(this.iterationInfo.iterationID)
    },
    async onSelect() {
      await this.getIterationInfo()
      this.$emit("selected", this.iterationInfo.iterationID)
    },
  }
}
</script>
