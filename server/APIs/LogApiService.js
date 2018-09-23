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
  }
}
