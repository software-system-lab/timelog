const LogProvider = require('../providers/LogProvider.js');
const LogService = require('../service/log_service.js')
const _LogProvider = new LogProvider();
const moment = require('moment')


module.exports = class {

  constructor(router) {
    this.router = router;
    this.SetAPI();
    this.logService = new LogService()
  }

  SetAPI() {
    ////log
    this.router.post("/AddALog", async (req, res) => {
      try {
        let result = await _LogProvider.AddALog(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ModifyALog", async (req, res) => {
      try {
        let result = await _LogProvider.ModifyALog(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteALog", async (req, res) => {
      try {
        let result = await _LogProvider.DeleteALog(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetUserLogs", async (req, res) => {
      try {
        let result = await _LogProvider.GetUserLogsBySearch(req.body);
        let dbActivityList = await _LogProvider.GetUserActivities(req.body.UserID);
        if (result !== 'no data' && dbActivityList !== 'no data')
          result.forEach(x => {
            let activity = dbActivityList.find(y => x.ActivityID == y.ActivityID)
            x.ActivityName = activity !== undefined ? activity.ActiviryName : '';
          })
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetALog", async (req, res) => {
      try {
        let result = await _LogProvider.GetALog(req.body.LogID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    ////tag
    this.router.post("/GetUserActivities", async (req, res) => {
      try {
        let result = await _LogProvider.GetUserActivities(req.body.UserID);
        result = result.filter(x => x.IsDeleted == 0);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ModifyOrAddAnActivity", async (req, res) => {
      try {
        let result = await _LogProvider.ModifyOrAddAnActivity(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteAnActivity", async (req, res) => {
      try {
        let result = await _LogProvider.DeleteAnActivity(req.body.ActivityID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    ////target
    this.router.post("/ModifyOrAddAGoal", async (req, res) => {
      try {
        let result = await _LogProvider.ModifyOrAddAGoal(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    ////analysis
    this.router.post("/ActivityTimeByTimeBox", async (req, res) => {
      try {
        const body = req.body
        const activities = await this.logService.getActivityTimeByTimeBox(req.body.UserID, req.body.TimeBoxID)
        res.send(activities)
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post('/activityTime', async (req, res) => {
      const body = req.body
      const activities = await this.logService.getActivityTimeByDuration(body.UserID, body.StartDate, body.EndDate)
      res.send(activities)
    })
  }
}
