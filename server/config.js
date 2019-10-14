module.exports = {
  DBconnection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWD,
    database: process.env.MYSQL_DB,
    timezone: "utf8"
  },
  FBAppAccessToken: {
    appId: process.env.FB_ID,
    appSecrete: process.env.FB_SECRETE
  }
}
