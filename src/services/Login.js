import _profileService from "./ProfileService.js";
import _logService from "./LogService.js";

export async function afterLogin() {
  window.authorized = true;

  //Get user Profile
  window.Profile = await _profileService.GetProfile();
  //Get User TaskTypes
  let taskTypeList = await _logService.GetUserTaskTypes();

  window.TaskTypeList = [];
  if (taskTypeList == "no data")
    vueRoot.$message({
      message: "Go setting page to add some tags!",
      type: "warning"
    });
  else {
    taskTypeList.forEach(x => {
      window.TaskTypeList.push({
        TaskTypeID: x.TaskTypeID,
        TaskTypeName: x.TaskTypeName
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
