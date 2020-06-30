<template>
  <div>
    <button class="dropdownButton" @click="onDropdownClick">
      <div class="dropdownText">
        <span>{{ plan.name }}</span>
        <span v-if="$totalPlanFee > 0" class="amount">
          {{ `${$currency} ${$totalPlanFee}` }}
        </span>
      </div>
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
    </button>
    <div v-if="isActive" class="dropdownContent">
      <div class="planListDetailTitle">
        <div>
          <span>主要商品</span>
          <span v-if="$totalPrimaryFee > 0" class="amount">
            {{ `${$currency} ${$totalPrimaryFee}` }}
          </span>
        </div>
        <span
          v-if="$shouldValidatePrimary"
          :class="{ valid: $isValidPrimary, invalid: !$isValidPrimary }"
        >
          {{ `(${$totalPrimaryAmount} / ${$targetPrimaryQuantity})` }}
        </span>
      </div>
      <ItemSelector
        v-for="planDetail in $primary"
        :key="planDetail.goodsId"
        :planListDetail="planDetail"
        :count="selectedPrimary[planDetail.goodsId]"
        @onChangeCount="onUpdatePrimaryCount"
      />
      <div v-if="$accessory.length > 0">
        <div class="planListDetailTitle">
          <div>
            <span>配件商品</span>
            <span v-if="$totalAccessoryFee > 0" class="amount">
              {{ `${$currency} ${$totalAccessoryFee}` }}
            </span>
          </div>
          <span
            v-if="$shouldValidateAccessory"
            :class="{ valid: $isValidAccessory, invalid: !$isValidAccessory }"
          >
            {{ `(${$totalAccessoryAmount} / ${$targetAccessoryQuantity})` }}
          </span>
        </div>
        <ItemSelector
          v-for="planDetail in $accessory"
          :key="planDetail.goodsId"
          :planListDetail="planDetail"
          :count="selectedAccessory[planDetail.goodsId]"
          @onChangeCount="onUpdateAccessoryCount"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ItemSelector from "~/components/ItemSelector.vue";
import { CountGroup } from "~/types/cart";
import { Plan, PlanListDetail } from "~/types/plan";

