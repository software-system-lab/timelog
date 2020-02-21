const PublishProvider = require('../providers/publish_provider.js')
const PublishService = require('../service/publish_service.js')

const publishProvider = new PublishProvider();

module.exports = class {
  constructor(router) {
    this.router = router;
    this.setAPI();
    this.publishService = new PublishService()
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

    this.router.get("/data", async (req, res) => {
      try {
        const userDataList = await this.publishService.getUserDataList()
        res.status(200).send(userDataList);
      } catch (err) {
        console.log(err)
        res.sendStatus(500)
      }
    })
  }
}
