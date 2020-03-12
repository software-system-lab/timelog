<template>
  <el-dialog :visible="visible" :before-close="closeDialog" @open="openHandler">
    <el-card>
      <div slot='header'>
        <span>Time Box Info</span>
      </div>
      <el-form ref="form" :model="timeBoxForm" :rules="formRules" label-width="110px" :label-position="'right'">
        <el-form-item label="Start Date" prop="StartDate">
          <el-date-picker v-model="timeBoxForm.StartDate" type="date" placeholder="Start Date" :picker-options="startDateOption" :clearable="false"/>
        </el-form-item>
        <el-form-item label="End Date" prop="EndDate">
          <el-date-picker v-model="timeBoxForm.EndDate" type="date" placeholder="End Date" :picker-options="endDateOption" :clearable="false"/>
        </el-form-item>
        <el-form-item label="Name" prop="TimeBoxName">
          <el-input v-model="timeBoxForm.TimeBoxName"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="Content">
          <el-input type="textarea" v-model="timeBoxForm.Content" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="danger" icon="el-icon-close" @click="closeDialog">Cancel</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="saveTimeBox">Save</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { LogComponent } from '@/components/interface.js'
import { Component, Watch } from 'vue-property-decorator'
import moment from 'moment'
import profileService from '@/services/ProfileService.js'

@Component({
  props: {
    value: Object,
    visible: Boolean,
    isNew: Boolean,
    timeBoxInfo: Object
  }
})
export default class InfoDialog extends LogComponent {
  // Data members
  timeBoxForm = this.newForm()
  startDateOption = {}
  endDateOption = {}
  formRules = {
    TimeBoxName: [{
      required: true,
      message: 'Check Here!',
      trigger: 'blur'
    }],
    StartDate: [{
      required: true,
      message: 'Check Here!',
      trigger: 'blur'
    }],
    EndDate: [{
      required: true,
      message: 'Check Here!',
      trigger: 'blur'
    }],
    Content: [{
      required: false,
      message: 'Check Here!',
      trigger: 'blur'
    }]
  }

  @Watch('timeBoxInfo', { deep: true })
  timeBoxInfoChanged (timeBoxInfo) {
    this.timeBoxForm = { ...timeBoxInfo }
  }

  // Life cycle
  created () {
    this.startDateOption.disabledDate = time => moment(this.timeBoxForm.EndDate) < moment(time.getTime())
    this.endDateOption.disabledDate = time => moment(this.timeBoxForm.StartDate) > moment(time.getTime())
  }

  // Methods
  openHandler () {
    if (this.isNew) {
      this.timeBoxForm = this.newForm()
    }
  }

  newForm () {
    return {
      TimeBoxID: null,
      TimeBoxName: '',
      StartDate: moment(),
      EndDate: moment().add(7, 'days'),
      Content: ''
    }
  }

  closeDialog () {
    this.$emit('close', 'info_dialog')
  }

  async saveTimeBox () {
    this.$refs.form.validate(async (valid) => {
      if (valid) {
        const result = await profileService.ModifyOrAddATimeBox(this.timeBoxForm)
        if (result) {
          this.$message({
            message: 'successed!',
            type: 'success'
          })
          this.closeDialog()
          this.$emit('update', result)
        } else {
          this.$message.error('Failed to save time box info! Please Retry!')
        }
      }
    })
  }
}
</script>
