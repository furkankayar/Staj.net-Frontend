<template>
    <div class="container">
        <div class="h-100 row d-flex">
            <div class="col-md-4"/>
            <div class="col-md-4 text-center" style="margin-top:150px;margin-bottom:auto;">
                <div class="rounded-circle d-flex align-items-center justify-content-center col-center" style="margin:0 auto;background-color:#D5D5D5;width:120px;height:120px;">
                    <font-awesome-icon icon="sign-out-alt" size="4x" style="color:white"/>
                </div>
                <h1 style="margin-top:20px;">You Have Been Logged Out</h1>
                <h6 style="margin-top:20px;">You will be redirected to home page</h6>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api.js';

export default {
    name: 'Logout',
    components: {
        
    },
    data() {
        return {
            message: "Please wait" 
        }
    },
    async mounted(){
        try{
            let response = await api.logout();
            if(response.status === 200){
                window.EventBus.$emit('loggedOut');
                this.message = "You logged out successfully!";
                setTimeout(() => {
                    this.$router.push("/"); 
                }, 3000);
            }
        }
        catch(error){
            console.log(error.response);
        }
        
    },
    methods: {

    }
}
</script>

<style>

</style>