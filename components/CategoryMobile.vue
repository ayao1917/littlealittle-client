<template>
  <div>
    <div class="container">
      <Button
        v-for="category in $categories"
        buttonStyle="containedTeal"
        class="categoryButton"
        :key="category.id"
        :onClick="
          () => {
            onClickCategory(category);
          }
        "
      >
        {{ category.name }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Button from "~/cds/Button.vue";
import { Category } from "~/types/category";

export default Vue.extend({
  name: "CategoryMobile",
  components: {
    Button,
  },
  computed: {
    $categories(): Category[] {
      return this.$store.state.category.categories;
    },
  },
  methods: {
    onClickCategory(category: Category): void {
      console.log("category", category);
    },
  },
  mounted(): void {
    this.$store.dispatch("category/getCategories");
  },
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  padding: 4px 2px;
}

.categoryButton {
  padding: 2px 23px;
}
</style>
