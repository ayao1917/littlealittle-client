<template>
  <div class="categoryContainer">
    <span>熱銷排行TOP10</span>
    <span v-for="category in $categories" :key="category.id">
      {{ category.name }}
    </span>
    <span>部落格</span>
    <span>訂單查詢</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Category } from "~/types/category";

export default Vue.extend({
  name: "MenuBarDesktop",
  computed: {
    $categories(): Category[] {
      return this.$store.getters["category/sortedCategories"];
    },
  },
  methods: {},
  mounted(): void {
    this.$store.dispatch("category/getCategories");
  },
});
</script>

<style scoped lang="scss">
.categoryContainer {
  display: flex;
  align-items: center;
  height: 68px;

  span {
    color: #333333;
    font-size: 23px;
    font-weight: 500;
    letter-spacing: 2.3px;
    line-height: 24.54px;
    cursor: pointer;
  }

  span:not(:last-child) {
    margin-right: 12px;
  }
}
</style>
