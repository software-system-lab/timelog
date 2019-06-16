const LogProvider = require('../providers/LogProvider.js');

const _LogProvider = new LogProvider();

module.exports = class {

  constructor(router) {
    this.router = router;
    this.SetAPI();
  }

  SetAPI() {
    ////log
    this.router.post("/AddALog", async function(req, res) {
      try {
        let result = await _LogProvider.AddALog(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ModifyALog", async function(req, res) {
      try {
        let result = await _LogProvider.ModifyALog(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteALog", async function(req, res) {
      try {
        let result = await _LogProvider.DeleteALog(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetUserLogs", async function(req, res) {
      try {
        let result = await _LogProvider.GetUserLogsBySearch(req.body);
        let dbProjectList = await _LogProvider.GetUserProjects(req.body.UserID);
        console.log(dbProjectList)
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

    this.router.post("/GetALog", async function(req, res) {
      try {
        let result = await _LogProvider.GetALog(req.body.LogID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    ////tag
    this.router.post("/GetUserProjects", async function(req, res) {
      try {
        let result = await _LogProvider.GetUserProjects(req.body.UserID);
        result = result.filter(x => x.IsDeleted == 0);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ModifyOrAddAProject", async function(req, res) {
      try {
        let result = await _LogProvider.ModifyOrAddAProject(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteAProject", async function(req, res) {
      try {
        let result = await _LogProvider.DeleteAProject(req.body.ProjectID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    ////target
    this.router.post("/ModifyOrAddATarget", async function(req, res) {
      try {
        let result = await _LogProvider.ModifyOrAddATarget(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    ////analysis
    this.router.post("/ProjectsAndLengthOfTime", async function(req, res) {
      try {
        let dbProjects = await _LogProvider.GetUserProjects(req.body.UserID);
        var projects = [];

        if (dbProjects != 'no data')
          projects = dbProjects;
        projects.push({
          ProjectID: null,
          ProjectName: 'other',
        });
        projects.forEach(project => {
          project.TimeLength = 0;
          project.TimeTarget = null;
        });

        let targets = await _LogProvider.QueryTargetBySprint(req.body); //sync method

        if (targets != "no data") {
          targets.forEach(x => {
            let proj = projects.find(y => y.ProjectID == x.ProjectID);
            if (proj != undefined)
              proj.GoalHour = x.GoalHour;
          })
        }

        let logs = await _LogProvider.GetUserLogsByIterationID(req.body.IterationID);
        if (logs != "no data") {
          logs.forEach(log => {
            log.Tags = JSON.parse(log.Tags);
            log.CountOfTag = log.Tags.length;
            log.TotalTimeLength = (new Date(`13 June 2018 ${log.EndTime}`) - new Date(`13 June 2018 ${log.StartTime}`)) / (60 * 1000); //sec
            log.EachTagTimeLength = log.TotalTimeLength / log.CountOfTag; //sec
            log.Tags.forEach(x => {
              let xx = projects.find(y => y.TagID == x);
              if (xx != undefined)
                xx.TimeLength += log.EachTagTimeLength;
            })
          });

          targets = await targets;

          //sort by TimeLength DESC
          projects.sort((x, y) => x.TimeLength < y.TimeLength ? 1 : -1)

          res.send(projects);
        } else {
          res.send("no data");
        }
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });
  }
}