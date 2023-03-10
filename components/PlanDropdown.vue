<template>
  <div>
    <button class="dropdownButton" @click="onDropdownClick">
      <div class="dropdownText">
        <span>{{ plan.name }}</span>
        <!--
        <span v-if="$totalPlanFee > 0" class="amount">
          {{ `${$currency} ${$totalPlanFee}` }}
        </span>
        -->
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
          <!--
          <span v-if="$totalPrimaryFee > 0" class="amount">
            {{ `${$currency} ${$totalPrimaryFee}` }}
          </span>
          -->
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
      ></ItemSelector>
      <div v-if="$accessory.length > 0">
        <div class="planListDetailTitle">
          <div>
            <span>配件商品</span>
            <!--
            <span v-if="$totalAccessoryFee > 0" class="amount">
              {{ `${$currency} ${$totalAccessoryFee}` }}
            </span>
            -->
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
        ></ItemSelector>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ItemSelector from "~/components/ItemSelector.vue";
import { CountGroup } from "~/types/cart";
import { Plan, PlanListDetail } from "~/types/plan";
import {
  accessoryPlan,
  isValidAccessory,
  isValidPrimary,
  primaryPlan,
  targetAccessoryQuantity,
  targetPrimaryQuantity,
  totalAccessoryAmount,
  totalAccessoryFee,
  totalPrimaryAmount,
  totalPrimaryFee,
} from "~/utils/cart";

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
      isActive: true,
    };
  },
  computed: {
    $accessory(): PlanListDetail[] {
      return accessoryPlan(this.plan);
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
      return isValidAccessory(
        this.plan,
        this.selectedPrimary,
        this.selectedAccessory,
      );
    },
    $isValidPrimary(): boolean {
      return isValidPrimary(this.plan, this.selectedPrimary);
    },
    $primary(): PlanListDetail[] {
      return primaryPlan(this.plan);
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
      return targetAccessoryQuantity(this.plan, this.selectedPrimary);
    },
    $targetPrimaryQuantity(): number {
      return targetPrimaryQuantity(this.plan);
    },
    $totalAccessoryAmount(): number {
      return totalAccessoryAmount(this.selectedAccessory);
    },
    $totalAccessoryFee(): number {
      return totalAccessoryFee(
        this.plan,
        this.selectedPrimary,
        this.selectedAccessory,
      );
    },
    $totalPlanFee(): number {
      return this.$totalPrimaryFee + this.$totalAccessoryFee;
    },
    $totalPrimaryAmount(): number {
      return totalPrimaryAmount(this.selectedPrimary);
    },
    $totalPrimaryFee(): number {
      return totalPrimaryFee(this.plan, this.selectedPrimary);
    },
  },
  methods: {
    onDropdownClick(): void {
      this.isActive = !this.isActive;
    },
    onUpdateAccessoryCount(id: string, value: number): void {
      this.$emit("onUpdatePlan", {
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
      width: 24px;
      height: 24px;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid #c1c1c1;
    color: #000000;
    padding: 12px;
    margin: 0 16px;
    width: calc(100% - 32px);
    height: 40px;
    outline: none;

    .dropdownText {
      display: inline;
      font-weight: 400;
      font-size: 14px;
    }

    .dropdownIcon {
      width: 24px;
      height: 24px;
    }
  }

  .dropdownContent {
    margin-top: 6px;

    .planListDetailTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #c7dfe2;
      width: 100%;
      padding: 6px 28px;
      box-sizing: border-box;

      span {
        font-weight: 400;
        font-size: 14px;
        color: #000000;
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

.amount {
  color: #4f9eac;
}
</style>
