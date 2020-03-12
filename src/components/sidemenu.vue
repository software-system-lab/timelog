<template>
<el-menu>
  <img src="timelog.png" alt="logo">
  <img alt="profile img" :src="this.profilePicture" class="img-circle" />
  <h4>{{this.profileName}}</h4>
  <el-button icon="el-icon-document-add" type="danger" round plain @click="addLog" id="add-button">
    Add Log
  </el-button>
  <!-- <el-menu-item index="1" @click="addLog">
    <i class="el-icon-document-add"></i>
    <span slot="title">New</span>
  </el-menu-item> -->
  <router-link :to="{ name: 'Dash Board'}">
    <el-menu-item index="1">
      <i class="el-icon-edit"></i>
      <span slot="title">Dash Board</span>
    </el-menu-item>
  </router-link>
  <router-link :to="{ name: 'History'}">
    <el-menu-item index="2">
      <i class="el-icon-document"></i>
      <span slot="title">History</span>
    </el-menu-item>
  </router-link>
  <router-link :to="{ name: 'Setting'}">
    <el-menu-item index="3">
      <i class="el-icon-setting"></i>
      <span slot="title">Setting</span>
    </el-menu-item>
  </router-link>
  <router-link :to="{ name: 'Publish'}">
    <el-menu-item index="4">
      <i class="el-icon-view"></i>
      <span slot="title">Publish</span>
    </el-menu-item>
  </router-link>
  <TimeBox id="timebox"
    :activityList="activityList"
    @timeBoxSelected="timeBoxSelected"
    @goalUpdated="goalUpdated"
    @durationChanged="durationChanged"
  />
  <!-- <router-link :to="{ name: 'Team'}">
    <el-menu-item index="5">
      <i class="el-icon-custom"></i>
      <span slot="title">Team</span>
    </el-menu-item>
  </router-link> -->

</el-menu>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import TimeBox from './timeBox/index.vue'

@Component({
  components: {
    TimeBox
  },
  props: {
    activityList: Array
  }
})
export default class Sidemenu extends Vue {
  // Computed
  get profileName () {
    return window.Profile.UserName
  }

  get profilePicture () {
    return `https://graph.facebook.com/${window.FBProfile.id}/picture?width=300`
  }

  // Methods
  addLog () {
    this.$emit('addLog')
  }

  timeBoxSelected (timeBoxId) {
    this.$emit('timeBoxSelected', timeBoxId)
  }

  goalUpdated () {
    this.$emit('goalUpdated')
  }

  durationChanged (duration) {
    this.$emit('durationChanged', duration)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-menu {
  height: calc(100% - 30px);
  margin-top: 30px;
}

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

#add-button {
  margin-bottom: 10px;
}

#timebox {
  position: absolute;
  bottom: 0px;
  width: 99%;
}
</style>
