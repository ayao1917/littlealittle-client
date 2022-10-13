<template>
  <div>
    <Header class="header"></Header>
    <nuxt class="content" />
    <Footer class="footer"></Footer>
    <Alert />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Alert from "~/components/Alert.vue";
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";

export default Vue.extend({
  components: {
    Alert,
    Footer,
    Header,
  },
});
</script>

<style lang="scss">
@import "../assets/css/reset.scss";

body {
  font-family: PingFangTC-Regular;
}

.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.content:before {
  content: "";
  display: block;
  height: 60px;
}

@media (max-width: 767px) {
  .footer {
    display: none;
  }
}
</style>
