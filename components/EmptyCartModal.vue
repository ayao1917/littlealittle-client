<template>
  <div>
    <div v-show="$isModalActive" class="modal" @click.self="onConfirmClick">
      <!-- Modal content -->
      <div class="modalContent">
        <p class="modalText">您的購物車內沒有商品</p>
        <div class="modalFooter">
          <ActionButton
            class="footerButton"
            buttonStyle="containedTeal"
            @onClick="onConfirmClick"
          >
            開始逛逛
          </ActionButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";

export default Vue.extend({
  name: "EmptyCartModal",
  components: {
    ActionButton,
  },
  computed: {
    $isModalActive(): boolean {
      return this.$store.state.modal.activeModal === "EMPTY_CART_CONFIRM";
    },
  },
  methods: {
    onConfirmClick() {
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  @media (min-width: 768px) {
    .modalContent {
      position: relative;
      width: 480px;
      background-color: #fefefe;
      border-radius: 10px;

      .modalText {
        margin: 100px 0;
        text-align: center;
        color: #666666;
        font-size: 21px;
        font-weight: 500;
      }

      .modalFooter {
        width: 100%;
        padding: 12px;
        margin-bottom: 38px;
        display: flex;
        justify-content: center;
        box-sizing: border-box;

        .footerButton {
          width: 48%;
          height: 48px;
        }
      }
    }
  }

  @media (max-width: 767px) {
    .modalContent {
      position: relative;
      width: 328px;
      background-color: #fefefe;
      border-radius: 10px;

      .modalText {
        margin: 12px 0 28px;
        text-align: center;
        color: #666666;
        font-size: 21px;
        font-weight: 500;
      }

      .modalFooter {
        width: 100%;
        padding: 8px;
        display: flex;
        justify-content: center;
        box-sizing: border-box;

        .footerButton {
          width: 49%;
          height: 48px;
        }
      }
    }
  }
}
</style>
