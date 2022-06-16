import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import axios from 'axios';
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PortalVue from 'portal-vue';

Vue.config.productionTip = false

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin)
Vue.use(PortalVue)

import routes from './routes.js';

let router = new VueRouter({
    routes: routes()
});

new Vue({
    router: router,
    render: h => h(App),
}).$mount('#app')
