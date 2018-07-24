<template>
  <el-menu>
    <img src="../static/assets/timelog.png" alt="logo" class="">
    <img alt="用戶頭像照片" src="../static/assets/Hsin.png" class="img-circle" />

    <router-link :to="{ name: 'Board'}">
      <el-menu-item index="1">
        <i class="el-icon-edit"></i>
        <span slot="title">Board</span>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'Statistics'}">
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">Statistics</span>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'Statistics'}">
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'Statistics'}">
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
  export default {}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    width: 80px;
    display: block;
    margin: auto;
  }

  .img-circle {
    border-radius: 50%;
  }

  a {
    text-decoration: none;
  }

</style>
