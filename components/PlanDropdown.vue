<template>
  <div>
    <button class="dropdownButton" @click="onDropdownClick">
      {{ plan.name }}
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
    <div v-if="isActive">
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
      <div class="planListDetailTitle">
        <span>請選擇種類</span>
        <span :class="{ valid: $isValidPair, invalid: !$isValidPair }">{{
          `(${$totalSecondary} / ${$target})`
        }}</span>
      </div>
      <ItemSelector
        v-for="planDetail in $secondary"
        :key="planDetail.goodsId"
        :planListDetail="planDetail"
        :count="selectedSecondary[planDetail.goodsId]"
        @onChangeCount="onUpdateSecondaryCount"
      />
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
      selectedPrimary: {} as CountGroup,
      selectedSecondary: {} as CountGroup,
    };
  },
  computed: {
    $isValidPair(): boolean {
      return this.$target === this.$totalSecondary;
    },
    $primary(): PlanListDetail[] {
      return this.plan.planDetails.filter((planDetail) => planDetail.isPrimary);
    },
    $secondary(): PlanListDetail[] {
      return this.plan.planDetails.filter(
        (planDetail) => !planDetail.isPrimary,
      );
    },
    $target(): number {
      return (
        (this.$totalPrimary / this.plan.primaryItemQuantity) *
        this.plan.accessorySyncQuantity
      );
    },
    $totalPrimary(): number {
      return Object.keys(this.selectedPrimary).reduce(
        (a, c) => a + this.selectedPrimary[c],
        0,
      );
    },
    $totalSecondary(): number {
      return Object.keys(this.selectedSecondary).reduce(
        (a, c) => a + this.selectedSecondary[c],
        0,
      );
    },
  },
  mounted(): void {
    this.$primary.forEach((planDetail) => {
      this.$set(this.selectedPrimary, planDetail.goodsId, 0);
    });
    this.$secondary.forEach((planDetail) => {
      this.$set(this.selectedSecondary, planDetail.goodsId, 0);
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
      this.selectedSecondary[id] = value;
    },
  },
});
</script>

<style scoped lang="scss">
.dropdownButton {
  border-radius: 8px;
  border-color: #e6e6e6;
  border-style: solid;
  color: #808080;
  padding: 8px;
  width: 100%;
  height: 60px;
}

.dropdownIcon {
  float: right;
  width: 20px;
  height: 11px;
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
</style>
