<template>
<div>
  <div v-if="addLogVisible" id="add-log-popup" class="overlay">
    <div class="popup">
      <AddLog @close="closePopup"/>
    </div>
  </div>
  <el-container>
    <el-aside class="hidden-sm-and-down" width="200px">
      <router-view name="header" @addLog="openPopup"></router-view>
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
</div>
</template>

<script>
import AddLog from '@/components/log/add_log.vue'

export default {
  data() {
    return {
      addLogVisible: false
    }
  },
  methods: {
    openPopup() {
      this.addLogVisible = true;
    },
    closePopup() {
      this.addLogVisible = false;
    }
  },
  components: {
    AddLog
  }
}
</script>

<style scoped>
.el-button {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 999;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  z-index: 999;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

</style>
