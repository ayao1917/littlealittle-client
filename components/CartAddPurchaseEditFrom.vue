<template>
  <div class="cartPlanEditFromContainer">
    <div class="cartPlanDetailDesktop">
      <div class="cartDetailHeader">
        <img
          class="closeIcon"
          src="~assets/images/close.svg"
          @click="
            () => {
              onDeleteClick(cartAddPurchase.addPurchase.id);
            }
          "
        />
      </div>
      <div class="cartDetailBody">
        <img :src="cartAddPurchase.addPurchase.picUrl" class="productImage" />
        <div class="planQuantityContainer">
          <span>
            {{
              `加購：${cartAddPurchase.addPurchase.name} ${cartAddPurchase.quantity} 組`
            }}
          </span>
        </div>
        <div class="planTotalFee">
          {{
            `${cartAddPurchase.quantity * cartAddPurchase.addPurchase.price}`
          }}
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
      <img :src="cartAddPurchase.addPurchase.picUrl" class="productImage" />
      <div class="cartDetailBody">
        <div class="cartDetailRow">
          <span>{{ `加購：${cartAddPurchase.addPurchase.name}` }}</span>
          <img
            class="closeIcon"
            src="~assets/images/close.svg"
            @click="
              () => {
                onDeleteClick(cartAddPurchase.addPurchase.id);
              }
            "
          />
        </div>
        <div class="cartDetailRow">
          <span>{{ `${cartAddPurchase.quantity} 組` }}</span>
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
    <div v-if="isActive" class="planListDetailRow">
      <span>加購品</span>
      <div class="countSelect">
        <img
          class="minusIcon"
          src="~assets/images/minus.svg"
          @click="onClickMinus"
        />
        {{ cartAddPurchase.quantity }}
        <img
          class="plusIcon"
          src="~assets/images/plus.svg"
          @click="onClickPlus"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ActionButton from "~/components/ActionButton.vue";
import { CartAddPurchase } from "~/types/cart";

export default Vue.extend({
  name: "CartAddPurchaseEditFrom",
  components: {
    ActionButton,
  },
  props: {
    cartAddPurchase: {
      required: true,
      type: Object as PropType<CartAddPurchase>,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    onClickMinus(): void {
      const newValue =
        this.cartAddPurchase.quantity > 1
          ? this.cartAddPurchase.quantity - 1
          : 1;
      this.$emit("onUpdateAddPurchase", {
        addPurchase: this.cartAddPurchase.addPurchase,
        quantity: newValue,
      });
    },
    onClickPlus(): void {
      const newValue = this.cartAddPurchase.quantity + 1;
      this.$emit("onUpdateAddPurchase", {
        addPurchase: this.cartAddPurchase.addPurchase,
        quantity: newValue,
      });
    },
    onDeleteClick(id: number): void {
      this.$store.commit("cart/dropAddPurchase", id);
    },
    onDropdownClick(): void {
      this.isActive = !this.isActive;
    },
  },
});
</script>

<style scoped lang="scss">
.cartPlanEditFromContainer {
  border-bottom: 1px solid #e6e6e6;
}

@media (min-width: 768px) {
  .cartPlanDetailDesktop {
    padding: 24px 0 12px;

    .cartDetailHeader {
      display: flex;
      justify-content: flex-end;

      .closeIcon {
        width: 24px;
        height: 24px;
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
        width: 24px;
        height: 24px;
      }
    }
  }

  .cartPlanDetailMobile {
    display: none;
  }

  .planListDetailRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 0 15px;
    box-sizing: border-box;
    border-color: #e6e6e6;
    border-style: solid;
    border-width: 0.5px;

    .countSelect {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 15%;

      .minusIcon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin-right: 12px;
      }

      .plusIcon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin-left: 12px;
      }
    }
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
          width: 24px;
          height: 24px;
        }

        .dropdownIcon {
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  .planListDetailRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 15px;
    box-sizing: border-box;
    border-color: #e6e6e6;
    border-style: solid;
    border-width: 0.5px;

    .countSelect {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 30%;

      .minusIcon {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      .plusIcon {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
}

.planDropdown {
  margin-bottom: 12px;
}
</style>
