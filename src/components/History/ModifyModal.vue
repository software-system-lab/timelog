<template>
<el-dialog :visible="visible" :before-close="closeModal" @open="openHandler" :fullscreen="ModalFullScreen">
  <div slot='title'>
    <h2>Modify Log</h2>
  </div>
  <el-form ref="form" :model="LogForm" :rules="formRules" label-width="110px" :label-position="'right'">
    <el-form-item label="What you do?" prop="Title">
      <el-input v-model="LogForm.Title"></el-input>
    </el-form-item>
    <el-form-item label="Project" prop="ProjectID">
      <el-select v-model="LogForm.ProjectID" filterable reserve-keyword placeholder="Choose">
        <el-option v-for="item in ProjectList" :key="item.ProjectID" :label="item.ProjectName" :value="item.ProjectID">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Start Time">
      <el-col :md="12" :sm="24">
        <el-form-item prop="StartDate">
          <el-date-picker v-model="LogForm.StartDate" type="date" placeholder="Start Date" align="'center'"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :md="12" :sm="24">
        <el-form-item prop="StartTime">
          <el-time-picker v-model="LogForm.StartTime" format="HH:mm" value-format="HH:mm">
          </el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="End Time">
      <el-col :md="12" :sm="24">
        <el-form-item prop="EndDate">
          <el-date-picker v-model="LogForm.EndDate" type="date" placeholder="End Date" :picker-options="endDateOption" align="'center'"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :md="12" :sm="24">
        <el-form-item prop="EndTime">
          <el-time-picker v-model="LogForm.EndTime" format="HH:mm" value-format="HH:mm" :picker-options='endTimeOption'>
          </el-time-picker>
        </el-form-item>
      </el-col>
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
import moment from 'moment'

export default {
  props: ['visible', 'rowDataID'],
  data() {
    return {
      LogForm: {},
      ProjectList: window.ProjectList,
      endDateOption: {},
      formRules: {
        Title: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        ProjectID: [{
          required: false,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        StartTime: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        StartDate: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        EndTime: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        EndDate: [{
          required: true,
          message: 'Check Here!',
          trigger: 'blur'
        }],
        Description: [{
          required: false,
          message: 'Check Here!',
          trigger: 'blur'
        }],
      },
    };
  },
  created() {
    this.endDateOption.disabledDate = time => {
      if (moment(this.LogForm.StartDate) > moment(time.getTime()))
        return true;
      return false;
    }
  },
  computed: {
    ModalFullScreen() {
      return window.screen.width < 992 ? true : false;
    },
    endTimeOption() {
      if (this.LogForm.StartDate == this.LogForm.EndDate) {
        return {
          selectableRange: this.LogForm.StartTime + ':00 - 23:59:59'
        }
      }
      return;
    }
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
