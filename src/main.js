import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
import api from './api';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(faSignOutAlt);
library.add(faPencilAlt);
library.add(faLinkedin);
library.add(faGithub);
library.add(faInstagram);
library.add(faTwitter);
library.add(faFacebook);
Vue.component('font-awesome-icon', FontAwesomeIcon);

window.EventBus = new Vue();

Vue.config.productionTip = false

Vue.use(BootstrapVue);

//Avoid navigation duplicated error
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') throw err;
  });
}

Vue.use(VueRouter);

import User from './components/User.vue';
import Logout from './components/Logout.vue';

const router = new VueRouter({
    routes: [
      { 
        path: '/user/:username', component: User, 
          beforeEnter: async (to, from, next) => {
            try{
              let res = await api.getUser(to.params.username);
              if(res.status === 200){
                to.params.user = res.data;
                next();
              }
              else{
                next("/");
              }
            }
            catch(error){
              next("/");
            }
          }  
      }, 
      {
        path: '/auth/logout', component: Logout,
          beforeEnter: async (to, from, next) => {
            try{
              let res = await api.whoami();
              if(res.status === 200){
                next();
              }
              else{
                next("/");
              }
            }
            catch(error){
              next("/");
            }
          }
      }
    ],
    mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

