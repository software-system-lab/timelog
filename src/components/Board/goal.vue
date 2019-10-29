<template>
  <el-card>
    <div slot="header" class="clearfix">
      <el-button type="primary" id='iteration-setting' icon="el-icon-setting" @click='setting'></el-button>
      <h2>My Iteration Target</h2>
    </div>
    <TargetBase v-for="project in projectList" :key="project.ProjectID" v-if="project.ProjectID != null" :project="project"></TargetBase>
  </el-card>
</template>

<script>
import TargetBase from '@/components/Board/TargetBase'

export default {
  props: {
    projectList: Array
  },
  methods: {
    setting() {
      this.$emit("setting")
    }
  },
  components: {
    TargetBase
  }
}
</script>
