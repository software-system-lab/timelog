// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false
/* eslint-disable no-new */

window.jQuery = $;
window.$ = $;
window.Vue = Vue;
window.router = router;

Vue.use(ElementUI, {
  locale
});

// facebook login sdk
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/zh-TW/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.statusChangeCallback = function (response) {
  let vm = window;
  if (response.status === 'connected') {
    vm.authorized = true;
  } else {
    window.tempNextPath = location.pathname;
    next({
      path: '/login'
    }); // redirect to login page 
  }
}

//路由驗證
window.router.beforeEach(async (to, from, next) => {
  // console.log('to=', to.fullPath, '| from=', from.fullPath);
  if (to.matched.some(record => {
      // console.log(record.name, record.meta.requiresAuth);
      return record.meta.requiresAuth;
    })) {
    if (window.authorized) {
      // Get FB Login Status 向FB再次驗證
      FB.getLoginStatus(response => {
        console.log('next login status', response) // 這裡可以得到 fb 回傳的結果
        window.statusChangeCallback(response);
      })
      next();
    } else {
      window.tempNextPath = location.pathname;
      next({
        path: '/login'
      }); // redirect to login page 
    }
  } else {
    next(); // 不需要驗證則繼續
  }
})

window.vueRoot = new Vue({
  el: '#app',
  router,
  data() {

  },
  render: h => h(App),
})
