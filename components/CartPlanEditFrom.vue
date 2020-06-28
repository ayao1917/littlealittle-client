<template>
  <div>
    <div class="cartPlanDetailDesktop">
      <div class="cartDetailHeader">
        <img
          class="closeIcon"
          src="~assets/images/close.svg"
          @click="onDeleteProduct"
        />
      </div>
      <div class="cartDetailBody">
        <img :src="cartProduct.salePage.picUrl" class="productImage" />
        <div class="planQuantityContainer">
          <span>{{ cartProduct.salePage.name }}</span>
          <span>{{ `${quantity} 組` }}</span>
        </div>
        <div class="planTotalFee">
          {{ `${cartProduct.salePage.currency.isoCode} ${fee}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { CartProduct } from "~/types/cart";

export default Vue.extend({
  name: "CartPlanEditFrom",
  props: {
    cartProduct: {
      required: true,
      type: Object as PropType<CartProduct>,
    },
  },
  data() {
    return {
      fee: 0,
      quantity: 0,
    };
  },
  mounted(): void {},
  methods: {
    onDeleteProduct(): void {},
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .cartPlanDetailDesktop {
    padding: 24px 0 12px;

    .cartDetailHeader {
      display: flex;
      justify-content: flex-end;

      .closeIcon {
        width: 18px;
        height: 17px;
      }
    }

    .cartDetailBody {
      display: flex;
      justify-content: space-between;

      .productImage {
        width: 200px;
      }

      .planQuantityContainer {
        display: flex;
        justify-content: space-between;
      }

      .planTotalFee {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}

@media (max-width: 767px) {
  .cartPlanDetailDesktop {
    display: none;
  }
}
</style>
