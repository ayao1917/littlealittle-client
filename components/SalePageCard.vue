<template>
  <div>
    <div class="container">
      <img :src="salePage.picUrl" class="productImage" @click="onClickCard" />
      <div class="productContent">
        <p v-if="salePage.name" class="productTitle">{{ salePage.name }}</p>
        <p v-if="salePage.metaDescription" class="productDescription">
          {{ salePage.metaDescription }}
        </p>
        <div class="discount">
          <span class="discountAfter">{{ this.$discount }}</span>
          <span class="discountBefore">{{ this.$price }}</span>
        </div>
      </div>
      <div class="footer">
        <!--
        <img class="iconLike" src="~assets/images/likeEmpty.svg" />
        -->
        <img
          class="iconCart"
          src="~assets/images/cart.svg"
          @click="onOpenCartModalClick"
        />
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
  computed: {
    $discount(): string {
      if (!this.salePage.discount) {
        return "";
      }

      if (!this.salePage.currency || !this.salePage.currency.title) {
        return `${this.salePage.discount}`;
      }

      return `${this.salePage.currency.title} ${this.salePage.discount}`;
    },
    $price(): string {
      if (!this.salePage.price) {
        return "";
      }

      if (!this.salePage.currency || !this.salePage.currency.title) {
        return `${this.salePage.price}`;
      }

      return `${this.salePage.currency.title} ${this.salePage.price}`;
    },
  },
  methods: {
    onClickCard(): void {
      this.$router.push(`/product/${this.salePage.alias}`);
    },
    onOpenCartModalClick() {
      this.$router.push(`/product/${this.salePage.alias}`);
      this.$store.commit("modal/openModal", "ADD_CART");
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  padding: 8px;
  background-color: #ffffff;
  border-radius: 8px;

  .productImage {
    width: 100%;
    cursor: pointer;
  }

  .productContent {
    padding: 0 8px;

    .productTitle {
      color: #000000;
      font-size: 14px;
      font-weight: 700;
      line-height: 145%;
      text-overflow: ellipsis;
      margin-top: 8px;
    }

    .productDescription {
      color: #808080;
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      display: inline-block;
      width: 100%;
      margin-top: 8px;
    }

    .discount {
      display: flex;
      align-items: center;
      margin-top: 8px;

      .discountAfter {
        color: #ba6562;
        font-size: 14px;
        font-weight: 700;
        line-height: 145%;
        margin-right: 8px;
      }

      .discountBefore {
        color: #b3b3b3;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        text-decoration: line-through;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    margin-top: 12px;
    border-top: solid 1px #e6e6e6;

    .iconLike {
      width: 31px;
      height: 28px;
    }

    .iconCart {
      width: 24px;
      height: 24px;
    }
  }

  @media (min-width: 768px) {
    .footer {
      display: none;
    }
  }
}
</style>
