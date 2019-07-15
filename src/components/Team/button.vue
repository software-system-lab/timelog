<template>
<div :style="css">
  <el-button type="primary" round @click="join">Join</el-button>
  <el-button type="success" round @click="create">New</el-button>
</div>
</template>
<script>
export default {
  props: {
    css: String
  },
  methods: {
    join() {
      this.$router.push({
        name: "Team - join team"
      })
    },
    create() {
      this.$router.push({
        name: "Team - create team"
      })
    }
  }
}
</script>
