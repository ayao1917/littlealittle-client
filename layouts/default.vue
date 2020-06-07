<template>
  <div>
    <Header />
    <nuxt />
    <Footer class="footer" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";

export default Vue.extend({
  components: {
    Footer,
    Header,
  },
});
</script>

<style lang="scss">
@import "../assets/css/reset.scss";
@media (max-width: 767px) {
  .footer {
    display: none;
  }
}
</style>
