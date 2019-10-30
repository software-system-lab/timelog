const PublishProvider = require('../providers/publish_provider.js')

const publishProvider = new PublishProvider();

module.exports = class {
  constructor(router) {
    this.router = router;
    this.setAPI();
  }

  setAPI() {
    this.router.post("/", async function(req, res) {
      try {
        await publishProvider.save(req.body.UserID, req.body.StartDate, req.body.EndDate)
        res.send("success")
      } catch (err) {
        console.log(err)
        res.sendStatus(500)
      }
    })
  }
}
