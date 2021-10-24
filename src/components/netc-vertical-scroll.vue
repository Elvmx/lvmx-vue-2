<template>
  <v-touch class="netc-vertical-scroll">
    <slot />
  </v-touch>
</template>

<script>
export default {
  name: "netc-vertical-scroll",
};
</script>

<style lang="scss" scoped>
.netc-vertical-scroll {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
