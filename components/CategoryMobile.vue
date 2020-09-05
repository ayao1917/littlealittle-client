<template>
  <div>
    <div class="container">
      <ActionButton
        v-for="category in $categories"
        :key="category.id"
        :buttonStyle="
          selected === category.id ? 'containedTeal' : 'containedUrbanGrey'
        "
        class="categoryButton"
        @onClick="
          () => {
            onClickCategory(category);
          }
        "
      >
        {{ category.name }}
      </ActionButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";
import { Category } from "~/types/category";

export default Vue.extend({
  name: "CategoryMobile",
  components: {
    ActionButton,
  },
  data() {
    return {
      selected: (null as unknown) as number,
    };
  },
  computed: {
    $categories(): Category[] {
      return this.$store.getters["category/sortedCategories"];
    },
  },
  mounted(): void {
    const id = this.$route.params.id;
    this.selected = parseInt(id, 10);
    this.$store.dispatch("category/getCategories");
  },
  methods: {
    onClickCategory(category: Category): void {
      this.selected = category.id;
      this.$router.push(`/category/${category.id}`);
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  padding: 4px 2px;
  overflow-x: scroll;
}

.container::-webkit-scrollbar {
  display: none;
}

.categoryButton {
  padding: 2px 23px;
  white-space: nowrap;
}

.categoryButton:not(:last-child) {
  margin-right: 2px;
}
</style>
