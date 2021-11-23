<template>
  <div>
    <div v-show="$isModalActive" class="modal" @click.self="onCloseModal">
      <!-- Modal content -->
      <div class="modalContent">
        <div class="contentHeader">
          <img class="pullBarIcon" src="~assets/images/pullBar.svg" />
        </div>
        <p class="itemTitleRow">{{ $addPurchase.name }}</p>
        <img class="itemImage" :src="$addPurchase.salePicUrl" />
        <div class="modalFooter">
          <ActionButton
            class="footerButton"
            buttonStyle="outlineTeal"
            @onClick="addToCart"
          >
            放入購物車
          </ActionButton>
          <ItemAmountField :amount="itemAmount" @onChange="onUpdateAmount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";
import ItemAmountField from "~/components/ItemAmountField.vue";
import { AddPurchase } from "~/types/salePage";
import { addToCartAnimate } from "~/utils/cart";

export default Vue.extend({
  name: "AddCartModalMobile",
  components: {
    ActionButton,
    ItemAmountField,
  },
  data() {
    return {
      itemAmount: 0,
    };
  },
  computed: {
    $addPurchase(): AddPurchase {
      return this.$store.state.addPurchase.selectedItem || {};
    },
    $isModalActive(): boolean {
      return this.$store.state.modal.activeModal === "ADD_PURCHASE";
    },
  },
  methods: {
    addToCart(event: MouseEvent): void {
      const { picUrl } = this.$addPurchase;
      const { clientX, clientY } = event;
      addToCartAnimate(picUrl, { x: clientX, y: clientY }, () => {
        this.$store.commit("cart/pushAddPurchase", {
          addPurchase: this.$addPurchase,
          amount: this.itemAmount,
        });
        this.$store.commit("modal/closeModal");
      });
    },
    onCloseModal() {
      this.$store.commit("modal/closeModal");
    },
    onUpdateAmount(amount: number) {
      this.itemAmount = amount;
    },
  },
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  .modalContent {
    position: absolute;
    background-color: #fefefe;
    width: 100%;
    bottom: 0;
    border-radius: 10px 10px 0 0;

    .contentHeader {
      display: flex;
      justify-content: center;

      .pullBarIcon {
        margin: 10px 0;
        width: 52px;
        height: 5px;
      }
    }

    .itemTitleRow {
      width: 100%;
      padding: 12px 0;
      text-align: center;
      font-size: 24px;
    }

    .itemImage {
      width: 100%;
      margin-bottom: 24px;
    }

    .planList {
      padding: 0 8px 10px;

      .planDropdown {
        width: 100%;
      }

      .planDropdown:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }

  .modalFooter {
    display: flex;
    padding: 0 8px 12px;

    .footerButton {
      width: calc(50% - 4px);
      padding: 8px;
    }

    .footerButton:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
