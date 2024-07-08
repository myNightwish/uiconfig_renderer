<template>
    <div id="palyapp">
        <div id="nav"></div>
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
  color: #2c3e50;
  height: 100vh;
  overflow: auto;
}
</style>