export default Vue.extend({
  name: "PlanDropdown",
  components: {
    ItemSelector,
  },
  props: {
    plan: {
      required: true,
      type: Object as PropType<Plan>,
    },
    selectedAccessory: {
      required: true,
      type: Object as PropType<CountGroup>,
    },
    selectedPrimary: {
      required: true,
      type: Object as PropType<CountGroup>,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    $accessory(): PlanListDetail[] {
      return this.plan.planDetails.filter(
        (planDetail) => !planDetail.isPrimary,
      );
    },
    $currency(): string {
      const product = this.$store.getters["salePage/salePage"];
      if (product) {
        return product.currency.isoCode;
      } else {
        return "$";
      }
    },
    $isValidAccessory(): boolean {
      const { accessoryQuantity } = this.plan;
      if (accessoryQuantity === -1 || accessoryQuantity === 1) {
        return this.$targetAccessoryQuantity === this.$totalAccessoryAmount;
      } else {
        return true;
      }
    },
    $isValidPrimary(): boolean {
      const { primaryItemQuantity } = this.plan;
      if (primaryItemQuantity === 1) {
        return true;
      } else {
        return this.$targetPrimaryQuantity === this.$totalPrimaryAmount;
      }
    },
    $primary(): PlanListDetail[] {
      return this.plan.planDetails.filter((planDetail) => planDetail.isPrimary);
    },
    $shouldValidateAccessory(): boolean {
      const { accessoryQuantity } = this.plan;
      return accessoryQuantity === -1 || accessoryQuantity > 1;
    },
    $shouldValidatePrimary(): boolean {
      const { primaryItemQuantity } = this.plan;
      return primaryItemQuantity > 1;
    },
    $targetAccessoryQuantity(): number {
      const {
        accessoryQuantity,
        accessorySyncQuantity,
        primaryItemQuantity,
      } = this.plan;
      if (accessoryQuantity === -1) {
        return (
          (this.$totalPrimaryAmount / primaryItemQuantity) *
          accessorySyncQuantity
        );
      } else if (accessoryQuantity > 1) {
        return accessoryQuantity;
      } else {
        return 0;
      }
    },
    $targetPrimaryQuantity(): number {
      const { primaryItemQuantity } = this.plan;
      if (primaryItemQuantity > 1) {
        return primaryItemQuantity;
      } else {
        return 0;
      }
    },
    $totalAccessoryAmount(): number {
      return Object.keys(this.selectedAccessory).reduce(
        (a, c) => a + this.selectedAccessory[c],
        0,
      );
    },
    $totalAccessoryFee(): number {
      const { accessoryPrice, accessoryQuantity } = this.plan;
      if (accessoryQuantity === -1) {
        return accessoryPrice * this.$targetAccessoryQuantity;
      } else if (accessoryQuantity === 0) {
        return accessoryPrice * accessoryQuantity;
      } else if (accessoryQuantity === 1) {
        return accessoryPrice * this.$totalAccessoryAmount;
      } else {
        return (
          accessoryPrice * (this.$totalAccessoryAmount / accessoryQuantity)
        );
      }
    },
    $totalPlanFee(): number {
      return this.$totalPrimaryFee + this.$totalAccessoryFee;
    },
    $totalPrimaryAmount(): number {
      return Object.keys(this.selectedPrimary).reduce(
        (a, c) => a + this.selectedPrimary[c],
        0,
      );
    },
    $totalPrimaryFee(): number {
      const { primaryItemPrice, primaryItemQuantity } = this.plan;
      if (primaryItemQuantity === 1) {
        return primaryItemPrice * this.$totalPrimaryAmount;
      } else if (primaryItemQuantity > 1) {
        return (
          primaryItemPrice * (this.$totalPrimaryAmount / primaryItemQuantity)
        );
      } else {
        return 0;
      }
    },
  },
  mounted(): void {
    this.$primary.forEach((planDetail) => {
      this.$set(this.selectedPrimary, planDetail.goodsId, 0);
    });
    this.$accessory.forEach((planDetail) => {
      this.$set(this.selectedAccessory, planDetail.goodsId, 0);
    });
  },
  methods: {
    onDropdownClick(): void {
      this.isActive = !this.isActive;
    },
    onUpdateAccessoryCount(id: string, value: number): void {
      this.selectedAccessory[id] = value;
      this.$emit("onUpdatePlan", {
        isValid: this.$isValidAccessory && this.$isValidPrimary,
        selectedPlan: {
          plan: this.plan,
          selectedAccessory: {
            ...this.selectedAccessory,
            [id]: value,
          },
          selectedPrimary: this.selectedPrimary,
        },
      });
    },
    onUpdatePrimaryCount(id: string, value: number): void {
      this.$emit("onUpdatePlan", {
        isValid: this.$isValidAccessory && this.$isValidPrimary,
        selectedPlan: {
          plan: this.plan,
          selectedAccessory: this.selectedAccessory,
          selectedPrimary: {
            ...this.selectedPrimary,
            [id]: value,
          },
        },
      });
    },
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .dropdownButton {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    border-color: #e6e6e6;
    border-style: solid;
    color: #808080;
    padding: 8px;
    width: 100%;
    height: 48px;
    outline: none;

    .dropdownText span {
      color: #4d4d4d;
      font-size: 21px;
      font-weight: 400;
    }

    .dropdownIcon {
      width: 20px;
      height: 11px;
    }
  }

  .dropdownContent {
    margin-top: 8px;

    .planListDetailTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #c7dfe2;
      width: 100%;
      height: 48px;
      padding: 0 15px;
      box-sizing: border-box;

      span {
        font-size: 21px;
        font-weight: 500;
        color: #4d4d4d;
      }

      .valid {
        color: #4f9eac;
      }

      .invalid {
        color: #ed847e;
      }
    }
  }
}

@media (max-width: 767px) {
  .dropdownButton {
    border-radius: 8px;
    border-color: #e6e6e6;
    border-style: solid;
    color: #808080;
    padding: 8px;
    width: 100%;
    height: 60px;
    outline: none;

    .dropdownText {
      display: inline;
      margin-left: 24px;
    }

    .dropdownIcon {
      float: right;
      width: 20px;
      height: 11px;
      padding: 4px 4px 0 0;
    }
  }

  .planListDetailTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #c7dfe2;
    width: 100%;
    height: 60px;
    padding: 0 15px;
    box-sizing: border-box;

    span {
      font-size: 21px;
      font-weight: 500;
      color: #4d4d4d;
    }

    .valid {
      color: #4f9eac;
    }

    .invalid {
      color: #ed847e;
    }
  }
}

.amount {
  color: #4f9eac;
}
</style>
