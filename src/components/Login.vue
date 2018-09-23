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
  import _logService from '../services/LogService.js'

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
          //console.log('ini login status', response) // 這裡可以得到 fb 回傳的結果
          if (response.status === 'connected') {
            var loginResult = await _profileService.Login(response.authResponse.userID, response.authResponse.accessToken);
            if (loginResult == "logined") {
              $('.fb-login-button').hide();
              window.authorized = true;
              await FB.api('/me?fields=name,id,email', async function (response) {
                //Get user Profile from FB
                window.FBProfile = await response;
                //Get user Profile
                window.Profile = await _profileService.GetProfile();
                //Get Team Sprint
                let sprintList = await _profileService.GetSprints();
                if (sprintList != "no data")
                  window.SprintList = sprintList;
                else
                  window.SprintList = [];
                //Get User Tags
                let taglist = await _logService.GetUserTags();
                window.TagList = [];
                if (taglist == "no data")
                  vueRoot.$message({
                    message: 'Go setting page to add some tags!',
                    type: 'warning'
                  });
                else {
                  window.TagList.push({
                    TagID: -1,
                    TagName: 'else',
                  });
                  taglist.forEach(x => {
                    window.TagList.push({
                      TagID: x.TagID,
                      TagName: x.TagName,
                    });
                  });
                }

                $('.el-icon-loading').hide();

                //確認sprint日期
                if (Date.parse(window.Profile.Sprint.StartDate) > Date.now() || Date.parse(window.Profile
                    .Sprint.EndDate) < Date.now()) {
                  vueRoot.$alert('Now is not in the interval of current sprint!',
                    'Anyone in your team should change the sprint interval', {
                      confirmButtonText: 'ok',
                      type: 'warning'
                    })
                }

                if (window.tempNextPath == undefined)
                  window.tempNextPath = "/Board";
                router.push({
                  path: window.tempNextPath
                })
              });
            } else if (loginResult == "unregistered") {
              // TODO
            } else {
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
