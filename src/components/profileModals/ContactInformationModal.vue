<template>
    <div>
    <b-modal @show="modalLoad()" @hidden="modalClosing()" id="contact-information-modal" size="md" title="Contact Information" hide-header hide-footer align="center">
        <div class="w-100 p-4 justify-content-center" align="left">
            <h5 class="card-title text-center">Contact Information</h5>
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
                            <label style="font-size:14px">Country</label>
                            <input v-model="updatedUser.contact.address.country" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" required="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size:14px">City</label>
                            <input v-model="updatedUser.contact.address.city" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" required="">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size:14px">District</label>
                            <input v-model="updatedUser.contact.address.district" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" required="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size:14px">Post Code</label>
                            <input v-model="updatedUser.contact.address.postCode" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" required="">                           
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label style="font-size:14px">Address</label>
                            <textarea rows=3 v-model="updatedUser.contact.address.address" style="font-size:14px" type="textarea" class="form-control form-control-md rounded-0" required=""/>    
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size:14px">Phone</label>
                            <input v-model="updatedUser.contact.phone" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" required="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size:14px">Fax</label>
                            <input v-model="updatedUser.contact.fax" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" required="">                           
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label style="font-size:14px">Website</label>
                            <input v-model="updatedUser.contact.website" style="font-size:14px" type="text" class="form-control form-control-md rounded-0" required="">
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
    name: 'ContactInformationModal',
    components: {

    },
    props: {
        user: Object
    },
    data () {
        return {
            updatedUser: {
                contact: {
                    address: {

                    }
                }
            },
            isErrorVisible: false,
            isSuccessful: false,
            errorMessage: "", 
            successMessage: ""
        }
    },
    mounted () {
        this.updatedUser = JSON.parse(JSON.stringify(this.user));
    },
    methods: {
        modalClosing(){
            this.updatedUser = { contact: {address: {}}};
            this.errorMessage = "";
            this.successMessage = "";
            this.isSuccessful = false;
            this.isErrorVisible = false;
        },
        modalLoad(){          
            if(this.user.username !== window.loggedUser.username){
                this.$router.push('/auth/logout');
            }
            this.updatedUser = JSON.parse(JSON.stringify(this.user));
        }, 
        async update() {
            try{
                let requestBody = {
                    fax: this.updatedUser.contact.fax,
                    phone: this.updatedUser.contact.phone,
                    website: this.updatedUser.contact.website,
                    address: {
                        country: this.updatedUser.contact.address.country,
                        city: this.updatedUser.contact.address.city,
                        district: this.updatedUser.contact.address.district,
                        address: this.updatedUser.contact.address.address,
                        postCode: this.updatedUser.contact.address.postCode
                    }
                };
                let response = await api.updateContactInformation(window.loggedUser.username, requestBody);
                if(response.status == 200){
                    this.user.contact = this.updatedUser.contact;
    
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
            this.$root.$emit('bv::hide::modal', 'contact-information-modal');
        }
    }
}
</script>

<style>

</style>