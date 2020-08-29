<template>
  <div class="addPurchasesCardContainer">
    <img :src="addPurchase.picUrl" class="productImage" />
    <p class="productTitle">{{ addPurchase.title }}</p>
    <button class="addToCartButton" @click="addToCart">
      {{ `$${addPurchase.price} 加購` }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { AddPurchase } from "~/types/salePage";
import { addToCartAnimate } from "~/utils/cart";

export default Vue.extend({
  name: "AddPurchasesCard",
  props: {
    addPurchase: {
      required: true,
      type: Object as PropType<AddPurchase>,
    },
  },
  methods: {
    addToCart(event: MouseEvent): void {
      const { picUrl } = this.addPurchase;
      const { clientX, clientY } = event;
      addToCartAnimate(picUrl, { x: clientX, y: clientY }, () => {
        this.$store.commit("cart/pushAddPurchase", this.addPurchase);
      });
    },
  },
});
</script>

<style scoped lang="scss">
.productImage {
  width: 100%;
  cursor: pointer;
}

.productTitle {
  margin: 12px 4px;
  font-size: 23px;
  font-weight: 500;
}

.addToCartButton {
  background-color: #b5d5d9;
  border-style: none;
  cursor: pointer;
  color: #333333;
  width: 100%;
  height: 60px;
  font-size: 23px;
  font-weight: 500;
}
</style>
