<template>
  <el-select v-model="iterationInfo.IterationID" clearable placeholder="Select" @change="onSelect">
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
    },
    async onSelect(iterationID) {
      this.$emit("selected", iterationID)
    },
  }
}
</script>
