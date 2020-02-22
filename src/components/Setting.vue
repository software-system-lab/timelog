<template>
<el-row :gutter="20">
  <el-col :md="12" :sm="24">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>My Activities</h2>
      </div>
      <el-table :data="$data._activityList" sortable="true">

        <el-table-column prop="ActivityName" label="Name" align="left">
          <template slot-scope="scope">
            <el-input v-if="scope.row.ActivityID == null" placeholder="Add a new activity" minlength="1" v-model="scope.row.ActivityName">
            </el-input>
            <el-input v-else :disabled="scope.row.InputDisabled" minlength="1" v-model="scope.row.ActivityName">
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
            <el-button type="primary" icon="el-icon-plus" v-if="scope.row.ActivityID === null" circle @click="ModifyOrAdd(scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-edit" v-else circle :disabled="scope.row.ActivityName === 'others'" @click="ModifyOrAdd(scope.row)"></el-button>
            <el-button v-if="(!scope.row.InputDisabled)&&(scope.row.ActivityID !== null)" type="danger" icon="el-icon-delete" circle @click="Delete(scope.row)"></el-button>
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import _logService from '../services/LogService.js'
import _profileService from '../services/ProfileService.js'

@Component({
  props: {
    activityList: Array
  }
})
export default class Setting extends Vue {
  // Data members
  _activityList = []
  UserForm = {}
  IsProfileEdit = false

  @Watch('activityList')
  onActivityListChange () {
    this.QueryActivities()
  }

  // Life cycle
  async created () {
    this.update()
  }

  // Methods
  async QueryActivities () {
    // clear list
    this.$data._activityList = JSON.parse(JSON.stringify(this.activityList))
    // input to add activity
    this.$data._activityList.unshift({
      ActivityID: null,
      ActivityName: '',
      InputDisabled: false,
      IsPrivate: false,
      IsEnable: true
    })
  }

  cancel () {
    this.IsProfileEdit = false
    this.QueryUserProfile()
  }

  async ModifyOrAdd (activity) {
    if (activity.InputDisabled === true) {
      if (activity.ActivityID) {
        activity.InputDisabled = false
      }
    } else {
      if (activity.ActivityName.length < 1) {
        this.$message.error('Name of activity cannot be null!')
        return
      }

      var DuplicatedActivity = this.activityList.find(x => x.ActivityName === activity.ActivityName && x.ActivityID !== null && x.ActivityID !== activity.ActivityID)
      if (DuplicatedActivity) {
        this.$message.error('Duplicate name!')
        return
      }

      const result = await _logService.ModifyOrAddAnActivity(activity)
      if (result) {
        this.$message({
          message: 'successed!',
          type: 'success'
        })
        this.$emit('activityUpdate')
      } else {
        this.$message.error('Fail to add/modify the activity! Please Retry')
      }
    }
  }

  async QueryUserProfile () {
    window.Profile = await _profileService.GetProfile()
    this.UserForm = {
      UserID: window.Profile.UserID,
      UserName: window.Profile.UserName,
      AccountID: window.Profile.AccountID,
      Mail: window.Profile.Mail,
      Phone: window.Profile.Phone
    }
  }

  async EditUserProfile () {
    const result = await _profileService.EditUserProfile(this.UserForm)
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

  async Delete (data) {
    const result = await _logService.DeleteAnActivity(data.ActivityID)
    if (result) {
      this.$message({
        message: 'successed!',
        type: 'success'
      })
      this.IsProfileEdit = false
      this.$emit('activityUpdate')
    } else {
      this.$message.error('Fail to delete the activity! Please Retry')
    }
  }

  update () {
    this.QueryActivities()
    this.QueryUserProfile()
  }
}
</script>
