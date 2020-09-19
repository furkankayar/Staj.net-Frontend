<template>
    <div>
    <b-modal @show="modalLoad()" @hidden="modalClosing()" id="personal-information-modal" size="md" title="Personal Information" hide-header hide-footer align="center">
        <div class="w-100 p-4 justify-content-center" align="left">
            <h5 class="card-title text-center">Personal Information</h5>
            <hr/>
            <b-alert v-model="isErrorVisible" variant="danger" dismissible style="font-size:14px;white-space: pre-line;">
                {{errorMessage}}
            </b-alert>
            <b-alert v-model="isSuccessful" variant="success" dismissible style="font-size:14px;">
                {{successMessage}}
            </b-alert>
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size:14px">First Name</label>
                            <input v-model="updatedUser.firstName" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" required="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size:14px">Last Name</label>
                            <input v-model="updatedUser.lastName" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" required="">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size:14px">Birthdate</label>
                            <input v-model="birthdate" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" required="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size:14px">Nationality</label>
                            <select v-model="updatedUser.nationality" style="font-size:14px" class="form-control form-control-md rounded-0" id="genders">
                                <option value="TR">Turkish</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size:14px">Gender</label>
                            <select v-model="updatedUser.gender" style="font-size:14px" class="form-control form-control-md rounded-0" id="genders">
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="UNSPECIFIED">Unspecified</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mt-3">
                        <div class="form-group">
                            <button type="button" @click="update()" class="btn btn-primary float-right btn-block" style="font-size:14px">Save</button>
                        </div>
                    </div>
                    <div class="col-md-6 mt-3">
                        <div class="form-group">
                            <button type="button" @click="close()" class="btn btn-danger float-right btn-block" style="font-size:14px">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        </div>      
    </b-modal>
  </div>
</template>

<script>
import api from '../../api.js';

export default {
    name: 'PersonalInformationModal',
    components: {

    },
    props: {
        user: Object
    },
    data () {
        return {
            updatedUser: {

            },
            birthdate: "",
            isErrorVisible: false,
            isSuccessful: false,
            errorMessage: "", 
            successMessage: ""
        }
    },
    mounted () {
        this.updatedUser = JSON.parse(JSON.stringify(this.user));
        this.birthdate = this.formatDate(this.updatedUser.birthdate); 

    },
    methods: {
        modalClosing(){
            this.updatedUser = {};
            this.errorMessage = "";
            this.successMessage = "";
            this.isSuccessful = false;
            this.isErrorVisible = false;
        },
        formatDate(date){
            if(!date) return "";
            return date.split("T")[0];
        }, 
        modalLoad(){
            this.updatedUser = JSON.parse(JSON.stringify(this.user));
            this.birthdate = this.formatDate(this.updatedUser.birthdate); 
        }, 
        async update() {
            try{
                this.updatedUser.birthdate = this.birthdate + "T00:00:00";
                let requestBody = {
                    firstName: this.updatedUser.firstName,
                    lastName: this.updatedUser.lastName,
                    birthdate: this.updatedUser.birthdate,
                    gender: this.updatedUser.gender,
                    nationality: this.updatedUser.nationality
                };
                let response = await api.updateUserData(window.loggedUser.username, requestBody);
                if(response.status == 200){
                    this.user.firstName = this.updatedUser.firstName;
                    this.user.lastName = this.updatedUser.lastName;
                    this.user.birthdate = this.updatedUser.birthdate;
                    this.user.gender = this.updatedUser.gender;
                    this.user.nationality = this.updatedUser.nationality;

                    window.EventBus.$emit('personalInformationUpdated');

                    this.isErrorVisible = false;
                    this.errorMessage = "";
                    this.successMessage = "Updated successfully!";
                    this.isSuccessful = true;
                }
                else{
                    this.isErrorVisible = true;
                    this.errorMessage = "An error occurred!";
                    this.successMessage = "";
                    this.isSuccessful = false;
                }
                
            }
            catch(error){
                this.isErrorVisible = true;
                this.errorMessage = "An error occurred!";
                this.successMessage = "";
                this.isSuccessful = false;
            }
        },
        close() {
            this.$root.$emit('bv::hide::modal', 'personal-information-modal');
        }
    }
}
</script>

<style>

</style>