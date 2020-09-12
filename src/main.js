import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
import api from './api';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap';

window.EventBus = new Vue();

Vue.config.productionTip = false

Vue.use(BootstrapVue);

Vue.use(VueRouter);

import User from './components/User.vue';

const router = new VueRouter({
    routes: [
      { 
        path: '/user/:username', component: User, 
          beforeEnter: async function(to, from, next){
            try{
              let res = await api.getUser(to.params.username);
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

