<template>
  <el-container>
    <el-aside class="hidden-sm-and-down" width="200px">
      <router-view name="header"></router-view>
    </el-aside>
    <el-container>
      <el-popover placement="right" width="300" trigger="click" class="hidden-md-and-up">
        <router-view name="header"></router-view>
        <el-button slot="reference" class="el-icon-more-outline"></el-button>
      </el-popover>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {

  }

</script>

<style scoped>
  .el-button {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 999;
  }

</style>
