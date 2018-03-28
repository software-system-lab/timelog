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