var Record = require('./recordApi.js');

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

    // this.router.get("/new_arrival", function(req, res) {
    //     var callback = function(msg) {
    //         res.send(msg);
    //     };
    //     (new ItemPreview()).AddItemPreview(callback);
    // });
    //
    // this.router.get("/categoryItemRAND/:cate", function(req, res) {
    //     var callback = function(msg) {
    //         res.send(msg);
    //         //console.log(msg);
    //     };
    //     (new CategoryItem(req.params.cate)).AddItems(callback);
    // });
  }
}