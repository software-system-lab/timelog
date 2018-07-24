<template>
  <el-menu>
    <img src="../static/assets/timelog.png" alt="logo" style="width: 80%; display: block; margin: auto;">
    <img alt="用戶頭像照片" src="../static/assets/Hsin.png" class="img-circle" />
    <el-menu-item index="1">
      <i class="el-icon-edit"></i>
      <span slot="title">Board</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-document"></i>
      <span slot="title">Statistics</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-menu"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: '首ya'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 80%; display: block; margin: auto;
}
.img-circle {
  border-radius: 50%;
  width: 50%; }

</style>
