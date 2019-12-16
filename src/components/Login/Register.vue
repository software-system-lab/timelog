<template>
<div>
  <img src="../../../static/image/timelog.png" alt="logo">
  <h1>Welcome to timelog</h1>
  <hr>
  <el-row>
    <el-col :md="6" :sm="24">
      <img alt="profile img" :src="this.profilePicture" class="img-circle" />
      <div>
        Hello! {{this.profileName}}
      </div>
    </el-col>
    <el-col :md="18" :sm="24">
      <div>It's your first time to use timelog.So,We need some infomation about you :)</div>
      <br>
      <el-form ref="form" :model="UserForm" :rules="formRules" label-width="150px" :label-position="'right'">
        <el-form-item label="Your name" prop="UserName">
          <el-input disabled v-model="UserForm.UserName"></el-input>
        </el-form-item>
        <el-form-item label="AccountID" prop="AccountID">
          <el-input v-model="UserForm.AccountID"></el-input>
        </el-form-item>
        <el-form-item label="Email Adress" prop="Email">
          <el-input v-model="UserForm.Mail" type="email"></el-input>
        </el-form-item>
        <el-form-item label="Phone number" prop="PhoneNumber">
          <el-input v-model="UserForm.Phone"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="success" icon="el-icon-check" @click="Submit">Register</el-button>
    </el-col>
  </el-row>
  <el-row>
    by Software Systems Lab,Taipei Tech
  </el-row>
</div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import _profileService from '../../services/ProfileService.js'
import { afterLogin } from "@/services/Login.js"

@Component
export default class Register extends Vue {
  // Data members
  UserForm = {
    UserName: window.FBProfile.name,
    FBID: window.FBProfile.id,
    AccountID: '',
    Mail: '',
    Phone: ''
  }

  formRules = {
    UserName: [{
      required: true,
      message: 'Check Here!',
      trigger: 'blur'
    }],
    AccountID: [{
      required: true,
      message: 'Check Here!',
      trigger: 'blur'
    }],
    Mail: [{
      required: false,
      message: 'Check Here!',
      trigger: 'blur',
      type: 'email'
    }],
    Phone: [{
      required: false,
      message: 'Check Here!',
      trigger: 'blur'
    }],
  }


  // Computed
  get profileName() {
    return window.FBProfile.name;
  }
  get profilePicture() {
    return `https://graph.facebook.com/${window.FBProfile.id}/picture?width=300`;
  }


  // Methods
  async Submit() {
    this.$refs['form'].validate(async (valid) => {
      if (valid) {
        FB.getLoginStatus(async response => {
          let result = await _profileService.Register(this.UserForm, response.authResponse.accessToken);
          if (result) {
            vueRoot.$alert('Register successed!!', {
              confirmButtonText: 'ok',
              type: 'success'
            }).then(async () => {
              await afterLogin();
            });
          } else {
            this.$message({
              type: 'error',
              message: 'Retry Or Contact the administrator'
            });
          }
        });
      }
    });
  }
}
</script>

<style scoped>
img {
  width: 150px
}
</style>
