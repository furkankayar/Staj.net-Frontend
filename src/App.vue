<template>
  <div id="app">
    <Header/>
    <router-view class="view" />
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,600,700);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  display: flex;
  margin-top: 60px;
  margin-bottom:20px;
  flex-direction: column;
  height: 100%;
  
}

html {
  position: relative;
  min-height: 100%;
}

.view{
  margin-bottom: 40px;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px; /* Set the fixed height of the footer here */
}

.sans-semi {
  font-family: 'Open Sans';
  font-weight: 600;
}

.sans-bold {
  font-family: 'Open Sans';
  font-weight: 700;
}

</style>
