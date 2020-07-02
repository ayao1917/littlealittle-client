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
        v-for="cartProduct in cartProducts"
        :key="cartProduct.salePage.id"
        :cartProduct="cartProduct"
        @onUpdateCartProducts="onUpdateCartProducts"
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
  name: "Cart",
  components: {
    CartPlanEditFrom,
    CartProgress,
  },
  data() {
    return {
      cartProducts: (null as unknown) as { [key: string]: CartProduct },
      currentProgress: 1,
    };
  },
  computed: {
    $cartList(): CartProduct[] {
      return this.cartProducts
        ? Object.keys(this.cartProducts).map((key) => this.cartProducts[key])
        : [];
    },
    $cartProducts(): { [key: string]: CartProduct } {
      return this.$store.getters["cart/cartProducts"];
    },
  },
  watch: {
    $cartProducts(newProduct, _) {
      if (newProduct) {
        this.cartProducts = newProduct;
      }
    },
  },
  mounted(): void {
    this.cartProducts = {
      ...this.$cartProducts,
    };
  },
  methods: {
    onUpdateCartProducts(cartProduct: CartProduct): void {
      this.cartProducts[cartProduct.salePage.id] = cartProduct;
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
