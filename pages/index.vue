<template>
  <div class="container">
    <Header />
    <MobileView>
      <CategoryMobile />
    </MobileView>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MobileView from "~/cds/MobileView.vue";
import CategoryMobile from "~/components/CategoryMobile.vue";
import Header from "~/components/Header.vue";

export default Vue.extend({
  components: {
    CategoryMobile,
    Header,
    MobileView,
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
