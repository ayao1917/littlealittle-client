<template>
  <div>
    <div class="cartHeader">
      <CartProgress
        class="cartProgress"
        :currentProgress="currentProgress"
      ></CartProgress>
    </div>
    <div class="cartBody">
      <div v-if="currentProgress === 1" class="stepOne">
        <CartPlanEditFrom
          v-for="cartProduct in cartProducts"
          :key="cartProduct.salePage.id"
          :cartProduct="cartProduct"
          @onUpdateCartProducts="onUpdateCartProducts"
        ></CartPlanEditFrom>
        <div class="editButtonContainer">
          <ActionButton
            class="editButton"
            buttonStyle="containedTeal"
            @onClick="onUpdateCart"
          >
            修改
          </ActionButton>
        </div>
        <CartFeeSummary class="cartFeeSummary"></CartFeeSummary>
        <ActionButton
          class="nextStepButton"
          buttonStyle="containedTeal"
          @onClick="onClickNextStep"
        >
          下一步
        </ActionButton>
      </div>
      <div v-if="currentProgress === 2" class="stepTwo">
        <CartForm @onSubmitForm="onSubmitForm"></CartForm>
      </div>
      <div v-if="currentProgress === 3" class="stepThree"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";
import CartFeeSummary from "~/components/CartFeeSummary.vue";
import CartForm from "~/components/CartForm.vue";
import CartPlanEditFrom from "~/components/CartPlanEditFrom.vue";
import CartProgress from "~/components/CartProgress.vue";
import { CartProduct } from "~/types/cart";
import { OrderForm } from "~/types/order";

export default Vue.extend({
  name: "Cart",
  components: {
    ActionButton,
    CartFeeSummary,
    CartForm,
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
    $cartProducts(newProduct) {
      if (newProduct) {
        this.cartProducts = newProduct;
      }
    },
  },
  mounted(): void {
    this.currentProgress = 1;
    this.cartProducts = {
      ...this.$cartProducts,
    };
  },
  methods: {
    onClickNextStep(): void {
      this.currentProgress = 2;
      window.scrollTo(0, 0);
    },
    onSubmitForm(cartForm: OrderForm): void {
      this.$store.dispatch("order/createOrder", {
        callback: () => {
          this.currentProgress = 3;
          window.scrollTo(0, 0);
        },
        data: cartForm,
      });
    },
    onUpdateCart(): void {
      this.$store.commit("cart/setCart", this.cartProducts);
    },
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

    .stepOne {
      .editButtonContainer {
        border-bottom: 1px solid #e6e6e6;

        .editButton {
          width: 100%;
          margin: 12px 0;
          padding: 12px 0;
          font-size: 21px;
          font-weight: 500;
        }
      }

      .cartFeeSummary {
        margin: 12px 0;
      }
    }

    .nextStepButton {
      width: 100%;
      margin: 12px 0 72px;
      padding: 12px 0;
      font-size: 21px;
      font-weight: 500;
    }
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

    .stepOne {
      .editButtonContainer {
        border-bottom: 1px solid #e6e6e6;

        .editButton {
          width: 100%;
          margin: 12px 0;
          padding: 12px 0;
          font-size: 21px;
          font-weight: 500;
        }
      }

      .cartFeeSummary {
        margin: 12px 0;
      }
    }

    .nextStepButton {
      width: 100%;
      margin: 12px 0;
      padding: 12px 0;
      font-size: 21px;
      font-weight: 500;
    }
  }
}
</style>
