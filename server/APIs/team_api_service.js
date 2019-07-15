const TeamProvider = require('../providers/team_provider.js');

const _teamProvider = new TeamProvider();

module.exports = class {
  constructor(router) {
    this.router = router;
    this.SetAPI();
  }

  SetAPI() {
    this.router.get("/name", async (req, res) => {
      try {
        let teamID = req.query.id;
        let result = await _teamProvider.getTeamName(teamID);

        res.send(result[0].TeamName);
      } catch (err) {
        res.status(500);
        res.send(err);
      }
    })

    this.router.post("/create", async (req, res) => {
      try {
        let result = await _teamProvider.createTeam(req.body);
        if (result)
          res.send({
            TeamID: result
          });
        else {
          res.status(400);
          res.send(req.body);
        }
      } catch (err) {
        res.status(500);
        res.send(err);
      }
    })
  }
}