<template>
  <div class="salePageContainer">
    <SalePageCard
      v-for="salePage in salePages"
      :key="salePage.id"
      :salePage="salePage"
      class="salePageCard"
    />
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
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .salePageContainer {
    display: flex;
    max-width: 992px;
    margin: 0 auto;
    padding-bottom: 20px;

    .salePageCard {
      width: 232px;
    }

    .salePageCard:not(:last-child) {
      margin-right: 12px;
    }
  }
}

@media (max-width: 767px) {
  .salePageContainer {
    display: flex;

    .salePageCard {
      width: 50%;
    }
  }
}
</style>
