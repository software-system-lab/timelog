<template>
  <el-col :md="6" :sm="6">
    <h5>{{tag.TagName}}</h5>
    <el-progress type="circle" :percentage="TagProgressPercentage" :color="TagProgressColor" :status="TagProgressStatus"></el-progress>
    <el-row>
      <el-input :disabled="!changeBoxEnable" size="mini" type="number" step="1" min="1" placeholder="Target (in Hour)"
        suffix-icon="el-icon-edit-outline" v-model="tag.TimeTarget">
      </el-input>
    </el-row>
    <el-row>
      <div v-if="!changeBoxEnable">
        <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="openChangeBox()"></el-button>
      </div>
      <div v-if="changeBoxEnable">
        <el-button type="success" size="mini" icon="el-icon-check" circle @click="confirmChangeBox()"></el-button>
        <el-button type="danger" size="mini" icon="el-icon-close" circle @click="cancelChangeBox()"></el-button>
      </div>
    </el-row>
  </el-col>
</template>

<script>
  import _logService from '../../services/LogService.js'

  export default {
    props: ['tag'],
    data() {
      return {
        changeBoxEnable: false,
      }
    },
    computed: {
      TagProgressPercentage() {
        if (this.tag.TimeTarget != null)
          return Number((this.tag.TimeLength / (this.tag.TimeTarget * 60) * 100).toFixed(2));
        return 100;
      },
      TagProgressColor() {
        let result = (this.tag.TimeLength / (this.tag.TimeTarget * 60) * 100).toFixed(2);
        if (this.tag.TimeTarget == null)
          return '#ff9900'; //orange 
        else if (result < 50)
          return '#e60000'; //red
        else if (result > 100)
          return '#33cc00'; //green
        return '#0000FF'; //blue
      },
      TagProgressStatus() {
        if (this.tag.TimeTarget == null) return 'exception';
      }
    },
    methods: {
      openChangeBox() {
        this.changeBoxEnable = true;
      },
      async confirmChangeBox() {
        if (this.tag.TimeTarget <= 0 || this.tag.TimeTarget % 1 != 0) {
          this.$message({
            message: 'Target should be an integer!',
            type: 'error'
          });
          return;
        }

        let result = await _logService.ModifyOrAddATarget(this.tag);
        if (result) {
          this.$message({
            message: 'Updated!',
            type: 'success'
          });
          this.changeBoxEnable = false;
        }
      },
      cancelChangeBox() {
        this.changeBoxEnable = false;
      },
    }
  }

</script>

<style scoped>
  .el-col {
    height: 260px;
  }

  .el-input {
    width: 80%;
  }

</style>
