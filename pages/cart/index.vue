<template>
  <div>
    <div class="cartHeader">
      <CartProgress class="cartProgress" :currentProgress="currentProgress" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CartProgress from "~/components/CartProgress.vue";

export default Vue.extend({
  components: {
    CartProgress,
  },
  data() {
    return {
      currentProgress: 1,
    };
  },
});
</script>

<style scoped lang="scss">
.cartHeader {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e6e6e6;
  width: 100%;
}

@media (min-width: 768px) {
  .cartHeader {
    height: 100px;

    .cartProgress {
      width: 768px;
    }
  }
}

@media (max-width: 767px) {
  .cartHeader {
    padding: 12px 24px;

    .cartProgress {
      width: 100%;
    }
  }
}
</style>
