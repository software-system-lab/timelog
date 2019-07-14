const ProfileProvider = require('../providers/ProfileServiceProvider.js');
const LogProvider = require('../providers/LogProvider.js');

const _profileProvider = new ProfileProvider();
const _logProvider = new LogProvider();

module.exports = class {

  constructor(router) {
    this.router = router;
    this.SetAPI();
  }

  SetAPI() {
    this.router.post("/GetProfile", async function(req, res) {
      try {
        let result = await _profileProvider.GetUserProfile(req.body.FBID);
        let currentIterationInfo = await _logProvider.QueryIterationByIterationID(result.CurrentIterationID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/Login", async function(req, res) {
      try {
        let result = await _profileProvider.Login(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/Register", async function(req, res) {
      try {
        let result = await _profileProvider.Register(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/EditUserProfile", async function(req, res) {
      try {
        let result = await _profileProvider.EditUserProfile(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.get("/GetTeamList", async function(req, res) {
      try {
        let result = await _profileProvider.GetTeamList();
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetTeammates", async function(req, res) {
      try {
        let result = await _profileProvider.GetTeammatesByTeamID(req.body.TeamID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.status(404)
          .send(err);
      }
    });

    ////iteration
    this.router.post("/GetIterations", async function(req, res) {
      try {
        let result = await _profileProvider.GetIterations(req.body.UserID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetIterationByID", async function(req, res) {
      try {
        let result = await _profileProvider.GetIterationByID(req.body.IterationID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/EditIteration", async function(req, res) {
      try {
        let result = await _profileProvider.EditIteration(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteIteration", async function(req, res) {
      try {
        let result = await _profileProvider.DeleteIteration(req.body.SprintID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ChangeIteration", async function(req, res) {
      try {
        let result = await _profileProvider.ChangeIteration(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    })
  }
}