<template>
  <div>
    <MenuBarDesktop class="menuBar" />
    <CategoryMobile class="categoryMobile" />
    <div class="breadcrumb">
      <NuxtLink to="/">首頁</NuxtLink>
      <div class="breadcrumbLevel">></div>
      <NuxtLink v-if="$category" :to="`/category/${$category.id}`">
        {{ $category.name }}
      </NuxtLink>
    </div>
    <div class="salePageRowDesktop">
      <SalePageCard
        v-for="salePage in $salePages"
        :key="salePage.id"
        :salePage="salePage"
        class="salePageCard"
      />
    </div>
    <div class="salePageRowMobile">
      <div class="salePageCardRow">
        <SalePageCard
          v-for="salePage in $event"
          :key="salePage.id"
          :salePage="salePage"
        />
      </div>
      <div class="salePageCardRow">
        <SalePageCard
          v-for="salePage in $odd"
          :key="salePage.id"
          :salePage="salePage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CategoryMobile from "~/components/CategoryMobile.vue";
import MenuBarDesktop from "~/components/MenuBarDesktop.vue";
import SalePageCard from "~/components/SalePageCard.vue";
import { Category } from "~/types/category";
import { SalePage } from "~/types/salePage";

export default Vue.extend({
  name: "Category",
  components: {
    CategoryMobile,
    MenuBarDesktop,
    SalePageCard,
  },
  computed: {
    $category(): Category {
      return this.$store.getters["category/category"];
    },
    $event(): SalePage[] {
      return this.$salePages.filter((_, i: number) => i % 2 === 0);
    },
    $odd(): SalePage[] {
      return this.$salePages.filter((_, i: number) => i % 2 !== 0);
    },
    $salePages(): SalePage[] {
      return this.$store.getters["salePage/salePages"];
    },
  },
  watch: {
    $category(newCategory) {
      if (newCategory) {
        this.$store.dispatch("salePage/getSalePages", {
          category: newCategory.alias,
        });
      }
    },
  },
  mounted(): void {
    const id = this.$route.params.id;
    this.$store.dispatch("category/getCategory", { categoryId: id });
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .categoryMobile {
    display: none;
  }

  .breadcrumb {
    display: flex;
    max-width: 768px;
    border-bottom: 1px solid #e6e6e6;
    padding: 27px 0 26px;
    margin: 0 auto;

    a {
      color: #333333;
      text-decoration: none;
      font-size: 23px;
      font-weight: 600;
    }

    .breadcrumbLevel {
      margin: 0 8px;
    }
  }

  .salePageRowDesktop {
    display: flex;
    flex-wrap: wrap;
    max-width: 768px;
    padding: 60px 0;
    margin: 0 auto;

    .salePageCard {
      flex: 0 0 auto;
      width: 192px;
      padding: 10px 0;
    }
  }

  .salePageRowMobile {
    display: none;
  }
}

@media (max-width: 767px) {
  .menuBar {
    display: none;
  }

  .breadcrumb {
    display: none;
  }

  .salePageRowDesktop {
    display: none;
  }

  .salePageRowMobile {
    display: flex;

    .salePageCardRow {
      display: flex;
      flex-direction: column;
      width: 50%;
    }
  }
}
</style>
