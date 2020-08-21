<template>
  <div class="addPurchasesRowContainer">
    <div class="addPurchasesRowControl">
      <img
        v-if="page > 0"
        class="arrowIconDesktop"
        src="../assets/images/circleLeft.svg"
        @click="onClickPrev"
      />
      <img
        v-if="page > 0"
        class="arrowIconMobile"
        src="../assets/images/arrowLeft.svg"
        @click="onClickPrev"
      />
    </div>
    <div ref="slider" class="addPurchasesSlider">
      <div ref="innerSlider" class="innerSlider">
        <AddPurchasesCard
          v-for="addPurchase in addPurchases"
          :key="addPurchase.id"
          :addPurchase="addPurchase"
          class="addPurchasesCard"
        ></AddPurchasesCard>
      </div>
    </div>
    <div class="addPurchasesRowControl">
      <img
        v-if="page < $pageSize - 1"
        class="arrowIconDesktop"
        src="../assets/images/circleRight.svg"
        @click="onClickNext"
      />
      <img
        v-if="page < $pageSize - 1"
        class="arrowIconMobile"
        src="../assets/images/arrowRight.svg"
        @click="onClickNext"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import AddPurchasesCard from "~/components/AddPurchasesCard.vue";
import { AddPurchase } from "~/types/salePage";

export default Vue.extend({
  name: "AddPurchasesRowMobile",
  components: {
    AddPurchasesCard,
  },
  props: {
    addPurchases: {
      required: true,
      type: Array as PropType<AddPurchase[]>,
    },
  },
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    $pageSize(): number {
      return Math.ceil(this.addPurchases.length / 2);
    },
  },
  methods: {
    changeSlider(): void {
      const refSlider = this.$refs.slider as HTMLElement;
      const refInnerSlider = this.$refs.innerSlider as HTMLElement;
      refInnerSlider.style.left = `-${this.page *
        (refSlider.clientWidth + 12)}px`;
    },
    onClickNext() {
      this.page = this.page < this.$pageSize - 1 ? this.page + 1 : 0;
      this.changeSlider();
    },
    onClickPrev() {
      this.page = this.page > 0 ? this.page - 1 : this.$pageSize - 1;
      this.changeSlider();
    },
  },
});
</script>

<style scoped lang="scss">
@media (max-width: 767px) {
  .addPurchasesRowContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 20px;

    .addPurchasesRowControl {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 55px;

      .arrowIconDesktop {
        display: none;
      }

      .arrowIconMobile {
        width: 10px;
        height: 21px;
        cursor: pointer;
      }
    }

    .addPurchasesSlider {
      position: relative;
      width: 882px;
      overflow: hidden;

      .innerSlider {
        position: relative;
        left: 0;
        display: flex;
        transition: left 0.5s;

        .addPurchasesCard {
          flex: 0 0 auto;
          padding: 0 6px;
          box-sizing: border-box;
          width: calc(50% + 2px);
        }
      }
    }
  }
}
</style>
