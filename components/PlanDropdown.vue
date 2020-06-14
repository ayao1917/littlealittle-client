<template>
  <div>
    <button class="dropdownButton" @click="onDropdownClick">
      <span class="dropdownText">{{ plan.name }}</span>
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
    <div class="dropdownContent" v-if="isActive">
      <div class="planListDetailTitle">
        <span>請選擇種類</span>
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
          <span>請選擇種類</span>
          <span :class="{ valid: $isValidPair, invalid: !$isValidPair }">
            {{ `(${$totalAccessory} / ${$target})` }}
          </span>
        </div>
        <ItemSelector
          v-for="planDetail in $accessory"
          :key="planDetail.goodsId"
          :planListDetail="planDetail"
          :count="selectedAccessory[planDetail.goodsId]"
          @onChangeCount="onUpdateSecondaryCount"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ItemSelector from "~/components/ItemSelector.vue";
import { Plan, PlanListDetail } from "~/types/plan";

interface CountGroup {
  [key: string]: number;
}

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
  },
  data() {
    return {
      isActive: false,
      selectedAccessory: {} as CountGroup,
      selectedPrimary: {} as CountGroup,
    };
  },
  computed: {
    $accessory(): PlanListDetail[] {
      return this.plan.planDetails.filter(
        (planDetail) => !planDetail.isPrimary,
      );
    },
    $isValidPair(): boolean {
      return this.$target === this.$totalAccessory;
    },
    $primary(): PlanListDetail[] {
      return this.plan.planDetails.filter((planDetail) => planDetail.isPrimary);
    },
    $target(): number {
      return (
        (this.$totalPrimary / this.plan.primaryItemQuantity) *
        this.plan.accessorySyncQuantity
      );
    },
    $totalAccessory(): number {
      return Object.keys(this.selectedAccessory).reduce(
        (a, c) => a + this.selectedAccessory[c],
        0,
      );
    },
    $totalPrimary(): number {
      return Object.keys(this.selectedPrimary).reduce(
        (a, c) => a + this.selectedPrimary[c],
        0,
      );
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
    onUpdatePrimaryCount(id: string, value: number): void {
      this.selectedPrimary[id] = value;
    },
    onUpdateSecondaryCount(id: string, value: number): void {
      this.selectedAccessory[id] = value;
    },
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .dropdownButton {
    border-radius: 8px;
    border-color: #e6e6e6;
    border-style: solid;
    color: #808080;
    padding: 8px;
    width: 100%;
    height: 48px;
    outline: none;

    .dropdownText {
      float: left;
      color: #4d4d4d;
      font-size: 21px;
      font-weight: 400;
    }

    .dropdownIcon {
      float: right;
      width: 20px;
      height: 11px;
      padding-top: 8px;
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
</style>
