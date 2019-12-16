<template>
  <el-dialog :visible="visible" :before-close="closeDialog" @open="openHandler">
    <el-card>
      <div slot='header'>
        <span>Iteration Info</span>
      </div>
      <el-form ref="form" :model="iterationForm" label-width="110px" :label-position="'right'">
        <el-form-item label="Start Date" prop="StartDate">
          <el-date-picker v-model="iterationForm.StartDate" type="date" placeholder="Start Date"></el-date-picker>
        </el-form-item>
        <el-form-item label="End Date" prop="EndDate">
          <el-date-picker v-model="iterationForm.EndDate" type="date" placeholder="End Date" :picker-options="endDateOption"></el-date-picker>
        </el-form-item>
        <el-form-item label="Name" prop="IterationName">
          <el-input v-model="iterationForm.IterationName"></el-input>
        </el-form-item>
        <el-form-item label="Goal" prop="Content">
          <el-input type="textarea" v-model="iterationForm.Content" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="danger" icon="el-icon-close" @click="closeDialog">Cancel</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="saveIteration">Save</el-button>
    </el-card>
  </el-dialog>
</template>

<script>
import { LogComponent } from '@/components/interface.js'
import { Component } from 'vue-property-decorator'
import moment from 'moment'
import profileService from '@/services/ProfileService.js'

@Component({
  props: {
    iterationInfo: Object,
    visible: Boolean,
    isNew: Boolean
  }
})
export default class InfoDialog extends LogComponent {
  // Data members
  iterationForm = this.newForm()
  endDateOption = {}


  // Life cycle
  created() {
    this.endDateOption.disabledDate = time => {
      if (moment(this.iterationForm.StartDate) > moment(time.getTime())) {
        return true
      }
      return false
    }
  }


  // Methods
  update() {
    this.iterationForm = this.iterationInfo
  }

  openHandler() {
    if (this.isNew) {
      this.iterationForm = this.newForm();
    } else {
      this.update();
    }
  }

  newForm() {
    return {
      IterationID: null,
      IterationName: '',
      StartDate: new moment(),
      EndDate: new moment().add(7, 'days'),
      Content: ''
    }
  }

  closeDialog() {
    this.$refs['form'].resetFields();
    this.$emit('close', "info_dialog");
  }

  async saveIteration() {
    let result = await profileService.ModifyOrAddAIteration(this.iterationForm)
    if (result) {
      this.$message({
        message: 'successed!',
        type: 'success'
      })
      this.closeDialog();
      this.$emit("update", result);
    } else {
      this.$message.error('Failed to save iteration info! Please Retry!');
    }
  }
}
</script>
