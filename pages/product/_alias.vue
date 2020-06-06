<template>
  <div>
    <div class="container">
      <div
        v-if="$product"
        class="productContent"
        v-html="$product.content"
      ></div>
      <img class="contactIcon" src="~assets/images/contact.png" />
      <div class="buyNowContainer">
        <ActionButton
          buttonStyle="containedTeal"
          class="buyNowButton"
          @onClick="onBuyNowClickClick"
        >
          <span class="buyNowButtonText">立即購買</span>
        </ActionButton>
      </div>
    </div>
    <AddCartModalMobile :product="$product" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";
import AddCartModalMobile from "~/components/AddCartModalMobile.vue";
import { SalePage } from "~/types/salePage";

export default Vue.extend({
  components: {
    ActionButton,
    AddCartModalMobile,
  },
  computed: {
    $product(): SalePage {
      return this.$store.getters["salePage/salePage"];
    },
  },
  methods: {
    onBuyNowClickClick() {
      this.$store.commit("modal/openModal", "ADD_CART");
    },
  },
  mounted(): void {
    const alias = this.$route.params.alias;
    this.$store.dispatch("salePage/getSalePage", { alias });
  },
});
</script>

<style scoped lang="scss">
.container {
  background-color: #fafafa;
  min-height: calc(100vh - 60px);
}

.productContent {
  /deep/ img {
    width: 100%;
  }
}

.contactIcon {
  width: 100%;
}

.buyNowContainer {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 14px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 -4px 10px -6px #808080;
}

.buyNowButton {
  width: 100%;
}

.buyNowButtonText {
  font-size: 21px;
  font-weight: 500;
}
</style>
