import _profileService from "./ProfileService.js";
import _logService from "./LogService.js";

export async function afterLogin() {
  window.authorized = true;

  //Get user Profile
  window.Profile = await _profileService.GetProfile();
  //Get User Projects
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
}
