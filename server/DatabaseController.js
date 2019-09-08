const mariadb = require('mariadb');
const Config = require('./config.js');

// 與資料庫連線
const pool = mariadb.createPool(Config.DBconnection);

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection()
      .then( conn => {
        conn.query(sql, values)
          .then( res => {
            console.log(res);
            conn.end();
          })
          .catch( err => {
            console.log(err);
            conn.end();
          })
      })
      .err( err => {
        console.log("DB connection failed: ", err);
      })
  })
}

module.exports = {
  query
}
