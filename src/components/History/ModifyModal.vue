<template>
  <el-dialog title="Modify Log" :visible.sync="visible" :before-close="closeModal" @open="openHandler" :fullscreen="ModalFullScreen">
    <el-form ref="form" :model="LogForm" :rules="formRules" label-width="110px" :label-position="'right'">
      <el-form-item label="What you do?" prop="Title">
        <el-input v-model="LogForm.Title"></el-input>
      </el-form-item>
      <el-form-item label="Tag" prop="Tags">
        <el-select v-model="LogForm.Tags" multiple filterable reserve-keyword placeholder="Choose">
          <el-option v-for="item in TagList" :key="item.TagID" :label="item.TagName" :value="item.TagID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="What time?" prop="Date">
        <el-date-picker v-model="LogForm.Date" type="date" placeholder="Day" :picker-options="pickerOptions" align="'center'"></el-date-picker>
      </el-form-item>
      <el-form-item prop="Duration">
        <el-time-picker v-model="LogForm.Duration" range-separator="to" start-placeholder="Start" end-placeholder="End"
          format="HH:mm" value-format="HH:mm" is-range>
        </el-time-picker>
      </el-form-item>
      <el-form-item label="Description" prop="Description">
        <el-input type="textarea" v-model="LogForm.Description" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="danger" @click="Delete()">Delete</el-button>
      <el-button @click="closeModal()">Cancel</el-button>
      <el-button type="primary" @click="Modify()">Modify</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import _logService from '../../services/LogService.js'

  export default {
    props: ['visible', 'rowDataID'],
    data() {
      return {
        LogForm: {},
        TagList: window.TagList,
        pickerOptions: {
          disabledDate(time) {
            return true;//不設定限制範圍
          },
        },
        formRules: {
          Title: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }],
          Tags: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }],
          Date: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }],
          Duration: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }],
          Description: [{
            required: false,
            message: 'Check Here!',
            trigger: 'blur'
          }],
        }
      };
    },
    computed: {
      ModalFullScreen() {
        return window.screen.width < 992 ? true : false;
      },
    },
    methods: {
      async openHandler() {
        this.LogForm = await _logService.GetAlog(this.rowDataID);
      },
      closeModal() {
        this.$refs['form'].resetFields();
        this.$emit('close-modal');
      },
      async Modify() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            let result = await _logService.ModifyALog(this.LogForm);
            if (result) {
              this.$message({
                message: 'Success!',
                type: 'success'
              });
              this.closeModal();
            }
          }
        });
      },
      async Delete() {
        this.$confirm('This operation would delete the log', 'Are you sure?', {
          confirmButtonText: 'ok',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(async () => {
          let result = await _logService.DeleteALog(this.LogForm);
          if (result) {
            this.$message({
              message: 'Deleted!',
              type: 'success'
            });
            this.closeModal();
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'canceled'
          });
        });
      }
    }
  }

</script>

<style scoped>


</style>
