<template>
  <div class="container-fluid" style="padding:0px;">
    <div class="card">
      <img class="card-img-top" src="../assets/profile_top_background.jpg" height=200 alt="Card image"/>
      <div class="container card-img-overlay">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-2" style="padding:0px;maxWidth:140px;">
              <img class="rounded-circle" height=120 width=120 src="../assets/profile.png">
            </div>
            <div class="col-md-10">
              <h4 style="font-size: 26px;">{{ displayName }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="container">
            <div class="card" style="margin-top:20px">
              <div class="card-header sans-semi">Personal Information</div>
              <div class="card-body translate-color">
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">Name</label>
                    <h6>{{ user.firstName + " " + user.lastName }}</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="text-secondary small">Birthdate</label>
                    <h6>{{ formattedBirthdate }}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">Nationality</label>
                    <h6>{{ user.nationality }}</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="text-secondary small">Gender</label>
                    <h6>{{ user.gender }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="card" style="margin-top:20px">
              <div class="card-header sans-semi">Account Information</div>
              <div class="card-body translate-color">
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">Username</label>
                    <h6>{{ user.username }}</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="text-secondary small">Email</label>
                    <h6>{{ user.email }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="card" style="margin-top:20px">
              <div class="card-header sans-semi">Contact Information</div>
              <div class="card-body translate-color">
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">Country</label>
                    <h6>{{ user.contact.address.country }}</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="text-secondary small">City</label>
                    <h6>{{ user.contact.address.city }}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">District</label>
                    <h6>{{ user.contact.address.district }}</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="text-secondary small">Address</label>
                    <h6>{{ user.contact.address.address }}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">Post Code</label>
                    <h6>{{ user.contact.address.postCode }}</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="text-secondary small">Phone</label>
                    <h6>{{ user.contact.phone }}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">Fax</label>
                    <h6>{{ user.contact.fax }}</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="text-secondary small">Website</label>
                    <h6>{{ user.contact.website }}</h6>
                  </div>
                </div>
              </div>
            </div> 
            <div class="card" style="margin-top:20px">
              <div class="card-header sans-semi">Job Histories</div>
              <div v-for="(jobHistory, index) in user.jobHistories" :key="index">
                <div class="card-body translate-color">
                  <div class="row">
                   <div class="col-md-6">
                      <label class="text-secondary small">Company Name</label>
                      <h6>{{ jobHistory.companyName }}</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="text-secondary small">Position</label>
                      <h6>{{ jobHistory.position }}</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label class="text-secondary small">Start Date</label>
                      <h6>{{ formatDate(jobHistory.startDate) }}</h6>
                    </div>
                    <div v-if="!jobHistory.isWorking" class="col-md-6">
                      <label class="text-secondary small">End Date</label>
                      <h6>{{ formatDate(jobHistory.endDate) }}</h6>
                    </div>
                    <div v-if="jobHistory.isWorking" class="col-md-6">
                      <label class="text-secondary small">Status</label>
                      <h6>Working</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label class="text-secondary small">Explanation</label>
                      <h6>{{ jobHistory.explanation }}</h6>
                    </div>
                  </div>
                </div>
                <hr v-if="index != user.jobHistories.length - 1" style="margin:0px;"/>
              </div>
            </div>
            <div class="card" style="margin-top:20px">
              <div class="card-header sans-semi">Education Histories</div>
              <div v-for="(educationHistory, index) in user.educationHistories" :key="index">
                <div v-if="educationHistory.type === 'Undergraduate' || educationHistory.type === 'Graduate' || educationHistory.type === 'Postgraduate'" class="card-body translate-color">
                  <div class="row">
                   <div class="col-md-6">
                      <label class="text-secondary small">University</label>
                      <h6>{{ educationHistory.schoolName }}</h6>
                    </div>
                    <div v-if="educationHistory.classNumber" class="col-md-6">
                      <label class="text-secondary small">Grade</label>
                      <h6>{{ educationHistory.classNumber }}</h6>
                    </div>
                    <div v-else class="col-md-6">
                      <label class="text-secondary small">GPA</label>
                      <h6>{{ educationHistory.gpa + " / " + (educationHistory.gradingSystem === 'FOUR' ? 4 : 100) }}</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label class="text-secondary small">Department</label>
                      <h6>{{ educationHistory.departmentName }}</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="text-secondary small">Faculty</label>
                      <h6>{{ educationHistory.facultyName }}</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label class="text-secondary small">Start Date</label>
                      <h6>{{ formatDate(educationHistory.startDate) }}</h6>
                    </div>
                    <div v-if="educationHistory.educationStatus === 'Student'" class="col-md-6">
                      <label class="text-secondary small">Education Status</label>
                      <h6>{{ educationHistory.educationStatus }}</h6>
                    </div>
                    <div v-else-if="educationHistory.educationStatus === 'Graduated'" class="col-md-6">
                      <label class="text-secondary small">End Date</label>
                      <h6>{{ formatDate(educationHistory.endDate) }}</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div v-if="educationHistory.classNumber"  class="col-md-6">
                      <label class="text-secondary small">GPA</label>
                      <h6>{{ educationHistory.gpa + " / " + (educationHistory.gradingSystem === 'FOUR' ? 4 : 100) }}</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="text-secondary small">Type</label>
                      <h6>{{ educationHistory.type }}</h6>
                    </div>
                  </div>
                </div>
                <div v-else class="card-body translate-color">
                  <div class="row">
                   <div class="col-md-6">
                      <label class="text-secondary small">School</label>
                      <h6>{{ educationHistory.schoolName }}</h6>
                    </div>
                    <div v-if="educationHistory.classNumber" class="col-md-6">
                      <label class="text-secondary small">Grade</label>
                      <h6>{{ educationHistory.classNumber }}</h6>
                    </div>
                    <div v-else class="col-md-6">
                      <label class="text-secondary small">GPA</label>
                      <h6>{{ educationHistory.gpa + " / " + (educationHistory.gradingSystem === 'FOUR' ? 4 : 100) }}</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label class="text-secondary small">Start Date</label>
                      <h6>{{ formatDate(educationHistory.startDate) }}</h6>
                    </div>
                    <div v-if="educationHistory.educationStatus === 'Student'" class="col-md-6">
                      <label class="text-secondary small">Education Status</label>
                      <h6>{{ educationHistory.educationStatus }}</h6>
                    </div>
                    <div v-else-if="educationHistory.educationStatus === 'Graduated'" class="col-md-6">
                      <label class="text-secondary small">End Date</label>
                      <h6>{{ formatDate(educationHistory.endDate) }}</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div v-if="educationHistory.classNumber" class="col-md-6">
                      <label class="text-secondary small">GPA</label>
                      <h6>{{ educationHistory.gpa + " / " + (educationHistory.gradingSystem === 'FOUR' ? 4 : 100) }}</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="text-secondary small">Type</label>
                      <h6>{{ educationHistory.type }}</h6>
                    </div>
                  </div>
                </div>
                <hr v-if="index != user.educationHistories.length - 1" style="margin:0px;"/>
              </div>
            </div>
            <div class="card" style="margin-top:20px">
              <div class="card-header sans-semi">Foreign Languages</div>
              <div v-for="(language, index) in user.foreignLanguages" :key="index">
                <div class="card-body translate-color">
                  <div class="row">
                   <div class="col-md-6">
                      <label class="text-secondary small">Language Name</label>
                      <h6>{{ language.languageName }}</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label class="text-secondary small">Reading Level</label>
                      <h6>{{ language.readingLevel }}</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="text-secondary small">Writing Level</label>
                      <h6>{{ language.writingLevel }}</h6>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label class="text-secondary small">Speaking Level</label>
                      <h6>{{ language.speakingLevel }}</h6>
                    </div>
                    <div class="col-md-6">
                      <label class="text-secondary small">Listening Level</label>
                      <h6>{{ language.listeningLevel }}</h6>
                    </div>
                  </div>
                </div>
                <hr v-if="index != user.foreignLanguages.length - 1" style="margin:0px;"/>
              </div>
            </div>
            <div class="card" style="margin-top:20px">
              <div class="card-header sans-semi">Social Media Accounts</div>
              <div class="card-body translate-color">
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">Facebook</label>
                    <h6>{{ facebookAccount }}</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="text-secondary small">Instagram</label>
                    <h6>{{ instagramAccount }}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">Twitter</label>
                    <h6>{{ twitterAccount }}</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="text-secondary small">Linkedin</label>
                    <h6>{{ linkedinAccount }}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">Github</label>
                    <h6>{{ githubAccount }}</h6>
                  </div>
                </div>
              </div>
            </div>           
          </div>
        </div>
        <div class="col-md-4" style="margin-top:20px;">
          <div class="sticky-top" style="top: 80px !important;">
              <h5>Social Media Accounts</h5>
              <ul class="myUl">  
                <li v-if="linkedinAccount !== '-'"><a class="myList" target="_blank" :href="linkedinAccount"><font-awesome-icon :icon="['fab', 'linkedin']" size="2x" /></a></li>
                <li v-if="instagramAccount !== '-'"><a class="myList" target="_blank" :href="instagramAccount"><font-awesome-icon :icon="['fab', 'instagram']" size="2x" /></a></li>
                <li v-if="twitterAccount !== '-'"><a class="myList" target="_blank" :href="twitterAccount"><font-awesome-icon :icon="['fab', 'twitter']" size="2x" /></a></li>
                <li v-if="facebookAccount !== '-'"><a class="myList" target="_blank" :href="facebookAccount"><font-awesome-icon :icon="['fab', 'facebook']" size="2x" /></a></li>
                <li v-if="githubAccount !== '-'"><a class="myList" target="_blank" :href="githubAccount"><font-awesome-icon :icon="['fab', 'github']" size="2x" /></a></li>
              </ul>
          </div>
        </div>
      </div>       
    </div>
  </div>
</template>

<script>

export default {
  name: 'User',
  data() {
    return {
      user: {
        contact:{
          address:{
            
          }
        }
      },
      displayName: "",
      formattedBirthdate: new Date(),
      twitterAccount: "-",
      githubAccount: "-",
      instagramAccount: "-",
      facebookAccount: "-",
      linkedinAccount: "-"
    }
  },
  mounted() {
    this.user = this.$route.params.user;
    this.displayName = this.user.firstName.toUpperCase() + " " + this.user.lastName.toUpperCase(); 
    console.log(this.user);
    this.formattedBirthdate = this.formatDate(this.user.birthdate);
    this.user.socials.forEach(social => {
      if(social.type === "LINKEDIN"){
        this.linkedinAccount = social.address;
      }
      else if(social.type === "GITHUB"){
        this.githubAccount = social.address;
      }
      else if(social.type === "FACEBOOK"){
        this.facebookAccount = social.address;
      }
      else if(social.type === "INSTAGRAM"){
        this.instagramAccount = social.address;
      }
      else if(social.type === "TWITTER"){
        this.twitterAccount = social.address;
      } 
    });

    this.user.educationHistories.sort((x, y) => {
      let dateX = new Date(x.startDate);
      let dateY = new Date(y.startDate);
      if(dateX > dateY)
        return -1;
      else if(dateY > dateX)
        return 1;
      return 0;
    });

    this.user.jobHistories.sort((x, y) => {
      let dateX = new Date(x.startDate);
      let dateY = new Date(y.startDate);
      if(dateX > dateY)
        return -1;
      else if(dateY > dateX)
        return 1;
      return 0;
    });
  },
  methods: {
    formatDate(date){
      return new Date(date).toLocaleDateString();
    }
  }
}
</script>

<style>
.myUl {
    margin: 0;
    padding: 0;
    list-style: none;
    cursor: default;
    margin: 0 0 -5px -8px; 
    
}
.myList {
  float: left;
  margin: 10px;
  color:gray !important;
}

.myList:hover {
  color: black !important;
}

@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,600,700);
.card-body h6{
  font-family: 'Open Sans';
  font-weight: 600 !important;
  font-size: 15px;
}

.translate-color:hover {
  background-color: #FCFCFC;
}

.card-header {

  background-color: white;
  color: #0773B5;

}


</style>
