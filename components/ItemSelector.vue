<template>
  <div class="planListDetailRow">
    <span>{{ planListDetail.goods.name }}</span>
    <div class="countSelect">
      <img
        class="minusIcon"
        src="~assets/images/minus.svg"
        @click="onClickMinus"
      />
      {{ count }}
      <img
        class="plusIcon"
        src="~assets/images/plus.svg"
        @click="onClickPlus"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { PlanListDetail } from "~/types/plan";

export default Vue.extend({
  name: "ItemSelector",
  props: {
    count: {
      required: true,
      type: Number,
    },
    max: {
      default: -1,
      required: false,
      type: Number,
    },
    planListDetail: {
      required: true,
      type: Object as PropType<PlanListDetail>,
    },
  },
  methods: {
    onClickMinus(): void {
      const newValue = this.count > 0 ? this.count - 1 : 0;
      this.$emit("onChangeCount", this.planListDetail.goodsId, newValue);
    },
    onClickPlus(): void {
      const newValue =
        this.max === -1 || this.count < this.max ? this.count + 1 : this.count;
      this.$emit("onChangeCount", this.planListDetail.goodsId, newValue);
    },
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
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
        width: 17px;
        height: 3px;
        cursor: pointer;
        margin-right: 12px;
      }

      .plusIcon {
        width: 17px;
        height: 18px;
        cursor: pointer;
        margin-left: 12px;
      }
    }
  }
}

@media (max-width: 767px) {
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
        width: 17px;
        height: 3px;
        cursor: pointer;
      }

      .plusIcon {
        width: 17px;
        height: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>
