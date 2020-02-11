<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Add a Task Type</h2>
    </div>
    <el-form ref="form" :rules="formRules" :model="taskTypeData" label-width="110px" :label-position="'right'">
      <el-form-item label="Name" prop="Name" >
        <el-input v-model="taskTypeData.Name" placeholder="Task Type Name"></el-input>
      </el-form-item>
      <el-form-item label="Enable" prop="IsEnable">
        <el-switch v-model="taskTypeData.IsEnable"/>
      </el-form-item>
      <el-form-item label="Name" prop="IsPrivate">
        <el-switch v-model="taskTypeData.IsPrivate"/>
      </el-form-item>
    </el-form>
    <el-button type="danger" icon="el-icon-close" @click="cancel">Cancel</el-button>
    <el-button type="primary" icon="el-icon-edit" @click="submit">Add</el-button>
  </el-card>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import moment from 'moment'
import _logService from '@/services/LogService.js'

@Component
export default class AddType extends Vue {
  // Data members
  taskTypeData = {
    Name: "",
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
  taskTypeList = window.TaskTypeList

  // Methods
  async submit() {
    this.$refs['form'].validate(async (valid) => {
      if (valid) {
        var DuplicatedTaskType = this.taskTypeList.find(x => x.TaskTypeName == this.taskTypeData.Name)
        if (DuplicatedTaskType) {
          this.$message.error('Duplicate name!')
          return
        }
        let taskType = {
          TaskTypeID: null,
          TaskTypeName: this.taskTypeData.Name,
          IsPrivate: this.taskTypeData.IsPrivate,
          IsEnable: this.taskTypeData.IsEnable
        }
        let result = await _logService.ModifyOrAddATaskType(taskType)
        if (result) {
          this.$message({
            message: 'successed!',
            type: 'success'
          })
          this.QueryTaskTypes()
          this.$emit("saved", this.taskTypeData.Name)
        } else {
          this.$message.error('Fail to add/modify the taskType! Please Retry')
        }
      }
    })
  }

  async QueryTaskTypes() {
    let taskTypeList = await _logService.GetUserTaskTypes()

    //clear list
    window.TaskTypeList.length = 0

    if (taskTypeList == "no data")
      this.$message({
        message: 'no TaskType data!',
        type: 'warning'
      })
    else {
      taskTypeList.forEach(x => {
        window.TaskTypeList.push({
          TaskTypeID: x.TaskTypeID,
          TaskTypeName: x.TaskTypeName,
          IsPrivate: x.IsPrivate ? true : false,
          IsEnable: x.IsEnable ? true : false
        })
      })
    }
  }

  cancel() {
    this.$refs['form'].clearValidate()
    this.taskTypeName = ""
    this.$emit("close")
  }

  successMsg() {
    this.$message({
      message: 'Task Type Added!',
      type: 'success'
    })
  }

  errorMsg() {
    this.$message.error('Task Type Added Fail!Please Retry')
  }
}
</script>
