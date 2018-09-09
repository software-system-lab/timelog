<template>
  <el-menu>
    <img src="../../static/image/timelog.png" alt="logo">
    <img alt="用戶頭像照片" :src="this.profilePicture" class="img-circle" />
    <h4>{{this.profileName}}</h4>
    <router-link :to="{ name: 'Board'}">
      <el-menu-item index="1">
        <i class="el-icon-edit"></i>
        <span slot="title">Board</span>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'History'}">
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">History</span>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'Team'}">
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">Team</span>
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: ''}">
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </router-link>

  </el-menu>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      profileName() {
        return window.userProfile.name;
      },
      profilePicture() {
        return `https://graph.facebook.com/${window.userProfile.id}/picture?width=300`;
      }
    },
  }

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
