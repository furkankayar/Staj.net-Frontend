<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-2">
  <div class="container">
    <a class="navbar-brand" href="#">Staj.net</a>
    <LoginModal/>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse dual-collapse2" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active pl-3">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
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
            <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="30" height="30" class="rounded-circle" >
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" @click="goProfile()" >Signed in as<br><b>{{ user.username }}</b></a>
            <hr style="margin:5px"/>
            <a class="dropdown-item" href="#">Dashboard</a>
            <a class="dropdown-item" href="#">Edit Profile</a>
            <a class="dropdown-item" @click="logout()">Log Out</a>
          </div>
        </li>   
      </ul>
    </div>
    <div v-if="isLoggedIn === 'false'" class="navbar-collapse collapse order-0 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item pl-3">
          <button v-b-modal.login-modal class="btn btn-primary" style="margin-right:10px;font-size:14px;width:80px;padding:3px">Login</button>
          <button class="btn btn-secondary" style="font-size:14px;width:80px;padding:3px">Register</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import LoginModal from './LoginModal';
import api from '../api.js';

export default {
    name: 'Header',
    components: {
      LoginModal
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
      },
      goProfile(){
        try{
          this.$router.push('/user/' + this.user.username);
        }
        catch(error){
          this.$router.refresh();
        }
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