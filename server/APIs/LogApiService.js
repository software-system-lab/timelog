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
        let dbProjectList = await _LogProvider.GetUserProjects(req.body.UserID);
        if (result !== 'no data' && dbProjectList !== 'no data')
          result.forEach(x => {
            let project = dbProjectList.find(y => x.ProjectID == y.ProjectID)
            x.ProjectName = project !== undefined ? project.ProjectName : '';
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
    this.router.post("/GetUserProjects", async (req, res) => {
      try {
        let result = await _LogProvider.GetUserProjects(req.body.UserID);
        result = result.filter(x => x.IsDeleted == 0);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ModifyOrAddAProject", async (req, res) => {
      try {
        let result = await _LogProvider.ModifyOrAddAProject(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteAProject", async (req, res) => {
      try {
        let result = await _LogProvider.DeleteAProject(req.body.ProjectID);
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
    this.router.post("/projectTimeByIteration", async (req, res) => {
      try {
        const body = req.body
        const projects = await this.logService.getProjectTimeByIteration(req.body.UserID, req.body.IterationID)
        res.send(projects)
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post('/projectTime', async (req, res) => {
      const body = req.body
      const projects = await this.logService.getProjectTimeByDuration(body.UserID, body.StartDate, body.EndDate)
      res.send(projects)
    })
  }
}
