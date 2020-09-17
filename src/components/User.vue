<template>
  <div class="container-fluid" style="padding:0px;">
    <div class="card">
      <img class="card-img-top" src="../assets/profile_top_background.jpg" height=200 alt="Card image"/>
      <div class="container card-img-overlay">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-2" style="padding:0px;maxWidth:140px;">
              <img class="rounded-circle" height=120 width=120 src="https://71e56df8-a-62cb3a1a-s-sites.googlegroups.com/site/ehsaircraftdatabase/military-planes/f-16-fighting-falcon/F16.jpg?attachauth=ANoY7cqVLvbjgfLkt2Q0_GfWxbJETp9ecg_BExmOUOPlNG4g6F4I1g6LvKsTv0iLrDQJEjaS8gKcmdmVu1826oR46oWySpIYNSnY_SYCDVQFEAPvzYplrjtaG1k1YMXonRh-BLiXj9fe_3tSxMhka8W_DHteyN0eWAdCohvg0ryYvFirFg7QdZdFXvrNNP6JLr0gd7heMEfdZwLZrfgSKx3PC9PmUeiVW0TFaPk8dxjxXuPCkFHpACK5-Ch7s4PAb4aGirPNlVLsBcY9dN6dzrjmVCef7difmQ%3D%3D&attredirects=0" >
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
              <div class="card-header">Personal Information</div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-secondary small">Name</label>
                    <h6>{{ user.firstName + " " + user.lastName }}</h6>
                  </div>
                  <div class="col-md-6">
                    <label class="text-secondary small">Birthdate</label>
                    <h6>{{ formattedBirthdate.toLocaleDateString() }}</h6>
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
              <div class="card-header">Account Information</div>
              <div class="card-body">
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
              <div class="card-header">Social Media Accounts</div>
              <div class="card-body">
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
                <li v-if="linkedinAccount !== '-'"><a class="myList" :href="linkedinAccount"><font-awesome-icon :icon="['fab', 'linkedin']" size="2x" /></a></li>
                <li v-if="instagramAccount !== '-'"><a class="myList" :href="instagramAccount"><font-awesome-icon :icon="['fab', 'instagram']" size="2x" /></a></li>
                <li v-if="twitterAccount !== '-'"><a class="myList" :href="twitterAccount"><font-awesome-icon :icon="['fab', 'twitter']" size="2x" /></a></li>
                <li v-if="facebookAccount !== '-'"><a class="myList" :href="facebookAccount"><font-awesome-icon :icon="['fab', 'facebook']" size="2x" /></a></li>
                <li v-if="githubAccount !== '-'"><a class="myList" :href="githubAccount"><font-awesome-icon :icon="['fab', 'github']" size="2x" /></a></li>
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
    this.formattedBirthdate = new Date(this.user.birthdate);
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
  },
  methods: {

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
</style>
