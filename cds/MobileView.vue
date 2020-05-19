<template>
  <div>
    <div class="mobileContainer">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MobileView",
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .mobileContainer {
    display: none;
  }
}
</style>
