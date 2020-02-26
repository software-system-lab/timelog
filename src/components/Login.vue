<template>
<div>
  <el-row>
    <img src="timelog.png" alt="logo">
  </el-row>
  <el-row>
    <h2>Welcome!</h2>
    <i class="el-icon-loading"></i>
  </el-row>
  <el-row>
    <div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true" onlogin="location.reload()"></div>
  </el-row>
  <br>
  <el-row>
    by Software Systems Lab,Taipei Tech
  </el-row>
</div>
</template>

<script>
/* global FB */
import { Vue, Component } from 'vue-property-decorator'
import $ from 'jquery'
import Config from '@/config.js'
import _profileService from '@/services/ProfileService.js'
import { afterLogin } from '@/services/Login.js'

@Component
export default class Login extends Vue {
  // Life cycle
  mounted () {
    window.fbAsyncInit = () => {
      FB.init(Config.FBLogin)
      FB.AppEvents.logPageView()

      // Get FB Login Status
      FB.getLoginStatus(async response => {
        if (response.status === 'connected') {
          this.login(response.authResponse)
        } else if (response.status === 'not_authorized') {
          FB.login(async res => {
            if (res.status === 'connected') {
              this.login(res.authResponse)
            } else {
              this.errorMessage()
            }
          })
        } else {
          $('.el-icon-loading').hide()
          window.userProfile = {}
          window.authorized = false
          this.errorMessage()
        }
      })
    }
  }

  errorMessage () {
    window.vueRoot.$message({
      showClose: true,
      message: 'Login failed!',
      type: 'error'
    })
  }

  async login ({ userID, accessToken }) {
    var loginResult = await _profileService.Login(userID, accessToken)
    await FB.api('/me?fields=name,id,email', async response => {
      // Get user Profile from FB
      window.FBProfile = await response
      if (loginResult === 'logined') {
        $('.fb-login-button').hide()
        await afterLogin()
        this.$router.push({
          path: window.tempNextPath
        })
      } else if (loginResult === 'unregistered') {
        window.authorized = true
        await FB.api('/me?fields=name,id,email', async response => {
          // Get user Profile from FB
          window.FBProfile = await response
          this.$router.push({
            name: 'Register'
          })
        })
      } else {
        window.vueRoot.$message({
          showClose: true,
          message: 'Cannot Login! Please Check Your FB status or internet connection (' +
            loginResult +
            ')',
          type: 'error'
        })
      }
    })
  }
}
</script>

<style scoped>
img {
  display: block;
  margin: auto;
  width: 30%;
}
</style>
