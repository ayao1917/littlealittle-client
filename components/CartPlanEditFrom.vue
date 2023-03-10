<template>
  <div class="cartPlanEditFromContainer">
    <div class="cartPlanDetailDesktop">
      <div class="cartDetailHeader">
        <DeleteCartItemIcon :itemId="cartProduct.salePage.id" />
      </div>
      <div class="cartDetailBody">
        <img :src="cartProduct.salePage.picUrl" class="productImage" />
        <div class="planQuantityContainer">
          <span>
            {{ `${cartProduct.salePage.name} ${$selectedAmount} 組` }}
          </span>
        </div>
        <div class="planTotalFee">
          {{ `${cartProduct.salePage.currency.isoCode} ${$totalFee}` }}
        </div>
      </div>
      <div class="cartDetailFooter">
        <ActionButton buttonStyle="pure" @onClick="onDropdownClick">
          <span>展開明細/修改</span>
          <img
            v-if="isActive"
            class="dropdownIcon"
            src="~assets/images/arrowUp.svg"
          />
          <img
            v-if="!isActive"
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
          <DeleteCartItemIcon :itemId="cartProduct.salePage.id" />
        </div>
        <div class="cartDetailRow">
          <span>{{ `${$selectedAmount} 組` }}</span>
          <ActionButton
            class="editItemButton"
            buttonType="pure"
            @onClick="onDropdownClick"
          >
            <span>展開明細/修改</span>
            <img
              v-if="isActive"
              class="dropdownIcon"
              src="~assets/images/arrowUp.svg"
            />
            <img
              v-if="!isActive"
              class="dropdownIcon"
              src="~assets/images/arrowDown.svg"
            />
          </ActionButton>
        </div>
      </div>
    </div>
    <div v-if="isActive">
      <PlanDropdown
        v-for="(selectedPlan, i) in $selectedPlans"
        :key="i"
        class="planDropdown"
        :plan="selectedPlan.plan"
        :selectedAccessory="selectedPlan.selectedAccessory"
        :selectedPrimary="selectedPlan.selectedPrimary"
        @onUpdatePlan="onUpdateSelectedPlan"
      ></PlanDropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ActionButton from "~/components/ActionButton.vue";
import DeleteCartItemIcon from "~/components/DeleteCartItemIcon.vue";
import PlanDropdown from "~/components/PlanDropdown.vue";
import { CartProduct, SelectedPlan } from "~/types/cart";
import { isValidSelect, selectedAmount, totalPlanFee } from "~/utils/cart";

export default Vue.extend({
  name: "CartPlanEditFrom",
  components: {
    ActionButton,
    DeleteCartItemIcon,
    PlanDropdown,
  },
  props: {
    cartProduct: {
      required: true,
      type: Object as PropType<CartProduct>,
    },
  },
  data() {
    return {
      isActive: false,
      isPlanValid: [] as boolean[],
      toBeDelete: null as null | number,
    };
  },
  computed: {
    $selectedAmount(): number {
      return this.$selectedPlans.reduce((acc, selectedPlan) => {
        const { plan, selectedPrimary } = selectedPlan;
        return acc + selectedAmount(plan, selectedPrimary);
      }, 0);
    },
    $selectedPlans(): SelectedPlan[] {
      return Object.keys(this.cartProduct.selectedPlans).map(
        (key) => this.cartProduct.selectedPlans[key],
      );
    },
    $totalFee(): number {
      return this.$selectedPlans.reduce((acc, selectedPlan) => {
        const { plan, selectedAccessory, selectedPrimary } = selectedPlan;
        return acc + totalPlanFee(plan, selectedPrimary, selectedAccessory);
      }, 0);
    },
  },
  methods: {
    onDropdownClick(): void {
      this.isActive = !this.isActive;
    },
    onUpdateSelectedPlan(data: { selectedPlan: SelectedPlan }): void {
      const { selectedPlan } = data;
      const isValid = isValidSelect(
        selectedPlan.plan,
        selectedPlan.selectedPrimary,
        selectedPlan.selectedAccessory,
      );
      this.$set(this.isPlanValid, selectedPlan.plan.id, isValid);
      this.$emit("onValidatePlan", this.isPlanValid.every(Boolean));
      this.$emit("onUpdateCartProducts", {
        salePage: this.cartProduct.salePage,
        selectedPlans: {
          ...this.cartProduct.selectedPlans,
          [selectedPlan.plan.id]: selectedPlan,
        },
      });
    },
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .cartPlanEditFromContainer {
    border-bottom: 1px solid #e6e6e6;
  }

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
}

@media (max-width: 767px) {
  .cartPlanEditFromContainer {
    background-color: #ffffff;
    padding: 12px 16px;
  }

  .cartPlanEditFromContainer:not(:first-child) {
    margin-top: 16px;
  }

  .cartPlanDetailDesktop {
    display: none;
  }

  .cartPlanDetailMobile {
    display: flex;
    justify-content: space-between;

    .productImage {
      width: 64px;
      height: 64px;
    }

    .cartDetailBody {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;
      margin-left: 28px;

      .cartDetailRow {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .closeIcon {
          width: 20px;
          height: 20px;
        }

        .dropdownIcon {
          width: 24px;
          height: 24px;
        }

        .editItemButton {
          display: flex;
          align-items: center;

          span {
            margin-right: 20px;
          }
        }

        span {
          font-weight: 400;
          font-size: 20px;
        }

        button > span {
          font-size: 14px;
        }
      }
    }
  }
}

.planDropdown {
  margin: 12px 0;
}
</style>
