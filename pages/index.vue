<template>
  <div class="container">
    <Header />
    <MobileView>
      <CategoryMobile />
    </MobileView>
    <Slider :banners="$banners" />
    <div class="headerContainer">
      <span class="topTenHeader">熱銷排行TOP10</span>
    </div>
    <div class="salePageRow">
      <SalePageCard
        v-for="salePage in $salePages"
        :key="salePage.id"
        :salePage="salePage"
        class="salePageCard"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CategoryMobile from "~/components/CategoryMobile.vue";
import Header from "~/components/Header.vue";
import MobileView from "~/components/MobileView.vue";
import SalePageCard from "~/components/SalePageCard.vue";
import Slider from "~/components/Slider.vue";
import { Banner } from "~/types/banner";
import { SalePage } from "~/types/salePage";

export default Vue.extend({
  components: {
    CategoryMobile,
    Header,
    MobileView,
    SalePageCard,
    Slider,
  },
  computed: {
    $banners(): Banner[] {
      return this.$store.getters["banner/sortedBanners"];
    },
    $salePages(): SalePage[] {
      return this.$store.getters["salePage/salePages"];
    },
  },
  mounted(): void {
    this.$store.dispatch("banner/getBanners");
    this.$store.dispatch("salePage/getSalePages", { random: 10 });
  },
});
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #fafafa;
}

.headerContainer {
  display: flex;
  justify-content: center;
  padding: 14px 0;
}

.topTenHeader {
  color: #333333;
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 2.1px;
  padding: 4px 0;
  border-bottom: 1px solid #ec8f26;
}

.salePageRow {
  display: flex;
}

.salePageCard {
  width: 50%;
}
</style>
