<template>
  <div>
    <div class="salePageContainer">
      <div
        v-if="$product"
        ref="productContent"
        class="productContent"
        v-html="$product.content"
      ></div>
      <div v-if="$product" class="productDetail">
        <img class="productImage" :src="$product.picUrl" />
        <div class="productInfo">
          <p class="productTitle">{{ $product.name }}</p>
          <p class="productDescription">
            <!-- Display product description -->
          </p>
        </div>
      </div>
      <div v-if="$product" class="planSelection">
        <PlanDropdown
          v-for="(selectedPlan, i) in $selectedPlans"
          :key="i"
          class="planDropdown"
          :plan="selectedPlan.plan"
          :selectedAccessory="selectedPlan.selectedAccessory"
          :selectedPrimary="selectedPlan.selectedPrimary"
          @onUpdatePlan="onUpdateSelectedPlan"
        ></PlanDropdown>
        <div class="cartActionButtonContainer">
          <ActionButton
            class="cartActionButton"
            buttonStyle="outlineTeal"
            :disabled="!$isValid"
            @onClick="onAddToCartClick"
          >
            放入購物車
          </ActionButton>
          <ActionButton
            class="cartActionButton"
            buttonStyle="containedTeal"
            :disabled="!$isValid"
            @onClick="onBuyNowClick"
          >
            立即結帳
          </ActionButton>
        </div>
      </div>
      <div v-if="showFooter" class="buyNowContainer">
        <ActionButton
          buttonStyle="containedTeal"
          class="buyNowButton"
          @onClick="onOpenCartModalClick"
        >
          <span class="buyNowButtonText">立即購買</span>
        </ActionButton>
      </div>
    </div>
    <AddCartModalMobile
      v-if="$product && cartProduct"
      :product="$product"
      :selectedPlans="cartProduct.selectedPlans"
      @onAddToCart="doAddToCart"
      @onUpdatePlan="onUpdateSelectedPlan"
    ></AddCartModalMobile>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";
import AddCartModalMobile from "~/components/AddCartModalMobile.vue";
import PlanDropdown from "~/components/PlanDropdown.vue";
import { CartProduct, SelectedPlan } from "~/types/cart";
import { Plan } from "~/types/plan";
import { SalePage } from "~/types/salePage";
import {
  addToCartAnimate,
  initSelectedPlans,
  isValidSelect,
} from "~/utils/cart";

export default Vue.extend({
  components: {
    ActionButton,
    AddCartModalMobile,
    PlanDropdown,
  },
  data() {
    return {
      cartProduct: { selectedPlans: {} } as CartProduct,
      isPlanValid: [] as boolean[],
      showFooter: false,
    };
  },
  computed: {
    $isValid(): boolean {
      return this.isPlanValid.length > 0 && this.isPlanValid.every(Boolean);
    },
    $product(): SalePage {
      return this.$store.getters["salePage/salePage"];
    },
    $selectedPlans(): SelectedPlan[] {
      return this.cartProduct
        ? Object.keys(this.cartProduct.selectedPlans).map(
            (key) => this.cartProduct.selectedPlans[key],
          )
        : [];
    },
  },
  watch: {
    $product(newProduct, _) {
      if (newProduct) {
        // const cartProducts = this.$store.getters["cart/cartProducts"];
        // if (!cartProducts[newProduct.id]) {
        this.initCart(newProduct);
        // }
      }
    },
  },
  destroyed(): void {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted(): void {
    const alias = this.$route.params.alias;
    this.$store.dispatch("salePage/getSalePage", { alias });
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    doAddToCart() {
      this.$store.commit("cart/pushCartProduct", {
        [this.$product.id]: this.cartProduct,
      });
    },
    handleScroll() {
      const contentHeight = (this.$refs.productContent as Element).clientHeight;
      this.showFooter = window.scrollY > contentHeight / 2;
    },
    initCart(product: SalePage) {
      const selectedPlans: {
        [key: string]: SelectedPlan;
      } = {};
      product.plans.forEach((plan: Plan) => {
        selectedPlans[plan.id] = initSelectedPlans(plan);
      });
      this.cartProduct = {
        salePage: product,
        selectedPlans,
      };
    },
    onAddToCartClick(event: MouseEvent) {
      const { picUrl } = this.$product;
      const { clientX, clientY } = event;
      addToCartAnimate(picUrl, { x: clientX, y: clientY }, () => {
        this.doAddToCart();
      });
    },
    onBuyNowClick(event: MouseEvent) {
      const { picUrl } = this.$product;
      const { clientX, clientY } = event;
      addToCartAnimate(picUrl, { x: clientX, y: clientY }, () => {
        this.doAddToCart();
        this.$store.commit("modal/closeModal");
        this.$router.push("/cart");
      });
    },
    onOpenCartModalClick() {
      this.$store.commit("modal/openModal", "ADD_CART");
    },
    onUpdateSelectedPlan(data: { selectedPlan: SelectedPlan }) {
      const { selectedPlan } = data;
      const isValid = isValidSelect(
        selectedPlan.plan,
        selectedPlan.selectedPrimary,
        selectedPlan.selectedAccessory,
      );
      this.$set(this.isPlanValid, selectedPlan.plan.id, isValid);
      this.cartProduct.selectedPlans[selectedPlan.plan.id] = selectedPlan;
    },
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .salePageContainer {
    max-width: 768px;
    margin: 0 auto;

    .productContent {
      /deep/ img {
        width: 100%;
      }
    }

    .productDetail {
      display: flex;
      padding: 40px 0 20px;

      .productImage {
        width: 50%;
      }

      .productInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 12px;

        .productTitle {
          color: #333333;
          font-size: 23px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .productDescription {
          color: #808080;
          font-size: 19px;
          font-weight: 400;
        }
      }
    }

    .planSelection {
      .planDropdown {
        margin-bottom: 12px;
      }

      .cartActionButtonContainer {
        display: flex;
        margin-bottom: 24px;

        .cartActionButton {
          width: calc(50% - 4px);
          padding: 8px;
        }

        .cartActionButton:not(:last-child) {
          margin-right: 8px;
        }
      }
    }

    .buyNowContainer {
      display: none;
    }
  }
}

@media (max-width: 767px) {
  .salePageContainer {
    background-color: #fafafa;
    min-height: calc(100vh - 60px);

    .productContent {
      /deep/ img {
        width: 100%;
      }
    }

    .productDetail,
    .planSelection {
      display: none;
    }

    .buyNowContainer {
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 14px;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 -4px 10px -6px #808080;
      background-color: #ffffff;

      .buyNowButton {
        width: 100%;
        padding: 14px 0;

        .buyNowButtonText {
          font-weight: 700;
          font-size: 18px;
        }
      }
    }
  }

  .salePageContainer:after {
    content: "";
    display: block;
    height: 80px;
  }
}
</style>
