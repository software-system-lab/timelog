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
import Config from "../config.js";
import _profileService from "../services/ProfileService.js";
import _logService from "../services/LogService.js";

export default {
  // name: 'Login',
  data() {
    return {};
  },
  methods: {},
  mounted() {
    window.fbAsyncInit = function() {
      FB.init(Config.FBLogin);
      FB.AppEvents.logPageView();

      // Get FB Login Status
      FB.getLoginStatus(async response => {
        //console.log('ini login status', response) // 這裡可以得到 fb 回傳的結果
        if (response.status === "connected") {
          var loginResult = await _profileService.Login(
            response.authResponse.userID,
            response.authResponse.accessToken
          );
          if (loginResult == "logined") {
            $(".fb-login-button").hide();
            window.authorized = true;
            await FB.api("/me?fields=name,id,email", async function(response) {
              //Get user Profile from FB
              window.FBProfile = await response;
              //Get user Profile
              window.Profile = await _profileService.GetProfile();
              //Get User Tags
              let projectList = await _logService.GetUserProjects();
              window.ProjectList = [];
              if (projectList == "no data")
                vueRoot.$message({
                  message: "Go setting page to add some tags!",
                  type: "warning"
                });
              else {
                projectList.forEach(x => {
                  window.ProjectList.push({
                    ProjectID: x.ProjectID,
                    ProjectName: x.ProjectName
                  });
                });
              }

              $(".el-icon-loading").hide();

              if (window.tempNextPath == undefined)
                window.tempNextPath = "/Board";
              router.push({
                path: window.tempNextPath
              });
            });
          } else if (loginResult == "unregistered") {
            window.authorized = true;
            await FB.api("/me?fields=name,id,email", async function(response) {
              //Get user Profile from FB
              window.FBProfile = await response;
              router.push({
                name: "Register"
              });
            });
          } else {
            vueRoot.$message({
              showClose: true,
              message: "Cannot Login! Please Check Your FB status or internet connection (" +
                loginResult +
                ")",
              type: "error"
            });
          }
        }
        // else if (response.status === 'not_authorized') {
        //   window.authorized = false;
        // } else if (response.status === 'unknown') {
        //   window.userProfile = {};
        //   window.authorized = false;
        // }
        else {
          $(".el-icon-loading").hide();
          window.userProfile = {};
          window.authorized = false;
        }
      });
    };
  }
};
</script>

<style scoped>
img {
  display: block;
  margin: auto;
  width: 30%;
}
</style>
