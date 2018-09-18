const ProfileService = require('../services/ProfileService.js');

const _profileService = new ProfileService();

module.exports = class {

  constructor(router) {
    this.router = router;
    this.SetAPI();
  }

  SetAPI() {
    this.router.post("/GetProfile", async function (req, res) {
      try {
        let result = await _profileService.GetUserProfile(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });

    this.router.post("/Login", async function (req, res) {
      try {
        let result = await _profileService.Login(req.body);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.send(400);
      }
    });
  }
}
