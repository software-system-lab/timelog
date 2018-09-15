<template>
  <div>
    <el-row>
      <img src="../../static/image/timelog.png" alt="logo" style="display: block; margin: auto;">
    </el-row>
    <el-row>
      <h2>Welcome!</h2>
      <i class="el-icon-loading"></i>
    </el-row>
    <el-row>
      <div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false"
        data-auto-logout-link="false" data-use-continue-as="true"></div>
    </el-row>
  </div>
</template>

<script>
  import Config from "../config.js"
  import _profileService from '../services/ProfileService.js'

  export default {
    // name: 'Login',
    data() {
      return {

      }
    },
    methods: {
      login() {
        let vm = this
        FB.login(function (response) {
          //to del
          console.log('res', response)
        }, {
          scope: 'email, public_profile',
          return_scopes: true
        })
      }
    },
    mounted() {
      window.fbAsyncInit = function () {
        FB.init(Config.FBLogin);
        FB.AppEvents.logPageView();

        // Get FB Login Status
        FB.getLoginStatus(async response => {
          //to del
          console.log('ini login status', response) // 這裡可以得到 fb 回傳的結果
          if (response.status === 'connected') {
            var loginResult = await _profileService.Login(response.authResponse.userID, response.authResponse.accessToken);
            if (loginResult == "logined") {
              $('.fb-login-button').hide();
              window.authorized = true;
              await FB.api('/me?fields=name,id,email', async function (response) {
                window.userProfile = await response;
                $('.el-icon-loading').hide();
                if (window.tempNextPath == undefined)
                  window.tempNextPath = "/Board";
                router.push({
                  path: window.tempNextPath
                })
              });
            } 
            if (loginResult == "unregistered") {
              // TODO
            }
            else {
              vueRoot.$message({
                showClose: true,
                message: 'Cannot Login! Please Check Your FB status or internet connection (' + loginResult +
                  ')',
                type: 'error'
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
            $('.el-icon-loading').hide();
            window.userProfile = {};
            window.authorized = false;
          }
        })
      };
    }
  }

</script>
