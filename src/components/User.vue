<template>
  <div class="hello">
    <h1>Welcome {{ username }}</h1>
    <br/><br/>
    <label v-if="!isVisible" id="baskaId">Your birthdate is: </label>
    <label id="birthdateLabel">{{ birth }}</label>
    <br/><br/>
    <div v-if="isVisible" style="font-size:30px;"> 
      <a :href="githubAddress">GitHub</a>
      <br/><br/>
      <a :href="linkedinAddress">Linkedin</a>
      <br/><br/>
      <a :href="twitterAddress">Twitter</a>
      <br/><br/>
      <button @click="birthdate" >Birthdate</button>
    </div>
  </div>
</template>

<script>
import api from '../api.js';

export default {
  name: 'User',
  data() {
    return {
      username: '',
      githubAddress: '',
      linkedinAddress: '',
      twitterAddress: '',
      birth: '',
      data: {},
      isVisible: true
    }
  },
  async mounted() {
    this.username = this.$route.params.username;
  
    try{
      let res = await api.getUser(this.username);

      this.data = res.data;

      res.data.socials.forEach((item, index) => {
        if(item.type === "GITHUB"){
          this.githubAddress = res.data.socials[index].address;
        }
        else if(item.type === "LINKEDIN"){
          this.linkedinAddress = res.data.socials[index].address;
        }
        else if(item.type === "TWITTER"){
          this.twitterAddress = res.data.socials[index].address;
        }
      });
    }
    catch(error){
      console.log(error.response.data.message);
      this.username = undefined;
    }
  },
  methods: {
    birthdate() {
      this.birth = this.data.birthdate;
      this.isVisible = false;
    }
  }
}
</script>

<style scoped>

#baskaId{
  color: yellow;
}

#birthdateLabel{
  color: darkblue;
}

</style>
