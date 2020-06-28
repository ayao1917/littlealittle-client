<template>
  <div>
    <div class="salePageContainer">
      <div
        v-if="$product"
        class="productContent"
        v-html="$product.content"
      ></div>
      <div v-if="$product" class="productDetail">
        <img class="productImage" :src="$product.picUrl" />
        <div class="productInfo">
          <p class="productTitle">{{ $product.name }}</p>
          <p class="productDescription">
            寵愛自已情調香芬蠟燭無煙加熱燈，均勻融化蠟燭。不會燃燒
          </p>
        </div>
      </div>
      <div class="planSelection" v-if="$product">
        <PlanDropdown
          class="planDropdown"
          v-for="(plan, i) in $plans"
          :key="i"
          :plan="plan"
          @onUpdatePlan="onUpdateSelectedPlan"
        />
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
      <div class="buyNowContainer">
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
      :product="$product"
      @onAddToCart="doAddToCart"
      @onUpdatePlan="onUpdateSelectedPlan"
    />
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
import { addToCartAnimate } from "~/utils/cart";

export default Vue.extend({
  components: {
    ActionButton,
    AddCartModalMobile,
    PlanDropdown,
  },
  data() {
    return {
      cartProduct: (null as unknown) as CartProduct,
      isPlanValid: [] as boolean[],
    };
  },
  computed: {
    $isValid(): boolean {
      return this.isPlanValid.length > 0 && this.isPlanValid.every(Boolean);
    },
    $plans(): Plan[] {
      return this.$product ? this.$product.plans : [];
    },
    $product(): SalePage {
      return this.$store.getters["salePage/salePage"];
    },
  },
  mounted(): void {
    const alias = this.$route.params.alias;
    this.$store.dispatch("salePage/getSalePage", { alias });
    this.cartProduct = {
      salePage: this.$product,
      selectedPlans: {},
    };
  },
  methods: {
    doAddToCart() {
      this.$store.commit("cart/pushCartProduct", {
        [this.$product.id]: this.cartProduct,
      });
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
        this.$router.push("/cart");
      });
    },
    onOpenCartModalClick() {
      this.$store.commit("modal/openModal", "ADD_CART");
    },
    onUpdateSelectedPlan(data: {
      isValid: boolean;
      selectedPlan: SelectedPlan;
    }) {
      const { isValid, selectedPlan } = data;
      this.$set(this.isPlanValid, selectedPlan.plan.id, isValid);
      this.cartProduct.salePage = this.$product;
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
      height: 60px;
      box-sizing: border-box;
      box-shadow: 0 -4px 10px -6px #808080;
      background-color: #ffffff;

      .buyNowButton {
        width: 100%;

        .buyNowButtonText {
          font-size: 21px;
          font-weight: 500;
        }
      }
    }
  }

  .salePageContainer:after {
    content: "";
    display: block;
    height: 60px;
  }
}
</style>
