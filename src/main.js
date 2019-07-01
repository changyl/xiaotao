import Vue from 'vue';
import VueCookies from 'vue-cookies'
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill";



Vue.use(ElementUI, VueCookies, { size: 'small' });
Vue.prototype.$axios = axios;
Vue.prototype.$cookie = VueCookies;
// axios.defaults.timeout = 10000;
Vue.prototype.$axios.interceptors.request.use(config => {
        //config.data = JSON.stringify(config.data);
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        //判断是否存在ticket，即判断用户是否登录，如果存在的话，则每个http header都加上ticket

        if (VueCookies.isKey('token')) {
            //用户每次操作，都将cookie设置成2小时
            VueCookies.set("token", VueCookies.get("token") , "2h")
            VueCookies.set("name", VueCookies.get("name") , "2h")
            config.headers.token= VueCookies.get("token");
        }
        return config;

    },
    error => {
        return Promise.reject(error.response);
    });

axios.interceptors.response.use(
    response => {
        if (response.data.code=="401") {
            console.log("登录已失效")
            window.location.href='#/login'
            return
        }else if (response.data.code=="401")
        {
            return response;
        }else{
            return response;
        }
    },
    error => {
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {

    if(to.matched.some( m => m.meta.auth)) {
        if(from.path=='/login'){
            next();
        }else{
            if(VueCookies.get('token')){
                next();
            }else{
                next('/login');
            }

        }
    } else {
        console.log("请先登录");
        next()
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
