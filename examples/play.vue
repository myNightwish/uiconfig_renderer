<template>
    <div id="palyapp">
        <div id="nav">
          <router-link to="/">Home</router-link>   |
          <router-link to="/think">Rethink</router-link>   |
          <router-link to="/read">Reading</router-link>
      </div>
      <router-view />
    </div>
</template>

<script>
export default {
  name: 'Play'
};
</script>

<style>
#palyapp {
  font-family: Avenir;
  color: #2c3e50;
  height: 100vh;
  overflow: auto;
}
</style>
