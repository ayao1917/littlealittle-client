<template>
  <div class="addPurchasesCardContainer">
    <img :src="addPurchase.picUrl" class="productImage" @click="onOpenDetail" />
    <p class="productTitle">{{ addPurchase.title }}</p>
    <button class="addToCartButton" @click="addToCart">
      {{ `$${addPurchase.price} 加購` }}
    </button>
    <div v-if="showDetail" class="salePicModal">
      <img
        class="salePicModalClose"
        src="~assets/images/close-circle.svg"
        @click="onCloseDetail"
      />
      <div class="salePicContent">
        <img class="salePicImage" :src="addPurchase.salePicUrl" />
      </div>
    </div>
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
  data() {
    return {
      showDetail: false,
    };
  },
  methods: {
    addToCart(event: MouseEvent): void {
      const { picUrl } = this.addPurchase;
      const { clientX, clientY } = event;
      addToCartAnimate(picUrl, { x: clientX, y: clientY }, () => {
        this.$store.commit("cart/pushAddPurchase", this.addPurchase);
      });
    },
    onCloseDetail(): void {
      this.showDetail = false;
    },
    onOpenDetail(): void {
      this.showDetail = true;
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

.salePicModal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.salePicModalClose {
  cursor: pointer;
  width: 48px;
  height: 48px;
  margin: 8px 8px;
}

.salePicContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
}

.salePicImage {
  width: 90%;
  height: auto;
}
</style>
