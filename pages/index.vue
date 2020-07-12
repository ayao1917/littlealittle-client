<template>
  <div class="container">
    <MenuBarDesktop class="menuBar"></MenuBarDesktop>
    <CategoryMobile class="categoryMobile"></CategoryMobile>
    <Slider class="slider" :banners="$banners"></Slider>
    <div class="headerContainer">
      <span class="topTenHeader">熱銷排行TOP10</span>
    </div>
    <SalePageRow :salePages="$salePages"></SalePageRow>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CategoryMobile from "~/components/CategoryMobile.vue";
import MenuBarDesktop from "~/components/MenuBarDesktop.vue";
import SalePageRow from "~/components/SalePageRow.vue";
import Slider from "~/components/Slider.vue";
import { Banner } from "~/types/banner";
import { SalePage } from "~/types/salePage";

export default Vue.extend({
  components: {
    CategoryMobile,
    MenuBarDesktop,
    SalePageRow,
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

  @media (min-width: 768px) {
    .categoryMobile {
      display: none;
    }
  }

  @media (max-width: 767px) {
    .menuBar {
      display: none;
    }
  }

  .menuBar {
    padding: 12px;
    margin: 0 auto;
  }

  .slider {
    width: 100%;
    height: 250px;
  }

  .headerContainer {
    display: flex;
    justify-content: center;
    padding: 14px 0;

    .topTenHeader {
      color: #333333;
      font-size: 21px;
      font-weight: 600;
      letter-spacing: 2.1px;
      padding: 4px 0;
      border-bottom: 1px solid #ec8f26;
    }
  }
}
</style>
