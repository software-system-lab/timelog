const ProfileProvider = require('../providers/ProfileServiceProvider.js');
const LogProvider = require('../providers/LogProvider.js');
const moment = require('moment');

const _profileProvider = new ProfileProvider();
const _logProvider = new LogProvider();

async function getCurrentIteration(userID) {
  let iterationList = await _profileProvider.GetIterations(userID)
  let result = null
  const now = new moment(Date.now())
  iterationList.forEach(iteration => {
    const start = new moment(iteration.StartDate)
    const end = new moment(iteration.EndDate).add(1, 'days')
    const update = new moment(iteration.UpdateTime)
    if (now.isAfter(start) && now.isBefore(end) && (result === null || moment(result.UpdateTime).isBefore(update))) {
      result = iteration
    }
  })

  if (result === null) {
    iterationList.forEach(iteration => {
      const end = new moment(iteration.EndDate).add(1, 'days')
      if (now.isAfter(end) && (result === null || end.isAfter(moment(iteration.EndDate)))) {
        result = iteration
      }
    })
  }
  return result ? result.IterationID : null;
}

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
        const UserID = req.query.id
        let result = await _profileProvider.GetTeamList(UserID);
        for (var team of result) {
          team.name = team.TeamName
          team.id = team.TeamID
          delete team.TeamName
          delete team.TeamID
          team.size = await _profileProvider.GetTeamSize(team.id)
        }
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
        if (result) {
          const iterationID = await getCurrentIteration(req.body.UserID)
          res.send({IterationID: iterationID})
        } else {
          res.send(400);
        }
      } catch (err) {
        console.log(err);
        res.send(500);
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

    this.router.post("/iteration/current", async function(req, res) {
      if (!req.body.UserID) {
        res.send(400);
      }
      const iterationID = await getCurrentIteration(req.body.UserID)
      res.status(200).send({ IterationID: iterationID })
    })

    this.router.post("/iteration/currentRange", async function(req, res) {
      if (!req.body.UserID) {
        res.send(400)
      }
      const iterationID = await getCurrentIteration(req.body.UserID)
      res.send(await _profileProvider.GetIterationByID(iterationID))
    })
  }
}
