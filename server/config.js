module.exports = {
  DBconnection: {
    host: process.env.MARIA_HOST,
    user: process.env.MARIA_USER,
    password: process.env.MARIA_PASSWD,
    database: process.env.MARIA_DB,
    timezone: "+08:00"
  },
  FBAppAccessToken: {
    appId: process.env.FB_ID,
    appSecrete: process.env.FB_SECRETE,
  }
}
