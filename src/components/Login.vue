<template>
<div>
  <el-row>
    <img src="../../static/image/timelog.png" alt="logo">
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
import { Vue, Component } from 'vue-property-decorator'
import Config from "../config.js";
import _profileService from "../services/ProfileService.js";
import _logService from "../services/LogService.js";
import { afterLogin } from "@/services/Login.js"

@Component
export default class Login extends Vue {
  // Life cycle
  mounted() {
    window.fbAsyncInit = function() {
      FB.init(Config.FBLogin)
      FB.AppEvents.logPageView()

      // Get FB Login Status
      FB.getLoginStatus(async response => {
        if (response.status === "connected") {
          var loginResult = await _profileService.Login(
            response.authResponse.userID,
            response.authResponse.accessToken
          )
          await FB.api("/me?fields=name,id,email", async function(response) {
            //Get user Profile from FB
            window.FBProfile = await response;
            if (loginResult == "logined") {
              $(".fb-login-button").hide()
              await afterLogin()
            } else if (loginResult == "unregistered") {
              window.authorized = true
              await FB.api("/me?fields=name,id,email", async function(response) {
                //Get user Profile from FB
                window.FBProfile = await response
                router.push({
                  name: "Register"
                })
              })
            } else {
              vueRoot.$message({
                showClose: true,
                message: "Cannot Login! Please Check Your FB status or internet connection (" +
                  loginResult +
                  ")",
                type: "error"
              })
            }
          })
        }
        else {
          $(".el-icon-loading").hide()
          window.userProfile = {}
          window.authorized = false
        }
      })
    }
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
