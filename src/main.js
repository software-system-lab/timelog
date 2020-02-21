/* global FB */
/* eslint one-var: ["error", { var: "always"}] */
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/en'

import router from './router'

Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.use(ElementUI, {
  locale
});

// facebook login sdk
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/zh-TW/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => {
    return record.meta.requiresAuth
  })) {
    if (window.authorized) {
      // Get FB Login Status 向FB再次驗證
      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          window.authorized = true
        } else {
          window.tempNextPath = location.pathname
          next({
            path: '/login'
          }) // redirect to login page
        }
      })
      next()
    } else {
      window.tempNextPath = location.pathname
      next({
        path: '/login'
      }) // redirect to login page
    }
  } else {
    next() // 不需要驗證則繼續
  }
})

window.vueRoot = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
