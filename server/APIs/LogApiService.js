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
        let result = await _LogProvider.GetUserLogsBySprint(req.body);
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
        let dbTags = await _LogProvider.GetUserTags(req.body.UserID);
        var tags = [];

        if (dbTags != 'no data') tags = dbTags;
        tags.push({
          TagID: -1,
          TagName: 'other',
        });
        tags.forEach(x => {
          x.TimeLength = 0;
          x.TimeTarget = null;
          delete x.FBUserID;
        });

        let logs = await _LogProvider.GetUserLogsBySprint(req.body);
        let targets = _LogProvider.QueryTargetBySprint(req.body); //sync method
        if (logs != "no data") {
          logs.forEach(log => {
            log.Tags = JSON.parse(log.Tags);
            log.CountOfTag = log.Tags.length;
            log.TotalTimeLength = (new Date(`13 June 2018 ${log.EndTime}`) - new Date(`13 June 2018 ${log.StartTime}`)) / (60 * 1000); //sec
            log.EachTagTimeLength = log.TotalTimeLength / log.CountOfTag; //sec
            log.Tags.forEach(x => {
              let xx = tags.find(y => y.TagID == x);
              if (xx != undefined)
                xx.TimeLength += log.EachTagTimeLength;
            })
          });

          targets = await targets;
          if (targets != "no data") {
            targets.forEach(x => {
              let tag = tags.find(y => y.TagID == x.TagID);
              if (tag != undefined)
                tag.TimeTarget = x.TargetHour;
            })
          }

          //sort by TimeLength DESC
          tags.sort((x, y) => x.TimeLength < y.TimeLength ? 1 : -1)

          res.send(tags);
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
