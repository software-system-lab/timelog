const DB = require('../DatabaseController.js');

module.exports = class {
  constructor() {

  }

  async GetUserProfile() {
    try {
      var cmd = "SELECT * FROM `user`";
      //console.log(cmd);
      let profile = await DB.query(cmd);
      return profile;
    } catch (err) {
      console.log(err)
    }
  }
}
