<template>
  <div>
    <div class="feeContainer">
      <div v-for="fee in $fees" :key="fee.salePage.id" class="cartFeeRow">
        <span class="feeText">{{ fee.salePage.name }}</span>
        <span class="feeText">
          {{ `${fee.salePage.currency.isoCode} ${fee.subtotal}` }}
        </span>
      </div>
      <div
        v-for="cartAddPurchase in $cartAddPurchases"
        :key="cartAddPurchase.addPurchase.id"
        class="cartFeeRow"
      >
        <span class="feeText">{{ cartAddPurchase.addPurchase.name }}</span>
        <span class="feeText">
          {{
            `${$currency} ${cartAddPurchase.addPurchase.price *
              cartAddPurchase.quantity}`
          }}
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
import Vue from "vue";
import { CartAddPurchase, CartProduct } from "~/types/cart";
import { SalePage } from "~/types/salePage";
import { totalProductFee } from "~/utils/cart";

export default Vue.extend({
  name: "CartFeeSummary",
  data() {
    return {
      cartProducts: [] as CartProduct[],
      shippingFee: 0,
    };
  },
  computed: {
    $cartAddPurchases(): CartAddPurchase[] {
      const cartAddPurchases = this.$store.getters["cart/cartAddPurchases"];
      return Object.keys(cartAddPurchases).map(
        (key: string) => cartAddPurchases[key],
      );
    },
    $cartProducts(): { [key: string]: CartProduct } {
      return this.$store.getters["cart/cartProducts"];
    },
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
      const totalProduct = this.$fees.reduce(
        (acc, fee) => acc + fee.subtotal,
        0,
      );
      const totalAddPurchase = this.$cartAddPurchases.reduce(
        (acc, cartAddPurchase) =>
          acc + cartAddPurchase.addPurchase.price * cartAddPurchase.quantity,
        0,
      );
      return totalProduct + totalAddPurchase;
    },
    $totalFee(): number {
      return this.$subTotalFee + this.shippingFee;
    },
  },
  watch: {
    $cartProducts(newProduct, _) {
      if (newProduct) {
        this.cartProducts = Object.keys(newProduct).map(
          (key) => newProduct[key],
        );
      }
    },
  },
  mounted(): void {
    this.cartProducts = Object.keys(this.$cartProducts).map(
      (key) => this.$cartProducts[key],
    );
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
