<template>
  <el-select v-model="iterationInfo.IterationID" clearable placeholder="Select" @change="onSelect">
    <el-option v-for="(it, idx) in iterationList" :key="idx" :label="it.IterationName" :value="it.IterationID">
    </el-option>
  </el-select>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import profileService from '@/services/ProfileService.js'

@Component({
  props: {
    iterationInfo: Object
  }
})
export default class Selection extends Vue {
  // Data members
  iterationList = []


  // Life cycle
  created() {
    this.update()
  }


  // Methods
  async update() {
    this.iterationList = await profileService.GetIterations()
  }

  async onSelect(iterationID) {
    this.$emit("selected", iterationID)
  }
}
</script>
