const LogProvider = require('../providers/LogProvider.js');

const _LogProvider = new LogProvider();

module.exports = class {

  constructor(router) {
    this.router = router;
    this.SetAPI();
  }

  SetAPI() {
    ////log
    this.router.post("/AddALog", async function (req, res) {
      try {
        let result = await _LogProvider.AddALog(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ModifyALog", async function (req, res) {
      try {
        let result = await _LogProvider.ModifyALog(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteALog", async function (req, res) {
      try {
        let result = await _LogProvider.DeleteALog(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetUserLogs", async function (req, res) {
      try {
        let result = await _LogProvider.GetUserLogsInCurrentSprint(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/GetALog", async function (req, res) {
      try {
        let result = await _LogProvider.GetALog(req.body.LogID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    ////tag
    this.router.post("/GetUserTags", async function (req, res) {
      try {
        let result = await _LogProvider.GetUserTags(req.body.UserID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/ModifyOrAddATag", async function (req, res) {
      try {
        let result = await _LogProvider.ModifyOrAddATag(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/DeleteATag", async function (req, res) {
      try {
        let result = await _LogProvider.DeleteATag(req.body.TagID);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    ////target
    this.router.post("/ModifyOrAddATarget", async function (req, res) {
      try {
        let result = await _LogProvider.ModifyOrAddATarget(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    ////analysis
    this.router.post("/TagsAndLengthOfTime", async function (req, res) {
      try {
        let tags = await _LogProvider.GetUserTags(req.body.UserID);
        tags.push({
          TagID: -1,
          TagName: 'else',
        });
        tags.forEach(x => {
          x.TimeLength = 0;
          x.TimeTarget = null;
          delete x.FBUserID;
        });

        let logs = await _LogProvider.GetUserLogsInCurrentSprint(req.body);
        let targets = _LogProvider.QueryTarget(req.body); //sync method
        if (logs != "no data") {
          logs.forEach(log => {
            log.Tags = JSON.parse(log.Tags);
            log.CountOfTag = log.Tags.length;
            log.TotalTimeLength = (new Date(`13 June 2018 ${log.EndTime}`) - new Date(`13 June 2018 ${log.StartTime}`)) / (60 * 1000); //sec
            log.EachTagTimeLength = log.TotalTimeLength / log.CountOfTag; //sec
            log.Tags.forEach(x => {
              let xx = tags.find(y => y.TagID == x);
              xx.TimeLength += log.EachTagTimeLength;
            })
          });

          targets = await targets;
          if (targets != "no data") {
            targets.forEach(x => {
              let tag = tags.find(y => y.TagID == x.TagID);
              tag.TimeTarget = x.TargetHour;
            })
          }

          //sort by TimeLength DESC
          tags.sort((x, y) => x.TimeLength < y.TimeLength ? 1 : -1)

          res.send(tags);
        } else {
          send("no data");
        }
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });
  }
}
