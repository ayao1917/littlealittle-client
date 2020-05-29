<template>
  <div>
    <div v-if="$product" class="productContent" v-html="$product.content"></div>
    <img class="contactIcon" src="~assets/images/contact.png" />
    <div class="buyNowContainer">
      <ActionButton
        buttonStyle="containedTeal"
        class="buyNowButton"
        :onClick="onBuyNowClickClick"
      >
        <span class="buyNowButtonText">立即購買</span>
      </ActionButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";
import { SalePage } from "~/types/salePage";

export default Vue.extend({
  components: {
    ActionButton,
  },
  computed: {
    $product(): SalePage {
      return this.$store.getters["salePage/salePage"];
    },
  },
  methods: {
    onBuyNowClickClick() {},
  },
  mounted(): void {
    const alias = this.$route.params.alias;
    this.$store.dispatch("salePage/getSalePage", { alias });
  },
});
</script>

<style scoped lang="scss">
.productContent {
  /deep/ img {
    width: 100%;
  }
}

.contactIcon {
  width: 100%;
}

.buyNowContainer {
  padding: 8px;
}

.buyNowButton {
  width: 100%;
}

.buyNowButtonText {
  font-size: 21px;
  font-weight: 500;
}
</style>
