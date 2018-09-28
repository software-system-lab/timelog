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
          <el-form-item label="Team" prop="TeamID">
            <el-select v-model="UserForm.TeamID" filterable placeholder="Choose A team to join">
              <el-option v-for="item in TeamList" :key="item.TeamID" :label="item.TeamName" :value="item.TeamID">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Team access code" prop="TeamPwd">
            <el-input v-model="UserForm.TeamPwd" type="password" placeholder="You should ask the administrator for this!"></el-input>
          </el-form-item>
          <el-form-item label="Email Adress" prop="Email">
            <el-input v-model="UserForm.Email" type="email"></el-input>
          </el-form-item>
          <el-form-item label="Phone number" prop="PhoneNumber">
            <el-input v-model="UserForm.PhoneNumber"></el-input>
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
  import _profileService from '../../services/ProfileService.js'


  export default {
    data() {
      return {
        UserForm: {
          UserName: window.FBProfile.name,
          UserID: window.FBProfile.id,
          TeamID: '',
          TeamPwd: '',
          Email: '',
          PhoneNumber: ''
        },
        TeamList: [],
        formRules: {
          UserName: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }],
          TeamID: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }],
          TeamPwd: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }],
          Email: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur',
            type: 'email'
          }],
          PhoneNumber: [{
            required: true,
            message: 'Check Here!',
            trigger: 'blur'
          }],
        },
      }
    },
    async mounted() {
      //GetTeamList
      this.TeamList = await _profileService.GetTeamList();
    },
    computed: {
      profileName() {
        return window.FBProfile.name;
      },
      profilePicture() {
        return `https://graph.facebook.com/${window.FBProfile.id}/picture?width=300`;
      }
    },
    methods: {
      async Submit() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            FB.getLoginStatus(async response => {
              let result = await _profileService.Register(this.UserForm, response.authResponse.accessToken);
              if (result) {
                vueRoot.$alert('Register successed!!',
                  `Now you are a member of ${this.TeamList.find(x => x.TeamID = this.UserForm.TeamID).TeamName}`, {
                    confirmButtonText: 'ok',
                    type: 'success'
                  }).then(() => {
                  window.location = "/login";
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
  }

</script>

<style scoped>
  img {
    width: 150px
  }

</style>
