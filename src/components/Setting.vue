<template>
<el-row :gutter="20">
  <el-col :md="12" :sm="24">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>My TaskTypes</h2>
      </div>
      <el-table :data="taskTypeList" sortable="true">

        <el-table-column prop="TaskTypeName" label="Name" align="left">
          <template slot-scope="scope">
            <el-input v-if="scope.row.TaskTypeID == null" placeholder="Add a new taskType" minlength="1" v-model="scope.row.TaskTypeName">
            </el-input>
            <el-input v-else :disabled="scope.row.InputDisabled" minlength="1" v-model="scope.row.TaskTypeName">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label='enable' align="left">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.IsEnable" :disabled="scope.row.InputDisabled">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label='private' align="left">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.IsPrivate" :disabled="scope.row.InputDisabled">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="" align="left">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" v-if="scope.row.TaskTypeID == null" circle @click="ModifyOrAdd(scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-edit" v-else circle @click="ModifyOrAdd(scope.row)"></el-button>
            <el-button v-if="(!scope.row.InputDisabled)&&(scope.row.TaskTypeID!=null)" type="danger" icon="el-icon-delete" circle @click="Delete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-col>
  <el-col :md="12" :sm="24">
    <el-card>
      <div slot="header" class="clearfix">
        <h2>My Profile</h2>
      </div>
      <el-form ref="form" :model="UserForm" label-width="150px" :inline="true" :label-position="'right'">
        <el-form-item label="Your name" prop="UserName">
          <el-input :disabled="!IsProfileEdit" v-model="UserForm.UserName"></el-input>
        </el-form-item>
        <el-form-item label="Account ID" prop="AccountID">
          <el-input :disabled="!IsProfileEdit" v-model="UserForm.AccountID"></el-input>
        </el-form-item>
        <el-form-item label="Mail Adress" prop="Mail">
          <el-input :disabled="!IsProfileEdit" v-model="UserForm.Mail" type="email"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="Phone">
          <el-input :disabled="!IsProfileEdit" v-model="UserForm.Phone"></el-input>
        </el-form-item>
      </el-form>
      <el-button v-if="!IsProfileEdit" type="primary" icon="el-icon-edit" @click="()=>{this.IsProfileEdit = true}">Edit</el-button>
      <el-button v-if="IsProfileEdit" type="primary" icon="el-icon-edit" @click="EditUserProfile">Save</el-button>
      <el-button v-if="IsProfileEdit" @click="cancel">Cancel</el-button>
    </el-card>
  </el-col>
</el-row>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import _logService from '../services/LogService.js'
import _profileService from '../services/ProfileService.js'

@Component
export default class Setting extends Vue {
  // Data members
  taskTypeList = []
  UserForm = {}
  IsProfileEdit = false


  // Life cycle
  async created() {
    this.QueryTaskTypes()
    this.QueryUserProfile()
  }


  // Methods
  async QueryTaskTypes() {
    let taskTypeList = await _logService.GetUserTaskTypes()

    //clear list
    this.taskTypeList.length = 0
    window.TaskTypeList.length = 0
    // input to add taskType
    this.taskTypeList.push({
      TaskTypeID: null,
      TaskTypeName: '',
      InputDisabled: false,
      IsPrivate: false,
      IsEnable: true
    })

    if (taskTypeList == "no data")
      this.$message({
        message: 'no TaskType data!',
        type: 'warning'
      })
    else {
      taskTypeList.forEach(x => {
        this.taskTypeList.push({
          TaskTypeID: x.TaskTypeID,
          TaskTypeName: x.TaskTypeName,
          IsPrivate: x.IsPrivate ? true : false,
          IsEnable: x.IsEnable ? true : false,
          InputDisabled: true
        })
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
    this.IsProfileEdit = false
    this.QueryUserProfile()
  }

  async ModifyOrAdd(taskType) {
    if (taskType.InputDisabled == true) {
      if (taskType.TaskTypeID) //not new taskType
        taskType.InputDisabled = false
    } else {
      if (taskType.TaskTypeName.length < 1) {
        this.$message.error('Name of taskType cannot be null!')
        return
      }

      var DuplicatedTaskType = this.taskTypeList.find(x => x.TaskTypeName == taskType.TaskTypeName && x.TaskTypeID != null && x.TaskTypeID != taskType.TaskTypeID)
      if (DuplicatedTaskType) {
        this.$message.error('Duplicate name!')
        return
      }

      let result = await _logService.ModifyOrAddATaskType(taskType)
      if (result) {
        this.$message({
          message: 'successed!',
          type: 'success'
        })
        this.QueryTaskTypes()
      } else {
        this.$message.error('Fail to add/modify the taskType! Please Retry')
      }
    }
  }

  async QueryUserProfile() {
    window.Profile = await _profileService.GetProfile()
    this.UserForm = {
      UserID: window.Profile.UserID,
      UserName: window.Profile.UserName,
      AccountID: window.Profile.AccountID,
      Mail: window.Profile.Mail,
      Phone: window.Profile.Phone
    }
  }

  async EditUserProfile() {
    let result = await _profileService.EditUserProfile(this.UserForm)
    if (result) {
      this.$message({
        message: 'successed!',
        type: 'success'
      })
      this.IsProfileEdit = false
      this.QueryUserProfile()
    } else {
      this.$message.error('Fail to modify your personal profile! Please Retry')
    }
  }

  async Delete(data) {
    let result = await _logService.DeleteATaskType(data.TaskTypeID)
    if (result) {
      this.$message({
        message: 'successed!',
        type: 'success'
      })
      this.IsProfileEdit = false
      this.QueryTaskTypes()
    } else {
      this.$message.error('Fail to delete the taskType! Please Retry')
    }
  }

  update() {}
}
</script>
