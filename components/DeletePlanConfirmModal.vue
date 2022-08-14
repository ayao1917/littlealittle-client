<template>
  <div>
    <div v-show="$isModalActive" class="modal" @click.self="onCloseModal">
      <!-- Modal content -->
      <div class="modalContent">
        <div class="iconContainer">
          <img class="trashIcon" src="~assets/images/trash.svg" />
        </div>
        <p class="modalText">{{ modalContent[type] }}</p>
        <div class="modalFooter">
          <ActionButton
            class="footerButton"
            buttonStyle="containedUrbanGrey"
            @onClick="onCloseModal"
          >
            取消
          </ActionButton>
          <ActionButton
            class="footerButton"
            buttonStyle="containedUrbanGrey"
            @onClick="onConfirmClick"
          >
            確定
          </ActionButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ActionButton from "~/components/ActionButton.vue";

export default Vue.extend({
  name: "DeletePlanConfirmModal",
  components: {
    ActionButton,
  },
  props: {
    type: {
      required: true,
      type: String as PropType<"Default" | "AddPurchase" | "Mixed">,
    },
  },
  data() {
    return {
      modalContent: {
        AddPurchase: "您確定要移除加購商品？",
        Default: "您確定要移除？",
        Mixed: "移除主商品，加購商品也會移除，您確定要移除？",
      },
    };
  },
  computed: {
    $isModalActive(): boolean {
      return this.$store.state.modal.activeModal === "DELETE_PLAN_CONFIRM";
    },
  },
  methods: {
    onCloseModal() {
      this.$store.commit("modal/closeModal");
    },
    onConfirmClick() {
      this.$emit("onConfirm");
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
      height: 320px;
      background-color: #fefefe;
      border-radius: 10px;

      .iconContainer {
        display: flex;
        justify-content: center;
        margin-top: 68px;

        .trashIcon {
          width: 96px;
          height: 96px;
        }
      }

      .modalText {
        margin: 12px 0 40px;
        text-align: center;
      }

      .modalFooter {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 12px;
        display: flex;
        justify-content: space-between;
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
      width: 358px;
      padding: 32px 16px;
      background-color: #fefefe;
      border-radius: 4px;

      .iconContainer {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;

        .trashIcon {
          width: 96px;
          height: 96px;
        }
      }

      .modalText {
        padding: 16px 0 28px;
        margin-bottom: 16px;
        text-align: center;
      }

      .modalFooter {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 8px 16px 16px;
        display: flex;
        justify-content: space-between;
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
