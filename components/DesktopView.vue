<template>
  <div class="desktopContainer">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DesktopView",
});
</script>

<style scoped lang="scss">
@media (max-width: 767px) {
  .desktopContainer {
    display: none;
  }
}
</style>
