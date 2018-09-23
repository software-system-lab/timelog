const ProfileService = require('../services/ProfileService.js');

const _profileService = new ProfileService();

module.exports = class {

  constructor(router) {
    this.router = router;
    this.SetAPI();
  }

  SetAPI() {
    this.router.post("/GetProfile", async function (req, res) {
      try {
        let result = await _profileService.GetUserProfile(req.body.userID);
        let teamData = await _profileService.GetTeamData(result.Team);
        let sprintData = await _profileService.GetSprintById(teamData.NowSprint);
        result.Team = {
          TeamID: teamData.TeamID,
          TeamName: teamData.TeamName
        }
        result.Sprint = {
          SprintID: sprintData.SprintID,
          StartDate:sprintData.StartDate,
          EndDate:sprintData.EndDate,
          SprintDisplayName: `${sprintData.SprintName} (${sprintData.StartDate} ~ ${sprintData.EndDate})`
        }
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/Login", async function (req, res) {
      try {
        let result = await _profileService.Login(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetSprints", async function (req, res) {
      try {
        let result = await _profileService.GetSprints(req.body.TeamID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetSprint", async function (req, res) {
      try {
        let result = await _profileService.GetSprintById(req.body.SprintID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ChangeSprint", async function (req, res) {
      try {
        let result = await _profileService.ChangeSprint(req.body);
        if (result) {
          let sprintData = await _profileService.GetSprintById(req.body.SprintID);
          let Sprint = {
            SprintID: sprintData.SprintID,
            StartDate:sprintData.StartDate,
            EndDate:sprintData.EndDate,
            SprintDisplayName: `${sprintData.SprintName} (${sprintData.StartDate} ~ ${sprintData.EndDate})`
          }
          res.send(Sprint);
        }
        else
          res(400);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ModifyOrAddASprint", async function (req, res) {
      try {
        let result = await _profileService.ModifyOrAddASprint(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteASprint", async function (req, res) {
      try {
        let result = await _profileService.DeleteASprint(req.body.SprintID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });
  }
}
