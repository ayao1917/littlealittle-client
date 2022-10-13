<template>
  <div class="container">
    <MenuBarDesktop class="menuBar"></MenuBarDesktop>
    <CategoryMobile class="categoryMobile"></CategoryMobile>
    <Slider class="slider" :banners="$banners"></Slider>
    <div class="headerContainer">
      <span class="topTenHeader">熱銷排行TOP10</span>
    </div>
    <SalePageRow :salePages="$topTen"></SalePageRow>
    <div class="extra">
      <div class="headerContainer">
        <span class="topTenHeader">新品上架</span>
      </div>
      <SalePageRow :salePages="$newItems"></SalePageRow>
      <div class="headerContainer">
        <span class="topTenHeader">更多優惠</span>
      </div>
      <SalePageRow :salePages="$recentPriceOff"></SalePageRow>
    </div>
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
    $newItems(): SalePage[] {
      return this.$store.getters["salePage/newItems"];
    },
    $recentPriceOff(): SalePage[] {
      return this.$store.getters["salePage/recentPriceOff"];
    },
    $topTen(): SalePage[] {
      return this.$store.getters["salePage/topTen"];
    },
  },
  mounted(): void {
    this.$store.dispatch("banner/getBanners");
    this.$store.dispatch("salePage/getSalePages", {
      random: 10,
      type: "NewItems",
    });
    this.$store.dispatch("salePage/getSalePages", {
      random: 10,
      type: "RecentPriceOff",
    });
    this.$store.dispatch("salePage/getSalePages", {
      random: 10,
      type: "TopTen",
    });
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

    .slider {
      width: 100%;
      height: 573px;
    }
  }

  @media (max-width: 767px) {
    .menuBar {
      display: none;
    }

    .extra {
      display: none;
    }

    .slider {
      width: 100%;
      height: 238px;
    }
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
