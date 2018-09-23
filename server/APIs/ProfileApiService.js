const ProfileProvider = require('../providers/ProfileServiceProvider.js');

const _profileProvider = new ProfileProvider();

module.exports = class {

  constructor(router) {
    this.router = router;
    this.SetAPI();
  }

  SetAPI() {
    this.router.post("/GetProfile", async function (req, res) {
      try {
        let result = await _profileProvider.GetUserProfile(req.body.userID);
        let teamData = await _profileProvider.GetTeamData(result.Team);
        let sprintData = await _profileProvider.GetSprintById(teamData.NowSprint);
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
        let result = await _profileProvider.Login(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetSprints", async function (req, res) {
      try {
        let result = await _profileProvider.GetSprints(req.body.TeamID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetSprint", async function (req, res) {
      try {
        let result = await _profileProvider.GetSprintById(req.body.SprintID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ChangeSprint", async function (req, res) {
      try {
        let result = await _profileProvider.ChangeSprint(req.body);
        if (result) {
          let sprintData = await _profileProvider.GetSprintById(req.body.SprintID);
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
        let result = await _profileProvider.ModifyOrAddASprint(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteASprint", async function (req, res) {
      try {
        let result = await _profileProvider.DeleteASprint(req.body.SprintID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });
  }
}
