<template>
  <div class="container">
    <Header />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "~/components/Header.vue";

export default Vue.extend({
  components: {
    Header,
  },
});
</script>

<style scoped lang="scss">
/*.container {*/
/*  margin: 0 auto;*/
/*  min-height: 100vh;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  text-align: center;*/
/*}*/
</style>
