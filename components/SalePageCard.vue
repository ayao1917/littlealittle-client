<template>
  <div>
    <div class="container">
      <img :src="salePage.picUrl" class="productImage" @click="onClickCard" />
      <p class="productTitle">{{ salePage.name }}</p>
      <p>{{ salePage.metaDescription }}</p>
      <div class="footer">
        <img class="iconLike" src="~assets/images/likeEmpty.svg" />
        <img class="iconCart" src="~assets/images/cart.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { SalePage } from "~/types/salePage";

export default Vue.extend({
  name: "ProductCard",
  props: {
    salePage: {
      required: true,
      type: Object as PropType<SalePage>,
    },
  },
  methods: {
    onClickCard(): void {
      this.$router.push(`/product/${this.salePage.alias}`);
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  margin: 4px;
  background-color: #ffffff;
}

.productImage {
  width: 100%;
}

.productTitle {
  color: #333333;
  font-size: 19px;
  font-weight: 500;
  text-overflow: ellipsis;
  margin: 4px 2px;
}

.productDescription {
  color: #808080;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  display: inline-block;
  width: 100%;
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  margin-top: 12px;
  border-top: solid 1px #e6e6e6;
}

.iconLike {
  width: 31px;
  height: 28px;
}

.iconCart {
  width: 37px;
  height: 32px;
}
</style>
