<template>
  <div class="fieldRow">
    <div class="countSelect">
      <img
        class="minusIcon"
        src="~assets/images/minus.svg"
        @click="onClickMinus"
      />
      {{ amount }}
      <img
        class="plusIcon"
        src="~assets/images/plus.svg"
        @click="onClickPlus"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ItemSelector",
  props: {
    amount: {
      required: true,
      type: Number,
    },
    max: {
      default: -1,
      required: false,
      type: Number,
    },
  },
  methods: {
    onClickMinus(): void {
      const newValue = this.amount > 0 ? this.amount - 1 : 0;
      this.$emit("onChange", newValue);
    },
    onClickPlus(): void {
      const newValue =
        this.max === -1 || this.amount < this.max
          ? this.amount + 1
          : this.amount;
      this.$emit("onChange", newValue);
    },
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .fieldRow {
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
      width: 100%;

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
  .fieldRow {
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
      width: 100%;

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
</style>
