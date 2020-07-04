<template>
  <div>
    <div class="feeContainer">
      <div v-for="fee in $fees" :key="fee.salePage.id" class="cartFeeRow">
        <span class="feeText">{{ fee.salePage.name }}</span>
        <span class="feeText">
          {{ `${fee.salePage.currency.isoCode} ${fee.subtotal}` }}
        </span>
      </div>
      <div class="cartFeeRow">
        <span class="feeText">小計</span>
        <span class="feeText">{{ `${$currency} ${$subTotalFee}` }}</span>
      </div>
      <div class="cartFeeRow">
        <span class="feeText">運費</span>
        <span class="feeText">{{ `${$currency} ${shippingFee}` }}</span>
      </div>
    </div>
    <div class="totalFee">
      <span>合計</span>
      <span class="totalFeeText">{{ `${$currency} ${$totalFee}` }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { CartProduct } from "~/types/cart";
import { SalePage } from "~/types/salePage";
import { totalProductFee } from "~/utils/cart";

export default Vue.extend({
  name: "CartFeeSummary",
  props: {
    cartProducts: {
      required: true,
      type: Array as PropType<CartProduct[]>,
    },
  },
  data() {
    return {
      shippingFee: 150,
    };
  },
  computed: {
    $currency(): string {
      return this.cartProducts.length > 0
        ? this.cartProducts[0].salePage.currency.isoCode
        : "";
    },
    $fees(): {
      salePage: SalePage;
      subtotal: number;
    }[] {
      return this.cartProducts.map((cartProduct) => {
        return {
          salePage: cartProduct.salePage,
          subtotal: totalProductFee(cartProduct),
        };
      });
    },
    $subTotalFee(): number {
      return this.$fees.reduce((acc, fee) => acc + fee.subtotal, 0);
    },
    $totalFee(): number {
      return this.$subTotalFee + this.shippingFee;
    },
  },
});
</script>

<style scoped lang="scss">
.feeContainer {
  padding: 12px 0;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;
}

.cartFeeRow {
  display: flex;
  justify-content: space-between;

  @media (min-width: 768px) {
    .feeText {
      font-size: 23px;
      font-weight: 400;
      line-height: 28px;
    }
  }

  @media (max-width: 767px) {
    font-size: 21px;
    font-weight: 500;
  }
}

.totalFee {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;

  @media (min-width: 768px) {
    span {
      font-size: 28px;
      font-weight: 500;
      line-height: 28px;
    }
  }

  @media (max-width: 767px) {
    span {
      font-size: 21px;
      font-weight: 500;
    }
  }

  .totalFeeText {
    color: #ba6562;
  }
}
</style>
