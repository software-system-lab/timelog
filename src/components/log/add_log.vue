<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Add a Log</h2>
    </div>
    <el-form ref="form" :model="logData" :rules="formRules" label-width="110px" :label-position="'right'">
      <el-form-item label="Title" prop="Title">
        <el-input v-model="logData.Title"></el-input>
      </el-form-item>
      <el-form-item label="TaskType" prop="TaskTypeID">
        <el-select v-model="logData.TaskTypeID" filterable reserve-keyword placeholder="Choose">
          <el-option
            v-for="item in TaskTypeList"
            :key="item.TaskTypeID"
            :label="item.TaskTypeName"
            :value="item.TaskTypeID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Start Time">
        <el-col :md="12" :sm="24">
          <el-form-item prop="StartDate">
            <el-date-picker v-model="logData.StartDate" type="date" placeholder="Start Date" align="'center'"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item prop="StartTime">
            <el-time-picker v-model="logData.StartTime" format="HH:mm" value-format="HH:mm">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="End Time">
        <el-col :md="12" :sm="24">
          <el-form-item prop="EndDate">
            <el-date-picker v-model="logData.EndDate" type="date" placeholder="End Date" :picker-options="endDateOption" align="'center'"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item prop="EndTime">
            <el-time-picker v-model="logData.EndTime" format="HH:mm" value-format="HH:mm" :picker-options='endTimeOption'>
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Description" prop="Description">
        <el-input type="textarea" v-model="logData.Description" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="danger" icon="el-icon-close" @click="cancel">Cancel</el-button>
    <el-button type="primary" icon="el-icon-edit" @click="submit">Add</el-button>
  </el-card>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import moment from 'moment'
import logService from '@/services/LogService.js'

@Component
export default class AddLog extends Vue {
  // Data members
  TaskTypeList = window.TaskTypeList
  logData = this.emptyLog()
  formRules = {
    Title: [{
      required: true,
      message: 'Check Here!',
      trigger: 'blur'
    }],
    TaskTypeID: [{
      required: true,
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
  }
  endDateOption = {}


  // Life cycle
  created() {
    this.endDateOption.disabledDate = time => {
      if (moment(this.logData.StartDate) > moment(time.getTime()))
        return true
      return false
    }
  }


  // Computed
  get endTimeOption() {
    if (this.logData.StartDate == this.logData.EndDate) {
      return {
        selectableRange: this.logData.StartTime + ':00 - 23:59:59'
      }
    }
    return
  }


  // Methods
  async submit() {
    this.$refs['form'].validate(async (valid) => {
      if (valid) {
        this.logData.StartDate = moment(this.logData.StartDate).format('YYYY-MM-DD')
        this.logData.EndDate = moment(this.logData.EndDate).format('YYYY-MM-DD')
        let result = await logService.AddALog(this.logData);
        if (result) {
          this.successMsg()
          this.cancel()
          this.$emit("saved")
        } else {
          this.errorMsg()
        }
      }
    })
  }

  cancel() {
    this.$refs['form'].clearValidate()
    this.logData = this.emptyLog()
    this.$emit("close")
  }

  emptyLog() {
    return {
      Title: '',
      TaskTypeID: null,
      StartTime: new moment().add(-1, 'hours').format('HH:mm'),
      EndTime: new moment().format('HH:mm'),
      StartDate: new moment().add(-1, 'hours').format('YYYY-MM-DD'),
      EndDate: new moment().format('YYYY-MM-DD'),
      Description: ''
    }
  }

  successMsg() {
    this.$message({
      message: 'Log Added!',
      type: 'success'
    })
  }

  errorMsg() {
    this.$message.error('Log Added Fail!Please Retry')
  }
}
</script>
