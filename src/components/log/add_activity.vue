<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Add an Activity</h2>
    </div>
    <el-form ref="form" :rules="formRules" :model="activityData" label-width="110px" :label-position="'right'">
      <el-form-item label="Name" prop="Name" >
        <el-input v-model="activityData.Name" placeholder="Activity Name"></el-input>
      </el-form-item>
      <el-form-item label="Enable" prop="IsEnable">
        <el-switch v-model="activityData.IsEnable"/>
      </el-form-item>
      <el-form-item label="Private" prop="IsPrivate">
        <el-switch v-model="activityData.IsPrivate"/>
      </el-form-item>
    </el-form>
    <el-button type="danger" icon="el-icon-close" @click="cancel">Cancel</el-button>
    <el-button type="primary" icon="el-icon-edit" @click="submit">Add</el-button>
  </el-card>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import _logService from '@/services/LogService.js'

@Component({
  props: {
    activityList: Array
  }
})
export default class AddActivity extends Vue {
  // Data members
  activityData = {
    Name: '',
    IsEnable: true,
    IsPrivate: false
  }

  formRules = {
    Name: [{
      required: true,
      message: 'Check Here!',
      trigger: 'blur'
    }],
    IsEnable: [{
      required: false,
      message: 'Check Here!',
      trigger: 'blur'
    }],
    IsPrivate: [{
      required: false,
      message: 'Check Here!',
      trigger: 'blur'
    }]
  }

  // Methods
  async submit () {
    this.$refs.form.validate(async (valid) => {
      if (valid) {
        var DuplicatedActivity = this.activityList.find(x => x.ActivityName === this.activityData.Name)
        if (DuplicatedActivity) {
          this.$message.error('Duplicate name!')
          return
        }
        const activity = {
          ActivityID: null,
          ActivityName: this.activityData.Name,
          IsPrivate: this.activityData.IsPrivate,
          IsEnable: this.activityData.IsEnable
        }
        const result = await _logService.ModifyOrAddAnActivity(activity)
        if (result) {
          this.$message({
            message: 'successed!',
            type: 'success'
          })
          this.$emit('saved', this.activityData.Name)
        } else {
          this.$message.error('Fail to add/modify the activity! Please Retry')
        }
      }
    })
  }

  cancel () {
    this.$refs.form.clearValidate()
    this.activityName = ''
    this.$emit('close')
  }

  successMsg () {
    this.$message({
      message: 'Activity Added!',
      type: 'success'
    })
  }

  errorMsg () {
    this.$message.error('Adding Activity Failed! Please Retry')
  }
}
</script>
