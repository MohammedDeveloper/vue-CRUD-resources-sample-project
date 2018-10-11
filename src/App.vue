<template>
  <div id="app">
    <div class="container mt-5">
      <h1 class="display-4 text-center m-0">Just like that...</h1>
      <br />
      <nav class="text-center">
        <router-link to="/">Users</router-link>
        <router-link to="/Aboutus">About Us</router-link>
      </nav>      
      <br />
      <router-view :key="$route.fullPath"></router-view>  
    </div>     
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";

body {
  font-family: "Montserrat", sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
}
body,
html {
  margin: 0;
  height: 100%;
}
#app {
  margin: 0 auto;
}

nav {
  padding: 10px 0;
}

nav a {
  padding: 10px;
  background: #fff;
  border-radius: 3px;

  font-weight: bold;
  margin-right: 10px;
  border-bottom: 5px solid rgb(0, 110, 255);
  text-decoration: none;
}

a {
  cursor: pointer;
  color: rgb(0, 110, 255) !important;
}

a:hover,
a:focus {
  text-decoration: none;
  color: #004085;
  border-bottom: 1px solid #004085;
}

nav a:hover,
nav a:focus {
  border-bottom: 5px solid #004085;
}

input[type="text"],
input[type="email"],
textarea {
  border-left: 3px solid rgb(0, 110, 255) !important;
}
</style>
