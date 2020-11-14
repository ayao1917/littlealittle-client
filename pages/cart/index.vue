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
        />
        <CartAddPurchaseEditFrom
          v-for="cartAddPurchase in cartAddPurchases"
          :key="cartAddPurchase.addPurchase.id"
          :cartAddPurchase="cartAddPurchase"
          @onUpdateAddPurchase="onUpdateAddPurchase"
          @onValidatePlan="onValidatePlan"
        />
        <div class="editButtonContainer">
          <ActionButton
            class="editButton"
            buttonStyle="containedTeal"
            :disabled="!isValidPlan"
            @onClick="onUpdateCart"
          >
            修改
          </ActionButton>
        </div>
        <div class="addPurchasesBlock">
          <div class="addPurchasesTitle">
            <p>您可能也會喜歡...</p>
          </div>
          <AddPurchasesRowDesktop
            class="addPurchasesDesktop"
            :addPurchases="$addPurchases"
          />
          <AddPurchasesRowMobile
            class="addPurchasesMobile"
            :addPurchases="$addPurchases"
          />
        </div>
        <CartFeeSummary class="cartFeeSummary"></CartFeeSummary>
        <ActionButton
          class="nextStepButton"
          buttonStyle="containedTeal"
          :disabled="$store.getters['cart/planCount'] === 0"
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
    <EmptyCartModal />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";
import AddPurchasesRowDesktop from "~/components/AddPurchasesRowDesktop.vue";
import AddPurchasesRowMobile from "~/components/AddPurchasesRowMobile.vue";
import CartAddPurchaseEditFrom from "~/components/CartAddPurchaseEditFrom.vue";
import CartFeeSummary from "~/components/CartFeeSummary.vue";
import CartForm from "~/components/CartForm.vue";
import CartPlanEditFrom from "~/components/CartPlanEditFrom.vue";
import CartProgress from "~/components/CartProgress.vue";
import EmptyCartModal from "~/components/EmptyCartModal.vue";
import { CartAddPurchase, CartProduct } from "~/types/cart";
import { OrderForm } from "~/types/order";
import { AddPurchase } from "~/types/salePage";

export default Vue.extend({
  name: "Cart",
  components: {
    ActionButton,
    AddPurchasesRowDesktop,
    AddPurchasesRowMobile,
    CartAddPurchaseEditFrom,
    CartFeeSummary,
    CartForm,
    CartPlanEditFrom,
    CartProgress,
    EmptyCartModal,
  },
  data() {
    return {
      cartAddPurchases: (null as unknown) as { [key: string]: CartAddPurchase },
      cartProducts: (null as unknown) as { [key: string]: CartProduct },
      currentProgress: 1,
      isValidPlan: false,
    };
  },
  computed: {
    $addPurchases(): AddPurchase[] {
      return this.$store.getters["salePage/addPurchases"];
    },
    $cartAddPurchases(): { [key: string]: CartAddPurchase } {
      return this.$store.getters["cart/cartAddPurchases"];
    },
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
    $cartAddPurchases(newAdd) {
      if (newAdd) {
        this.cartAddPurchases = {
          ...newAdd,
        };
      }
    },
    $cartProducts(newProduct) {
      if (newProduct) {
        this.cartProducts = {
          ...newProduct,
        };
      }
    },
  },
  mounted(): void {
    if (this.$store.getters["cart/planCount"] === 0) {
      this.$store.commit("modal/openModal", "EMPTY_CART_CONFIRM");
    }
    this.$store.dispatch("salePage/getAddPurchases");
    this.currentProgress = 1;
    this.cartProducts = {
      ...this.$cartProducts,
    };
    this.cartAddPurchases = {
      ...this.$cartAddPurchases,
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
          window.scrollTo(0, 0);
          this.$store.commit("cart/clearCart");
          if (cartForm.paymentMethod === 2) {
            this.$router.push("cart/payment");
          } else {
            this.$router.push(`cart/complete?type=default`);
          }
        },
        data: cartForm,
      });
    },
    onUpdateAddPurchase(cartAddPurchase: CartAddPurchase): void {
      this.cartAddPurchases[cartAddPurchase.addPurchase.id] = cartAddPurchase;
    },
    onUpdateCart(): void {
      this.$store.commit("cart/setCartProducts", this.cartProducts);
      this.$store.commit("cart/setCartAddPurchase", this.cartAddPurchases);
    },
    onUpdateCartProducts(cartProduct: CartProduct): void {
      this.cartProducts[cartProduct.salePage.id] = cartProduct;
    },
    onValidatePlan(isValid: boolean): void {
      this.isValidPlan = isValid;
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

      .addPurchasesBlock {
        .addPurchasesTitle {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 132px;

          p {
            font-size: 28px;
            font-weight: 500;
          }
        }

        .addPurchasesMobile {
          display: none;
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

      .addPurchasesBlock {
        .addPurchasesTitle {
          padding: 12px 24px;

          p {
            font-size: 21px;
            font-weight: 500;
          }
        }

        .addPurchasesDesktop {
          display: none;
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
