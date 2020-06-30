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
          <span>{{ `${cartProduct.salePage.name} ${quantity} 組` }}</span>
        </div>
        <div class="planTotalFee">
          {{ `${cartProduct.salePage.currency.isoCode} ${fee}` }}
        </div>
      </div>
      <div class="cartDetailFooter">
        <ActionButton buttonStyle="pure" @onClick="onDropdownClick">
          <span>展開明細/修改</span>
          <img
            v-if="!isActive"
            class="dropdownIcon"
            src="~assets/images/arrowUp.svg"
          />
          <img
            v-if="isActive"
            class="dropdownIcon"
            src="~assets/images/arrowDown.svg"
          />
        </ActionButton>
      </div>
    </div>
    <div class="cartPlanDetailMobile">
      <img :src="cartProduct.salePage.picUrl" class="productImage" />
      <div class="cartDetailBody">
        <div class="cartDetailRow">
          <span>{{ cartProduct.salePage.name }}</span>
          <img
            class="closeIcon"
            src="~assets/images/close.svg"
            @click="onDeleteProduct"
          />
        </div>
        <div class="cartDetailRow">
          <span>{{ `${quantity} 組` }}</span>
          <ActionButton buttonStyle="pure" @onClick="onDropdownClick">
            <span>展開明細/修改</span>
            <img
              v-if="!isActive"
              class="dropdownIcon"
              src="~assets/images/arrowUp.svg"
            />
            <img
              v-if="isActive"
              class="dropdownIcon"
              src="~assets/images/arrowDown.svg"
            />
          </ActionButton>
        </div>
      </div>
    </div>
    <div v-if="isActive"></div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ActionButton from "~/components/ActionButton.vue";
import { CartProduct } from "~/types/cart";

export default Vue.extend({
  name: "CartPlanEditFrom",
  components: {
    ActionButton,
  },
  props: {
    cartProduct: {
      required: true,
      type: Object as PropType<CartProduct>,
    },
  },
  data() {
    return {
      fee: 0,
      isActive: false,
      quantity: 0,
    };
  },
  mounted(): void {},
  methods: {
    onDeleteProduct(): void {},
    onDropdownClick(): void {
      this.isActive = !this.isActive;
    },
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
        align-items: center;
      }

      .planTotalFee {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }

    .cartDetailFooter {
      display: flex;
      justify-content: flex-end;

      .dropdownIcon {
        width: 20px;
        height: 11px;
      }
    }
  }

  .cartPlanDetailMobile {
    display: none;
  }
}

@media (max-width: 767px) {
  .cartPlanDetailDesktop {
    display: none;
  }

  .cartPlanDetailMobile {
    display: flex;
    justify-content: space-between;

    .productImage {
      max-width: 100px;
    }

    .cartDetailBody {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .cartDetailRow {
        display: flex;
        justify-content: space-between;

        .closeIcon {
          width: 18px;
          height: 17px;
        }

        .dropdownIcon {
          width: 20px;
          height: 11px;
        }
      }
    }
  }
}
</style>
