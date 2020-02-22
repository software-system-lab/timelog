export default {
  FBLogin: {
    appId: process.env.VUE_APP_FBID,
    cookie: true,
    xfbml: true,
    version: 'v3.1'
  },
  apiDest: {
    host: process.env.VUE_APP_HOST
  }
}
