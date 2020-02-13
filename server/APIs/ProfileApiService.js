const ProfileProvider = require('../providers/ProfileServiceProvider.js');
const LogProvider = require('../providers/LogProvider.js');
const moment = require('moment');

const _profileProvider = new ProfileProvider();
const _logProvider = new LogProvider();

async function getCurrentTimeBox(userID) {
  let timeBoxList = await _profileProvider.GetTimeBoxes(userID)
  let result = null
  const now = new moment(Date.now())
  timeBoxList.forEach(timeBox => {
    const start = new moment(timeBox.StartDate)
    const end = new moment(timeBox.EndDate).add(1, 'days')
    const update = new moment(timeBox.UpdateTime)
    if (now.isAfter(start) && now.isBefore(end) && (result === null || moment(result.UpdateTime).isBefore(update))) {
      result = timeBox
    }
  })

  if (result === null) {
    timeBoxList.forEach(timeBox => {
      const end = new moment(timeBox.EndDate).add(1, 'days')
      if (now.isAfter(end) && (result === null || end.isAfter(moment(timeBox.EndDate)))) {
        result = timeBox
      }
    })
  }
  return result ? result.TimeBoxID : null;
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
        let currentTimeBoxInfo = await _logProvider.QueryTimeBoxByTimeBoxID(result.CurrentTimeBoxID);
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

    ////timeBox
    this.router.post("/GetTimeBoxes", async function(req, res) {
      try {
        let result = await _profileProvider.GetTimeBoxes(req.body.UserID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetTimeBoxByID", async function(req, res) {
      try {
        let result = await _profileProvider.GetTimeBoxByID(req.body.TimeBoxID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/EditTimeBox", async function(req, res) {
      try {
        let result = await _profileProvider.EditTimeBox(req.body);
        if (result) {
          const timeBoxID = await getCurrentTimeBox(req.body.UserID)
          res.send({TimeBoxID: timeBoxID})
        } else {
          res.send(400);
        }
      } catch (err) {
        console.log(err);
        res.send(500);
      }
    });

    this.router.post("/DeleteTimeBox", async function(req, res) {
      try {
        let result = await _profileProvider.DeleteTimeBox(req.body.SprintID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ChangeTimeBox", async function(req, res) {
      try {
        let result = await _profileProvider.ChangeTimeBox(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    })

    this.router.post("/timeBox/current", async function(req, res) {
      if (!req.body.UserID) {
        res.send(400);
      }
      const timeBoxID = await getCurrentTimeBox(req.body.UserID)
      res.status(200).send({ TimeBoxID: timeBoxID })
    })

    this.router.post("/timeBox/currentRange", async function(req, res) {
      if (!req.body.UserID) {
        res.send(400)
      }
      const timeBoxID = await getCurrentTimeBox(req.body.UserID)
      res.send(await _profileProvider.GetTimeBoxByID(timeBoxID))
    })
  }
}
