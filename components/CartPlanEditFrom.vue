<template>
  <div>
    <div class="cartPlanDetailDesktop">
      <div class="cartDetailHeader">
        <img
          class="closeIcon"
          src="~assets/images/close.svg"
          @click="
            () => {
              onDeleteClick(cartProduct.salePage.id);
            }
          "
        />
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
            @click="
              () => {
                onDeleteClick(cartProduct.salePage.id);
              }
            "
          />
        </div>
        <div class="cartDetailRow">
          <span>{{ `${$selectedAmount} 組` }}</span>
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
    <DeletePlanConfirmModal
      type="Default"
      @onConfirm="onDeleteProduct"
    ></DeletePlanConfirmModal>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ActionButton from "~/components/ActionButton.vue";
import DeletePlanConfirmModal from "~/components/DeletePlanConfirmModal.vue";
import PlanDropdown from "~/components/PlanDropdown.vue";
import { CartProduct, SelectedPlan } from "~/types/cart";
import { selectedAmount, totalFee } from "~/utils/cart";

export default Vue.extend({
  name: "CartPlanEditFrom",
  components: {
    ActionButton,
    DeletePlanConfirmModal,
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
      toBeDelete: (null as unknown) as number,
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
        return acc + totalFee(plan, selectedPrimary, selectedAccessory);
      }, 0);
    },
  },
  methods: {
    onDeleteClick(id: number): void {
      this.toBeDelete = id;
      this.$store.commit("modal/openModal", "DELETE_PLAN_CONFIRM");
    },
    onDeleteProduct(): void {
      if (this.toBeDelete) {
        this.$store.commit("cart/dropCartProduct", this.toBeDelete);
        this.$store.commit("modal/closeModal");
      }
    },
    onDropdownClick(): void {
      this.isActive = !this.isActive;
    },
    onUpdateSelectedPlan(data: {
      isValid: boolean;
      selectedPlan: SelectedPlan;
    }): void {
      const { selectedPlan } = data;
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

.planDropdown {
  margin-bottom: 12px;
}
</style>
