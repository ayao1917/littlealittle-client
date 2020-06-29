<template>
  <div>
    <div class="cartHeader">
      <CartProgress
        class="cartProgress"
        :currentProgress="currentProgress"
      ></CartProgress>
    </div>
    <div class="cartBody">
      <CartPlanEditFrom
        v-for="cartProduct in $cartProducts"
        :key="cartProduct.salePage.id"
        :cartProduct="cartProduct"
      ></CartPlanEditFrom>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CartPlanEditFrom from "~/components/CartPlanEditFrom.vue";
import CartProgress from "~/components/CartProgress.vue";
import { CartProduct } from "~/types/cart";

export default Vue.extend({
  components: {
    CartPlanEditFrom,
    CartProgress,
  },
  data() {
    return {
      currentProgress: 1,
    };
  },
  computed: {
    $cartProducts(): CartProduct[] {
      const cartProductObject = this.$store.getters["cart/cartProducts"];
      return cartProductObject
        ? Object.keys(cartProductObject).map((key) => cartProductObject[key])
        : [];
    },
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .cartHeader {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    height: 100px;

    .cartProgress {
      width: 768px;
    }
  }

  .cartBody {
    width: 768px;
    margin: 0 auto;
  }
}

@media (max-width: 767px) {
  .cartHeader {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
    padding: 12px 24px;

    .cartProgress {
      width: 100%;
    }
  }

  .cartBody {
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
  }
}
</style>
