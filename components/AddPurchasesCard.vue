<template>
  <div class="addPurchasesCardContainer">
    <div class="productImageContainer" @click="showAddModal">
      <div class="productImageDetailContainer">
        <img
          class="productImageDetailIcon"
          src="~assets/images/check-detail.svg"
        />
      </div>
      <img :src="addPurchase.picUrl" class="productImage" />
    </div>
    <p class="productTitle">{{ addPurchase.title }}</p>
    <button class="addToCartButton addPurchaseButtonDekstop" @click="addToCart">
      {{ `$${addPurchase.price} 加購` }}
    </button>
    <button
      class="addToCartButton addPurchaseButtonMobile"
      @click="showAddModal"
    >
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
        this.$store.commit("cart/pushAddPurchase", {
          addPurchase: this.addPurchase,
          amount: 1,
        });
      });
    },
    onCloseDetail(): void {
      this.showDetail = false;
    },
    onOpenDetail(): void {
      this.showDetail = true;
    },
    showAddModal(): void {
      this.$store.commit("addPurchase/setItem", this.addPurchase);
      this.$store.commit("modal/openModal", "ADD_PURCHASE");
    },
  },
});
</script>

<style scoped lang="scss">
.productImageContainer {
  position: relative;
}

.productImageDetailContainer {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.productImageDetailIcon {
  width: 36px;
  height: 36px;
}

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
  font-size: 20px;
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
  justify-content: flex-end;
}

.salePicImage {
  width: 90%;
  height: auto;
}

@media (min-width: 768px) {
  .addPurchaseButtonDekstop {
    display: block;
  }

  .addPurchaseButtonMobile {
    display: none;
  }
}

@media (max-width: 767px) {
  .addPurchaseButtonDekstop {
    display: none;
  }

  .addPurchaseButtonMobile {
    display: block;
  }
}
</style>
