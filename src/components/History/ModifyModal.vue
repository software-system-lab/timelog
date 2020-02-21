<template>
<el-dialog :visible="visible" :before-close="closeModal" @open="openHandler" :fullscreen="ModalFullScreen">
  <div slot='title'>
    <h2>Modify Log</h2>
  </div>
  <el-form ref="form" :model="LogForm" :rules="formRules" label-width="110px" :label-position="'right'">
    <el-form-item label="What you do?" prop="Title">
      <el-input v-model="LogForm.Title"></el-input>
    </el-form-item>
    <el-form-item label="Activity" prop="ActivityID">
      <el-select v-model="LogForm.ActivityID" filterable reserve-keyword placeholder="Choose">
        <el-option v-for="item in ActivityList" :key="item.ActivityID" :label="item.ActivityName" :value="item.ActivityID">
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
import { Vue, Component } from 'vue-property-decorator'
import _logService from '@/services/LogService.js'
import moment from 'moment'

@Component({
  props: {
    visible: Boolean,
    rowDataID: Number
  }
})
export default class ModifyModal extends Vue {
  // Data members
  LogForm = this.initLogForm()
  ActivityList = window.ActivityList
  endDateOption = {}
  formRules = {
    Title: [{
      required: true,
      message: 'Check Here!',
      trigger: 'blur'
    }],
    ActivityID: [{
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
    }]
  }

  // Computed
  get ModalFullScreen () {
    return window.screen.width < 992
  }

  get endTimeOption () {
    if (this.LogForm.StartDate === this.LogForm.EndDate) {
      return {
        selectableRange: this.LogForm.StartTime + ':00 - 23:59:59'
      }
    }
  }

  // Life cycle
  created () {
    this.endDateOption.disabledDate = time => {
      if (moment(this.LogForm.StartDate) > moment(time.getTime())) { return true }
      return false
    }
  }

  // Methods
  async openHandler () {
    this.LogForm = await _logService.GetAlog(this.rowDataID)
  }

  closeModal () {
    this.LogForm = this.initLogForm()
    this.$refs.form.resetFields()
    this.$emit('close-modal')
  }

  initLogForm () {
    return {
      StartDate: new Date(),
      EndDate: new Date(),
      StartTime: '',
      EndTime: ''
    }
  }

  async Modify () {
    this.$refs.form.validate(async (valid) => {
      if (valid) {
        this.LogForm.StartDate = moment(this.LogForm.StartDate).format('YYYY-MM-DD')
        this.LogForm.EndDate = moment(this.LogForm.EndDate).format('YYYY-MM-DD')

        const result = await _logService.ModifyALog(this.LogForm)
        if (result) {
          this.$message({
            message: 'Success!',
            type: 'success'
          })
          this.closeModal()
        }
      }
    })
  }

  async Delete () {
    this.$confirm('This operation would delete the log', 'Are you sure?', {
      confirmButtonText: 'ok',
      cancelButtonText: 'cancel',
      type: 'warning'
    }).then(async () => {
      const result = await _logService.DeleteALog(this.LogForm)
      if (result) {
        this.$message({
          message: 'Deleted!',
          type: 'success'
        })
        this.closeModal()
      }
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'canceled'
      })
    })
  }
}
</script>
