<template>
  <div class="salePageContainer">
    <div class="desktopView">
      <SalePageCard
        v-for="salePage in salePages"
        :key="salePage.id"
        :salePage="salePage"
        class="salePageCard"
      ></SalePageCard>
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
  computed: {
    $event(): SalePage[] {
      return this.salePages.filter((_, i: number) => i % 2 === 0);
    },
    $odd(): SalePage[] {
      return this.salePages.filter((_, i: number) => i % 2 !== 0);
    },
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .salePageContainer {
    display: flex;
    max-width: 992px;
    margin: 0 auto;
    padding-bottom: 20px;

    .desktopView {
      .salePageCard:not(:last-child) {
        margin-right: 12px;
      }
    }
    .salePageCard {
      width: 232px;
    }

    .mobileView {
      display: none;
    }
  }
}

@media (max-width: 767px) {
  .salePageContainer {
    .desktopView {
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
}
</style>
