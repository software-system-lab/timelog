<template>
<el-menu>
  <img src="../../static/image/timelog.png" alt="logo">
  <img alt="profile img" :src="this.profilePicture" class="img-circle" />
  <h4>{{this.profileName}}</h4>
  <el-menu-item index="1" @click="addLog">
    <i class="el-icon-document-add"></i>
    <span slot="title">New</span>
  </el-menu-item>
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
  <router-link :to="{ name: 'Setting'}">
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">Setting</span>
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
      return window.Profile.UserName;
    },
    profilePicture() {
      return `https://graph.facebook.com/${window.FBProfile.id}/picture?width=300`;
    }
  },
  methods: {
    addLog() {
      this.$emit("addLog");
    }
  }
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
