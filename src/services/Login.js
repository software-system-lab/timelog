import _profileService from "./ProfileService.js";
import _logService from "./LogService.js";

export async function afterLogin() {
  window.authorized = true;

  //Get user Profile
  window.Profile = await _profileService.GetProfile();
  //Get User Activities
  let activityList = await _logService.GetUserActivities();

  window.Activitylist = [];
  if (activityList == "no data")
    vueRoot.$message({
      message: "Go setting page to add some tags!",
      type: "warning"
    });
  else {
    activityList.forEach(x => {
      window.Activitylist.push({
        ActivityID: x.ActivityID,
        ActivityName: x.ActivityName
      });
    });
  }

  $(".el-icon-loading").hide();

  if (window.tempNextPath == undefined)
    window.tempNextPath = "/Board";

  router.push({
    path: window.tempNextPath
  });
}
