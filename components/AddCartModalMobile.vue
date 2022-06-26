<template>
  <div>
    <div v-show="$isModalActive" class="modal" @click.self="onCloseModal">
      <!-- Modal content -->
      <div class="modalContent">
        <div class="contentHeader">
          <img class="pullBarIcon" src="~assets/images/pullBar.svg" />
        </div>
        <div v-if="$selectedPlans.length > 0" class="planList">
          <PlanDropdown
            v-for="(selectedPlan, i) in $selectedPlans"
            :key="i"
            class="planDropdown"
            :plan="selectedPlan.plan"
            :selectedAccessory="selectedPlan.selectedAccessory"
            :selectedPrimary="selectedPlan.selectedPrimary"
            @onUpdatePlan="onUpdatePlan"
          ></PlanDropdown>
        </div>
        <div class="modalFooter">
          <ActionButton
            class="footerButton"
            buttonStyle="outlineTeal"
            @onClick="onAddToCartClick"
          >
            <span class="buttonText">放入購物車</span>
          </ActionButton>
          <ActionButton
            class="footerButton"
            buttonStyle="containedTeal"
            @onClick="onBuyNowClick"
          >
            <span class="buttonText">立即結帳</span>
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
import { SelectedPlan } from "~/types/cart";
import { SalePage } from "~/types/salePage";
import { addToCartAnimate } from "~/utils/cart";

export default Vue.extend({
  name: "AddCartModalMobile",
  components: {
    ActionButton,
    PlanDropdown,
  },
  props: {
    product: {
      required: true,
      type: Object as PropType<SalePage>,
    },
    selectedPlans: {
      required: true,
      type: Object as PropType<{
        [key: string]: SelectedPlan;
      }>,
    },
  },
  computed: {
    $isModalActive(): boolean {
      return this.$store.state.modal.activeModal === "ADD_CART";
    },
    $selectedPlans(): SelectedPlan[] {
      return Object.keys(this.selectedPlans).map(
        (key) => this.selectedPlans[key],
      );
    },
  },
  methods: {
    onAddToCartClick(event: MouseEvent) {
      const { picUrl } = this.product;
      const { clientX, clientY } = event;
      addToCartAnimate(picUrl, { x: clientX, y: clientY }, () => {
        this.$emit("onAddToCart");
        this.$store.commit("modal/closeModal");
      });
    },
    onBuyNowClick(event: MouseEvent) {
      const { picUrl } = this.product;
      const { clientX, clientY } = event;
      addToCartAnimate(picUrl, { x: clientX, y: clientY }, () => {
        this.$emit("onAddToCart");
        this.$store.commit("modal/closeModal");
        this.$router.push("/cart");
      });
    },
    onCloseModal() {
      this.$store.commit("modal/closeModal");
    },
    onUpdatePlan(data: { selectedPlan: SelectedPlan }) {
      this.$emit("onUpdatePlan", data);
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
    padding: 0 8px 12px;

    .footerButton {
      width: calc(50% - 4px);
      padding: 8px;

      .buttonText {
        font-size: 25px;
      }
    }

    .footerButton:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
