<template>
  <div>
    <div class="salePageContainer">
      <div class="salePageRowControl">
        <img
          v-if="page > 0"
          class="arrowIcon"
          src="../assets/images/circleLeft.svg"
          @click="onClickPrev"
        />
      </div>
      <div ref="slider" class="salePageSlider">
        <div ref="innerSlider" class="innerSlider">
          <SalePageCard
            v-for="salePage in salePages"
            :key="salePage.id"
            :salePage="salePage"
            class="salePageCard"
          ></SalePageCard>
        </div>
      </div>
      <div class="salePageRowControl">
        <img
          v-if="page < ($pageSize - 1)"
          class="arrowIcon"
          src="../assets/images/circleRight.svg"
          @click="onClickNext"
        />
      </div>
    </div>
    <div class="mobileView">
      <div class="salePageCardRow">
        <SalePageCard
          v-for="salePage in $event"
          :key="salePage.id"
          :salePage="salePage"
        ></SalePageCard>
      </div>
      <div class="salePageCardRow">
        <SalePageCard
          v-for="salePage in $odd"
          :key="salePage.id"
          :salePage="salePage"
        ></SalePageCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import SalePageCard from "~/components/SalePageCard.vue";
import { SalePage } from "~/types/salePage";

export default Vue.extend({
  name: "SalePageRow",
  components: {
    SalePageCard,
  },
  props: {
    salePages: {
      required: true,
      type: Array as PropType<SalePage[]>,
    },
  },
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    $event(): SalePage[] {
      return this.salePages.filter((_, i: number) => i % 2 === 0);
    },
    $odd(): SalePage[] {
      return this.salePages.filter((_, i: number) => i % 2 !== 0);
    },
    $pageSize(): number {
      return Math.ceil(this.salePages.length / 4);
    },
  },
  methods: {
    changeSlider(): void {
      const refSlider = this.$refs.slider as HTMLElement;
      const refInnerSlider = this.$refs.innerSlider as HTMLElement;
      refInnerSlider.style.left = `-${this.page * refSlider.clientWidth}px`;
    },
    onClickNext() {
      this.page = this.page < this.$pageSize - 1 ? this.page + 1 : 0;
      console.log(this.page);
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
@media (min-width: 768px) {
  .salePageContainer {
    display: flex;
    justify-content: space-between;
    max-width: 992px;
    margin: 0 auto;
    padding-bottom: 20px;

    .salePageRowControl {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 55px;

      .arrowIcon {
        width: 55px;
        height: 55px;
        cursor: pointer;
      }
    }

    .salePageSlider {
      position: relative;
      width: 882px;
      overflow: hidden;

      .innerSlider {
        position: relative;
        left: 0;
        display: flex;
        transition: left 0.5s;

        .salePageCard {
          flex: 0 0 auto;
          width: 208px;
        }

        .salePageCard:not(:last-child) {
          margin-right: 12px;
        }
      }
    }
  }
  .mobileView {
    display: none;
  }
}

@media (max-width: 767px) {
  .salePageContainer {
    display: none;
  }

  .mobileView {
    display: flex;

    .salePageCardRow {
      display: flex;
      flex-direction: column;
      width: 50%;
    }
  }
}
</style>
