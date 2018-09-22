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
        result.TeamID = result.Team;
        result.TeamName = teamData.TeamName;
        delete result.Team;
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

    this.router.post("/ModifyOrAddASprint", async function (req, res) {
      try {
        let result = await _profileService.ModifyOrAddASprint(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });
  }
}
