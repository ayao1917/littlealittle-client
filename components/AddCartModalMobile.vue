<template>
  <div>
    <div v-show="$isModalActive" class="modal" @click.self="onCloseModal">
      <!-- Modal content -->
      <div class="modalContent">
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
        <div v-if="totalFee > 0" class="totalFeeContainer">
          <span calss="totalFeeText">合計</span>
          <span class="totalFeeAmount">{{ `${$currency} ${totalFee}` }}</span>
        </div>
        <div class="modalFooter">
          <ActionButton
            class="footerButton"
            buttonStyle="outlineTeal"
            :disabled="totalFee === 0"
            @onClick="onAddToCartClick"
          >
            <span class="buttonText">放入購物車</span>
          </ActionButton>
          <ActionButton
            class="footerButton"
            buttonStyle="containedTeal"
            :disabled="totalFee === 0"
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
import {
  addToCartAnimate,
  totalAccessoryFee,
  totalPrimaryFee,
} from "~/utils/cart";

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
  data() {
    return {
      totalFee: 0,
    };
  },
  computed: {
    $currency(): string {
      const product = this.$store.getters["salePage/salePage"];
      if (product) {
        return product.currency.isoCode;
      } else {
        return "$";
      }
    },
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
      const { selectedPlan } = data;
      const accessoryFee = totalAccessoryFee(
        selectedPlan.plan,
        selectedPlan.selectedPrimary,
        selectedPlan.selectedAccessory,
      );
      const primaryFee = totalPrimaryFee(
        selectedPlan.plan,
        selectedPlan.selectedPrimary,
      );
      this.totalFee = accessoryFee + primaryFee;
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
    border-radius: 16px 16px 0 0;

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
      padding: 28px 0px 0px;

      .planDropdown {
        width: 100%;
        margin-bottom: 8px;
      }
    }

    .totalFeeContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 28px;

      .totalFeeText {
        font-weight: 400;
        font-size: 14px;
        color: #000000;
      }

      .totalFeeAmount {
        font-weight: 700;
        font-size: 14px;
        color: #ba6562;
      }
    }
  }

  .modalFooter {
    display: flex;
    padding: 0 8px 12px;

    .footerButton {
      width: calc(50% - 4px);
      padding: 14px 0;

      .buttonText {
        font-weight: 700;
        font-size: 14px;
      }
    }

    .footerButton:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
