<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}
</style>
