<template>
<el-row :gutter="20">
  <el-col :md="12" :sm="24">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>My Projects</h2>
      </div>
      <el-table :data="projectList" sortable="true">

        <el-table-column prop="ProjectName" label="Name" align="left">
          <template slot-scope="scope">
            <el-input v-if="scope.row.ProjectID == null" placeholder="Add a new project" minlength="1" v-model="scope.row.ProjectName">
            </el-input>
            <el-input v-else :disabled="scope.row.InputDisabled" minlength="1" v-model="scope.row.ProjectName">
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
            <el-button type="primary" icon="el-icon-plus" v-if="scope.row.ProjectID == null" circle @click="ModifyOrAdd(scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-edit" v-else circle @click="ModifyOrAdd(scope.row)"></el-button>
            <el-button v-if="(!scope.row.InputDisabled)&&(scope.row.ProjectID!=null)" type="danger" icon="el-icon-delete" circle @click="Delete(scope.row)"></el-button>
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
  projectList = []
  UserForm = {}
  IsProfileEdit = false


  // Life cycle
  async created() {
    this.QueryProjects()
    this.QueryUserProfile()
  }


  // Methods
  async QueryProjects() {
    let projectList = await _logService.GetUserProjects()

    //clear list
    this.projectList.length = 0
    window.ProjectList.length = 0
    // input to add project
    this.projectList.push({
      ProjectID: null,
      ProjectName: '',
      InputDisabled: false,
      IsPrivate: false,
      IsEnable: true
    })

    if (projectList == "no data")
      this.$message({
        message: 'no Project data!',
        type: 'warning'
      })
    else {
      projectList.forEach(x => {
        this.projectList.push({
          ProjectID: x.ProjectID,
          ProjectName: x.ProjectName,
          IsPrivate: x.IsPrivate ? true : false,
          IsEnable: x.IsEnable ? true : false,
          InputDisabled: true
        })
        window.ProjectList.push({
          ProjectID: x.ProjectID,
          ProjectName: x.ProjectName,
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

  async ModifyOrAdd(project) {
    if (project.InputDisabled == true) {
      if (project.ProjectID) //not new project
        project.InputDisabled = false
    } else {
      if (project.ProjectName.length < 1) {
        this.$message.error('Name of project cannot be null!')
        return
      }

      var DuplicatedProject = this.projectList.find(x => x.ProjectName == project.ProjectName && x.ProjectID != null && x.ProjectID != project.ProjectID)
      if (DuplicatedProject) {
        this.$message.error('Duplicate name!')
        return
      }

      let result = await _logService.ModifyOrAddAProject(project)
      if (result) {
        this.$message({
          message: 'successed!',
          type: 'success'
        })
        this.QueryProjects()
      } else {
        this.$message.error('Fail to add/modify the project! Please Retry')
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
    let result = await _logService.DeleteAProject(data.ProjectID)
    if (result) {
      this.$message({
        message: 'successed!',
        type: 'success'
      })
      this.IsProfileEdit = false
      this.QueryProjects()
    } else {
      this.$message.error('Fail to delete the project! Please Retry')
    }
  }

  update() {}
}
</script>
