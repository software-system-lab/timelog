<template>
  <el-card>
    <div slot="header" class="clearfix">
      <h2>Add a Task Type</h2>
    </div>
    <el-form ref="form" :rules="formRules" label-width="110px" :label-position="'right'">
      <el-form-item label="Name" prop="TaskTypeName">
        <el-input v-model="taskTypeName" placeholder="Task Type Name"></el-input>
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
export default class AddType extends Vue {
  // Data members
  taskTypeName = ""
  formRules = {
    TaskTypeName: [{
      required: true,
      message: 'Check Here!',
      trigger: 'blur'
    }]
  }

  // Methods
  async submit() {
    this.$emit("saved", 9)
    // this.$refs['form'].validate(async (valid) => {
    //   if (valid) {
    //     this.logData.StartDate = moment(this.logData.StartDate).format('YYYY-MM-DD')
    //     this.logData.EndDate = moment(this.logData.EndDate).format('YYYY-MM-DD')
    //     let result = await logService.AddALog(this.logData);
    //     if (result) {
    //       this.successMsg()
    //       this.cancel()
    //       this.$emit("saved")
    //     } else {
    //       this.errorMsg()
    //     }
    //   }
    // })
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
