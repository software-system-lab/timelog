<template>
<div>
  <div v-if="addActivityVisible" id="add-activity-popup" class="overlay">
    <div class="popup">
      <AddType :activityList="activityList" @close="closePopup" @saved="update"/>
    </div>
  </div>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Add a Log</h2>
    </div>
    <el-form ref="form" :model="logData" :rules="formRules" label-width="110px" :label-position="'right'">
      <el-form-item label="Title" prop="Title">
        <el-input v-model="logData.Title"></el-input>
      </el-form-item>
      <el-form-item label="Activity" prop="ActivityID">
        <el-select ref="activitySelector" v-model="logData.ActivityID" filterable reserve-keyword placeholder="Choose">
          <el-option-group>
            <el-option v-for="item in activityList" :key="item.ActivityID" :label="item.ActivityName" :value="item.ActivityID">
            </el-option>
          </el-option-group>
          <el-option-group>
            <el-option key="AddActivity" id="addlog-dropdown-button-newtype" value="">
              <el-button @click="createNewType">New Type</el-button>
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="Start Time">
        <el-col :md="12" :sm="24">
          <el-form-item prop="StartDate">
            <el-date-picker v-model="startDate" type="date" placeholder="Start Date" :picker-options="startDateOption" align="'center'"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item prop="StartTime">
            <el-time-picker v-model="startTime" format="HH:mm" value-format="HH:mm" :picker-options='startTimeOption'>
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="End Time">
        <el-col :md="12" :sm="24">
          <el-form-item prop="EndDate">
            <el-date-picker v-model="endDate" type="date" placeholder="End Date" :picker-options="endDateOption" align="'center'"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item prop="EndTime">
            <el-time-picker v-model="endTime" format="HH:mm" value-format="HH:mm" :picker-options='endTimeOption'>
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
</div>
</template>

<script>
import { Vue, Component, Watch } from 'vue-property-decorator'
import moment from 'moment'
import logService from '@/services/LogService.js'
import AddType from '@/components/log/add_type.vue'

@Component({
  components: {
    AddType
  },
  props: {
    activityList: Array
  }
})
export default class AddLog extends Vue {
  // Data members
  logData = null
  formRules = {
    Title: [{
      required: true,
      message: 'Check Here!',
      trigger: 'blur'
    }],
    ActivityID: [{
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
    }]
  }

  startTime = null
  endTime = null
  startDate = null
  endDate = null

  startDateOption = {}
  endDateOption = {}
  startTimeOption = {}
  endTimeOption = {
    selectableRange: '00:00:00 - 23:59:59'
  }

  addActivityVisible = false

  @Watch('startTime')
  startTimeSelected () {
    const startDate = moment(this.startDate)
    const endDate = moment(this.endDate)
    if (startDate.format('YYYY-MM-DD') === endDate.format('YYYY-MM-DD')) {
      const timeArray = this.startTime.split(':')
      const startTime = moment(this.startDate).hour(timeArray[0]).minute(timeArray[1])
      this.endTimeOption.selectableRange = startTime.add(1, 'minutes').format('HH:mm') + ':00 - 23:59:59'
      if (this.startTime >= this.endTime) {
        this.endTime = startTime.add(1, 'hours').add(-1, 'minutes').format('HH:mm')
      }
    } else if (startDate < endDate) {
      this.endTimeOption.selectableRange = '00:00:00 - 23:59:59'
    } else {
      this.endTimeOption.selectableRange = '00:00:00 - 00:00:00'
    }
  }

  @Watch('startDate')
  startDateSelected () {
    this.endDateOption.disabledDate = time => moment(this.startDate) > moment(time.getTime())
    if (this.startDate !== this.endDate) {
      this.endDate = this.startDate.toString()
    }
  }

  // Life cycle
  created () {
    this.emptyLog()
    this.startDateOption.disabledDate = time => moment() <= moment(time.getTime())
    this.endDateOption.disabledDate = time => moment(this.startDate) > moment(time.getTime())
  }

  // Methods
  async submit () {
    this.$refs.form.validate(async (valid) => {
      if (valid) {
        this.logData.StartDate = moment(this.startDate).format('YYYY-MM-DD')
        this.logData.EndDate = moment(this.endDate).format('YYYY-MM-DD')
        this.logData.StartTime = moment(this.logData.StartDate + ' ' + this.startTime).format('HH:mm')
        this.logData.EndTime = moment(this.logData.EndDate + ' ' + this.endTime).format('HH:mm')
        let result
        try {
          result = await logService.AddALog(this.logData)
        } catch (errorCode) {
          if (errorCode === 777) {
            this.$message.error('Time overlaps')
          } else {
            this.$message.error(`Error Code : ${errorCode}`)
          }
          return
        }

        if (result) {
          this.successMsg()
          this.cancel()
          this.$emit('saved')
        } else {
          this.errorMsg()
        }
      }
    })
  }

  cancel () {
    this.$refs.form.clearValidate()
    this.emptyLog()
    this.$emit('close')
  }

  emptyLog () {
    this.startTime = moment().add(-1, 'hours').format('HH:mm')
    this.endTime = moment().format('HH:mm')
    this.startDate = moment().add(-1, 'hours').format('YYYY-MM-DD')
    this.endDate = moment().format('YYYY-MM-DD')

    this.logData = {
      Title: '',
      ActivityID: null,
      StartTime: this.startTime,
      EndTime: this.endTime,
      StartDate: this.startDate,
      EndDate: this.endDate,
      Description: ''
    }
  }

  successMsg () {
    this.$message({
      message: 'Log Added!',
      type: 'success'
    })
  }

  errorMsg () {
    this.$message.error('Log Added Fail!Please Retry')
  }

  openPopup () {
    this.addActivityVisible = true
  }

  closePopup () {
    this.addActivityVisible = false
  }

  update (newActivityName) {
    this.closePopup()
    this.$emit('activityUpdate')
  }

  createNewType () {
    this.openPopup()
  }
}
</script>

<style scoped>
#addlog-dropdown-button-newtype {
  background-color: #ffffff;
  height: 40px;
}

#addlog-dropdown-button-newtype>button {
  height: 100%;
  width: 100%;
}

#addlog-dropdown-button-newtype:hover {
  background-color: #ffffff;
}
</style>
