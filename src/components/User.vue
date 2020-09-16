<template>
  <div class="container-fluid" style="padding:0px;">
    <div class="card">
      <img class="card-img-top" src="../assets/profile_top_background.jpg" height=200 alt="Card image"/>
      <div class="container card-img-overlay">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-2">
              <img class="rounded-circle" height=120 width=120 src="https://71e56df8-a-62cb3a1a-s-sites.googlegroups.com/site/ehsaircraftdatabase/military-planes/f-16-fighting-falcon/F16.jpg?attachauth=ANoY7cqVLvbjgfLkt2Q0_GfWxbJETp9ecg_BExmOUOPlNG4g6F4I1g6LvKsTv0iLrDQJEjaS8gKcmdmVu1826oR46oWySpIYNSnY_SYCDVQFEAPvzYplrjtaG1k1YMXonRh-BLiXj9fe_3tSxMhka8W_DHteyN0eWAdCohvg0ryYvFirFg7QdZdFXvrNNP6JLr0gd7heMEfdZwLZrfgSKx3PC9PmUeiVW0TFaPk8dxjxXuPCkFHpACK5-Ch7s4PAb4aGirPNlVLsBcY9dN6dzrjmVCef7difmQ%3D%3D&attredirects=0" >
            </div>
            <div class="col-md-10">
              <h4>{{ displayName }}</h4>
            </div>
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
      displayName: ""
    }
  },
  mounted() {
    this.user = this.$route.params.user;
    this.displayName = this.user.firstName.toUpperCase() + " " + this.user.lastName.toUpperCase(); 
  },
  methods: {

  }
}
</script>

<style>
.test {
 
  
}
</style>
