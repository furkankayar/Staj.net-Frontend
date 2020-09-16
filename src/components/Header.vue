<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-2">
  <div class="container">
    <a class="navbar-brand" href="#">Staj.net</a>
    <LoginModal/>
    <RegisterModal/>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse dual-collapse2" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active pl-3">
          <router-link class="nav-link" to="/" >Home <span class="sr-only">(current)</span></router-link> 
        </li>
        <li class="nav-item pl-3">
          <a class="nav-link" href="#">Announcements</a>
        </li>
        <li class="nav-item pl-3">
          <a class="nav-link" href="#">Companies</a>
        </li>
        <li v-if="isLoggedIn === 'true'" class="nav-item pl-3">
          <a class="nav-link" href="#">My Applications</a>
        </li>
      </ul>
    </div>
    <div v-if="isLoggedIn === 'true'" class="navbar-collapse collapse order-0 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown pl-3" style="margin:0px;">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="https://71e56df8-a-62cb3a1a-s-sites.googlegroups.com/site/ehsaircraftdatabase/military-planes/f-16-fighting-falcon/F16.jpg?attachauth=ANoY7cqVLvbjgfLkt2Q0_GfWxbJETp9ecg_BExmOUOPlNG4g6F4I1g6LvKsTv0iLrDQJEjaS8gKcmdmVu1826oR46oWySpIYNSnY_SYCDVQFEAPvzYplrjtaG1k1YMXonRh-BLiXj9fe_3tSxMhka8W_DHteyN0eWAdCohvg0ryYvFirFg7QdZdFXvrNNP6JLr0gd7heMEfdZwLZrfgSKx3PC9PmUeiVW0TFaPk8dxjxXuPCkFHpACK5-Ch7s4PAb4aGirPNlVLsBcY9dN6dzrjmVCef7difmQ%3D%3D&attredirects=0" width="30" height="30" class="rounded-circle" >
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <router-link class="dropdown-item" :to="'/user/' + user.username" >Signed in as<br><b>{{ user.username }}</b></router-link>
            <hr style="margin:5px"/>
            <a class="dropdown-item" href="#">Dashboard</a>
            <a class="dropdown-item" href="#">Edit Profile</a>
            <router-link class="dropdown-item" to="/auth/logout">Log Out</router-link>
          </div>
        </li>   
      </ul>
    </div>
    <div v-if="isLoggedIn === 'false'" class="navbar-collapse collapse order-0 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item pl-3">
          <button v-b-modal.login-modal class="btn btn-primary" style="margin-right:10px;font-size:14px;width:80px;padding:3px">Login</button>
          <button v-b-modal.register-modal class="btn btn-secondary" style="font-size:14px;width:80px;padding:3px">Register</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import api from '../api.js';

export default {
    name: 'Header',
    components: {
      LoginModal,
      RegisterModal
    },
    data () {
      return {
        isLoggedIn: 'loading',
        user: {

        }
      }
    },
    async mounted () {
      window.EventBus.$on('loggedIn', async (param) => {
        this.isLoggedIn = param;
        try{
          let response = await api.whoami();
          if(response.status == 200){
            this.isLoggedIn = 'true';
            this.user = response.data;
          }
          else{
            this.isLoggedIn = 'false';
          }
        }
        catch(error){
          this.isLoggedIn = 'false';
        }
      });

      window.EventBus.$on('loggedOut', () => {
        this.isLoggedIn = 'false';
        this.user = {}; 
      });

      try{
        let response = await api.whoami();
        if(response.status == 200){
          this.isLoggedIn = 'true';
          this.user = response.data;
        }
        else{
          this.isLoggedIn = 'false';
        }
      }
      catch(error){
        this.isLoggedIn = 'false';
      }
      
    },
    methods: {
      async logout(){
        try{
          let response = await api.logout();
          if(response.status == 200){
            this.isLoggedIn = 'false';
          }
        }
        catch(error){
          this.isLoggedIn = 'false';
        }
        this.$router.push('/');
      }
    }
}
</script>

<style>

.nav-link{
  font-size: 14px;
}

.dropdown-item{
  font-size: 14px;
}


</style>