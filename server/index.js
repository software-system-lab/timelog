var Record = require('./recordApi.js');
var Tag = require('./tagApi.js');

module.exports = class {
  constructor(router) {
    this.router = router;
    this.SetAPI();
  }

  SetAPI() {
    this.router.get("/", function(req, res) {
      res.sendfile('./UI/index.html', function(err) {
        if (err) res.send(404);
      });
    });

    this.router.get("/home", function(req, res) {
      res.sendfile('./UI/home.html', function(err) {
        if (err) res.send(404);
      });
    });

    ////////////////////////////////////////////////////////////////////////////

    this.router.post("/addALog", function(req, res) {
      var record = new Record();
      record.addALog(req.body, function(err, results) {
        if (results == null) {
          res.send("failed")
        } else {
          res.send("successed");
        }
      });
    });

    this.router.post("/modifyALog", function(req, res) {
      var record = new Record();
      record.modifyALog(req.body, function(err, results) {
        if (results == null) {
          res.send("failed")
        } else {
          res.send("successed");
        }
      });
    });

    this.router.post("/deleteALog", function(req, res) {
      var record = new Record();
      record.deleteALog(req.body.RecordID, function(err, results) {
        if (results == null) {
          res.send("failed")
        } else {
          res.send("successed");
        }
      });
    });

    this.router.post("/getRecentLog", function(req, res) {
      var record = new Record();
      record.GetRecentLog(req.body.user, function(err, results) {
        if (results == null) {
          res.send("failed")
        } else {
          res.send(results);
        }
      });
    });

    this.router.post("/getLogDetail", function(req, res) {
      var record = new Record();
      record.GetALog(req.body.RecordID, function(err, results) {
        if (results == null) {
          res.send("failed")
        } else {
          res.send(results[0]);
        }
      });
    });

    this.router.post("/getStatisticsBar", function(req, res) {
      var record = new Record();
      record.GetDurationData(req.body, function(err, results) {
        if (results == null) {
          res.send("failed")
        } else {
          res.send(results);
        }
      });
    });

    ////////////////////////////////////////////////////////////////////////////

    this.router.post("/GetUserTags", function(req, res) {
      var tag = new Tag();
      tag.GetUserTags(req.body.user, function(err, results) {
        if (results == null) {
          res.send("failed")
        } else {
          res.send(results);
        }
      });
    });

  }
}