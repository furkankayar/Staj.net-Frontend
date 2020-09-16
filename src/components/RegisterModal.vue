<template>
    <div>
    <b-modal @hidden="modalClosing()" id="register-modal" size="md" title="Register" hide-header hide-footer align="center">
        <div class="w-100 p-4 justify-content-center" align="left">
            <h5 class="card-title text-center">Register</h5>
            <hr/>
        
            <b-alert v-model="isErrorVisible" variant="danger" dismissible style="font-size:14px;white-space: pre-line;">
                {{errorMessage}}
            </b-alert>
            <b-alert v-model="isSuccessful" variant="success" dismissible style="font-size:14px;">
                {{successMessage}}
            </b-alert>
            <form class="form" role="form" autocomplete="off" id="formRegister">
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
                <div class="form-group">
                    <label style="font-size:14px">Email</label>
                    <input v-model="user.email" style="font-size:14px" type="email" class="form-control form-control-md rounded-0" id="email" required="">
                    <div class="invalid-feedback">Enter your password too!</div>
                </div>  
                <div class="form-group">
                    <label style="font-size:14px">First Name</label>
                    <input v-model="user.firstName" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" id="firstName" required="">
                    <div class="invalid-feedback">Enter your password too!</div>
                </div>  
                <div class="form-group">
                    <label style="font-size:14px">Last Name</label>
                    <input v-model="user.lastName" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" id="lastName" required="">
                    <div class="invalid-feedback">Enter your password too!</div>
                </div>                
            </form>   
            <br/>
            <button @click="register()" class="btn btn-primary float-right" style="font-size:14px;width:80px;" id="btnRegister">Register</button>  
        </div>      
    </b-modal>
  </div>
</template>

<script>
import api from '../api.js';

export default {
    name: 'RegisterModal',
    components:{

    },
    data(){
        return{
            user: {
                username: "",
                password: "", 
                firstName: "",
                lastName: "",
                email: ""
            },
            errorMessage: "",
            successMessage: "",
            isErrorVisible: false,
            isSuccessful: false
        }
    },
    methods: {
        modalClosing(){
            this.errorMessage = "";
            this.isErrorVisible = false;
            this.successMessage = "";
            this.isSuccessful = false;
            this.user = {
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                email: ""
            }
        },
        async register(){
            if(this.user.username === ""){
                this.errorMessage = "Username is mandotary!";
                this.isErrorVisible = true;
                return;
            }
            else if(this.user.username.length < 6){
                this.errorMessage = "Username must be at least 6 characters!";
                this.isErrorVisible = true;
                return;
            }
            else if(this.user.password === ""){
                this.errorMessage = "Password is mandotary!";
                this.isErrorVisible = true;
                return;
            }
            else if(this.user.password.length < 8){
                this.errorMessage = "Password must be at least 8 characters!";
                this.isErrorVisible = true;
                return;
            }
            else if(this.user.email === ""){
                this.errorMessage = "Email is mandotary!";
                this.isErrorVisible = true;
                return;
            }
            else if(this.user.firstName === ""){
                this.errorMessage = "First name is mandotary!";
                this.isErrorVisible = true;
                return;
            }
            else if(this.user.lastName === ""){
                this.errorMessage = "Last name is mandotary!";
                this.isErrorVisible = true;
                return;
            }

            try{
                let response = await api.register(this.user);
                if(response.status == 200){
                    this.isErrorVisible = false;
                    this.errorMessage = "";
                    this.successMessage = response.data.message;
                    this.isSuccessful = true;
                    this.user = {
                        username: "",
                        password: "",
                        firstName: "",
                        lastName: "",
                        email: ""
                    }
                }
                else{
                    this.isSuccessful = false;
                    this.successMessage = "";
                    this.errorMessage = "Registration failed!";
                    this.isErrorVisible = true;
                }
            }
            catch(error){
                this.isSuccessful = false;
                this.successMessage = "";
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
        }
    }
}
</script>

<style>

</style>