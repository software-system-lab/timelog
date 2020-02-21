<template>
<div :style="css">
  <el-button type="text" @click="toTeamlist">&#8592; teamList</el-button>
</div>
</template>
<script>
export default {
  props: {
    css: String
  },
  methods: {
    toTeamlist () {
      this.$router.push({
        name: 'Team - team list'
      })
    }
  }
}
</script>
