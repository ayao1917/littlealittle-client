<template>
  <div>
    <div v-show="$isModalActive" class="modal" @click.self="onCloseModal">
      <!-- Modal content -->
      <div class="modalContent">
        <div class="contentHeader">
          <img class="pullBarIcon" src="~assets/images/pullBar.svg" />
        </div>
        <div class="planList" v-if="$plans.length > 0">
          <PlanDropdown
            class="planDropdown"
            v-for="(plan, i) in $plans"
            :key="i"
            :plan="plan"
          />
        </div>
        <div class="modalFooter">
          <ActionButton class="footerButton" buttonStyle="outlineTeal">
            放入購物車
          </ActionButton>
          <ActionButton class="footerButton" buttonStyle="containedTeal">
            立即結帳
          </ActionButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ActionButton from "~/components/ActionButton.vue";
import PlanDropdown from "~/components/PlanDropdown.vue";
import { Plan } from "~/types/plan";
import { SalePage } from "~/types/salePage";

export default Vue.extend({
  name: "AddCartModalMobile",
  components: {
    ActionButton,
    PlanDropdown,
  },
  props: {
    product: {
      default: null,
      required: false,
      type: Object as PropType<SalePage>,
    },
  },
  computed: {
    $isModalActive(): boolean {
      return this.$store.state.modal.activeModal === "ADD_CART";
    },
    $plans(): Plan[] {
      return this.product ? this.product.plans : [];
    },
  },
  methods: {
    onCloseModal() {
      this.$store.commit("modal/closeModal");
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
    padding: 0 8px;

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
