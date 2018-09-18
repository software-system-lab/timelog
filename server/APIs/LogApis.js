const LogService = require('../services/LogService.js');

const _LogService = new LogService();

module.exports = class {

  constructor(router) {
    this.router = router;
    this.SetAPI();
  }

  SetAPI() {
    // this.router.get("/GetLog", async function (req, res) {
    //   try {
    //     let result = await _profileService.GetUserProfile();
    //     res.send(result);
    //   } catch (err) {
    //     console.log(err);
    //     res.send(400);
    //   }
    // });

    this.router.post("/AddALog", async function (req, res) {
      try {
        let result = await _LogService.AddALog(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });
  }
}
