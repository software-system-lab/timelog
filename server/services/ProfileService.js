const DB = require('../DatabaseController.js');

module.exports = class {
  constructor() {

  }

  async GetUserProfile() {
    var cmd = "SELECT * FROM `user`";
    let profile = await DB.query(cmd);
    return profile;
  }
}
