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
        let dbTaskTypeList = await _LogProvider.GetUserTaskTypes(req.body.UserID);
        if (result !== 'no data' && dbTaskTypeList !== 'no data')
          result.forEach(x => {
            let taskType = dbTaskTypeList.find(y => x.TaskTypeID == y.TaskTypeID)
            x.TaskTypeName = taskType !== undefined ? taskType.TaskTypeName : '';
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
    this.router.post("/GetUserTaskTypes", async (req, res) => {
      try {
        let result = await _LogProvider.GetUserTaskTypes(req.body.UserID);
        result = result.filter(x => x.IsDeleted == 0);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ModifyOrAddATaskType", async (req, res) => {
      try {
        let result = await _LogProvider.ModifyOrAddATaskType(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteATaskType", async (req, res) => {
      try {
        let result = await _LogProvider.DeleteATaskType(req.body.TaskTypeID);
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
    this.router.post("/taskTypeTimeByIteration", async (req, res) => {
      try {
        const body = req.body
        const taskTypes = await this.logService.getTaskTypeTimeByIteration(req.body.UserID, req.body.IterationID)
        res.send(taskTypes)
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post('/taskTypeTime', async (req, res) => {
      const body = req.body
      const taskTypes = await this.logService.getTaskTypeTimeByDuration(body.UserID, body.StartDate, body.EndDate)
      res.send(taskTypes)
    })
  }
}
