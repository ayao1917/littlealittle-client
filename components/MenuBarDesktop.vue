<template>
  <div>
    <div class="menuBarContainer">
      <span>熱銷排行TOP10</span>
      <span
        v-for="category in $categories"
        :key="category.id"
        @click="
          () => {
            onClickCategory(category.id);
          }
        "
      >
        {{ category.name }}
      </span>
      <span>部落格</span>
      <span>訂單查詢</span>
    </div>
    <div class="categoryContainer">
      <!-- TODO: Add subcategory here -->
    </div>
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
  mounted(): void {
    this.$store.dispatch("category/getCategories");
  },
  methods: {
    onClickCategory(categoryId: number): void {
      this.$router.push(`/category/${categoryId}`);
    },
  },
});
</script>

<style scoped lang="scss">
.menuBarContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 12px;
  margin: 0 auto;
  height: 68px;
  border-bottom: 1px solid #e6e6e6;

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

.categoryContainer {
  display: none;
}
</style>
