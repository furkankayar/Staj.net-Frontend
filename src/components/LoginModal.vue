<template>
  <div>
    <b-modal @hidden="modalClosing()" id="login-modal" size="md" title="Login" hide-header hide-footer align="center">
        <div class="w-100 p-4 justify-content-center" align="left">
            <h5 class="card-title text-center">Login</h5>
            <hr/>
        
            <b-alert v-model="isErrorVisible" variant="danger" dismissible style="font-size:14px;">
                {{errorMessage}}
            </b-alert>
            <form v-on:keyup.enter="onEnter()" class="form" role="form" autocomplete="off" id="formLogin" novalidate>
                <div class="form-group">
                    <label style="font-size:14px" for="uname1">Username</label>
                    <input v-model="user.username" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" name="uname1" id="uname1" required="">
                <div class="invalid-feedback">Oops, you missed this one.</div>
                </div>
                <div class="form-group">
                    <label style="font-size:14px" >Password</label>
                    <input v-model="user.password" style="font-size:14px" type="password" class="form-control form-control-md rounded-0" id="pwd1" required="" autocomplete="new-password">
                    <div class="invalid-feedback">Enter your password too!</div>
                </div>      
                <button type="button" @click="login" class="btn btn-primary float-right" style="font-size:14px;width:80px;" id="btnLogin">Login</button>        
            </form>   
            <br/>
            
        </div>      
    </b-modal>
  </div>
</template>
<script>
import api from '../api.js';

export default {
    name: 'LoginModal',
    components: {

    },
    data(){
        return{
            user: {
                username: "",
                password: ""
            },
            errorMessage: "",
            isErrorVisible: false
        }
    },
    methods: {
        async login () {
            if(this.user.username.length < 6){
                this.errorMessage = "Missing username!";
                this.isErrorVisible = true;
                return; 
            }else if(this.user.password.length < 8){
                this.errorMessage = "Missing password!";
                this.isErrorVisible = true;
                return; 
            }
            
            try{
                let response = await api.login(this.user);
                if(response.status == 200){
                    window.EventBus.$emit('loggedIn', 'true');
                    this.$root.$emit('bv::hide::modal', 'login-modal');
                    this.$router.push("/user/" + response.data.username);
                }else{
                    this.errorMessage = "Authentication failed!";
                    this.isErrorVisible = true;
                }
            }
            catch(error){
                if(error.response){
                    this.errorMessage = "";
                    error.response.data.messages.forEach(message => {
                        this.errorMessage += message + "\n";
                    });
                }
                else{
                    this.errorMessage = "Connection refused!";
                }
                this.isErrorVisible = true;
            }
            
        },
        modalClosing(){
            this.errorMessage = "";
            this.user = {
                username: "",
                password: ""
            };
            this.isErrorVisible = false;
        },
        onEnter(){
            this.login();
        }
    }
}
</script>
<style>

</style>