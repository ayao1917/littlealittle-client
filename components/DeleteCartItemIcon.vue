<template>
  <div>
    <img
      class="closeIcon"
      src="~assets/images/close.svg"
      @click="
        () => {
          onDeleteClick();
        }
      "
    />
    <DeletePlanConfirmModal
      type="Default"
      @onConfirm="onDeleteProduct"
    ></DeletePlanConfirmModal>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import DeletePlanConfirmModal from "~/components/DeletePlanConfirmModal.vue";

export default Vue.extend({
  name: "DeleteCartItemIcon",
  components: {
    DeletePlanConfirmModal,
  },
  props: {
    itemId: {
      required: true,
      type: Number as PropType<number>,
    },
  },
  methods: {
    onDeleteClick(): void {
      this.$store.commit("modal/openModal", "DELETE_PLAN_CONFIRM");
    },
    onDeleteProduct(): void {
      if (this.itemId) {
        this.$store.commit("cart/dropCartProduct", this.itemId);
        this.$store.commit("cart/clearAddPurchase");
        this.$store.commit("modal/closeModal");
      }
    },
  },
});
</script>

<style scoped lang="scss">
.closeIcon {
  width: 24px;
  height: 24px;
}
</style>
