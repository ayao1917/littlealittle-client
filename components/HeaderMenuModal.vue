<template>
  <div>
    <div v-show="$isModalActive" class="modal" @click="onCloseModal">
      <!-- Modal content -->
      <div class="modalContent">
        <div class="modalHeader">
          <img
            class="closeIcon"
            src="~assets/images/close.svg"
            @click="onCloseModal"
          />
        </div>
        <div
          v-for="menuItem in menuItems"
          :key="menuItem.title"
          class="modalRow"
        >
          {{ menuItem.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HeaderMenuModal",
  data() {
    return {
      menuItems: [
        {
          title: "關於我們",
          url: "",
        },
        {
          title: "Q&A",
          url: "",
        },
        {
          title: "部落格",
          url: "",
        },
      ],
    };
  },
  computed: {
    $isModalActive(): boolean {
      return this.$store.state.modal.activeModal === "HEADER_MENU";
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
/* The Modal (background) */
.modal {
  // display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  // padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  /* Modal Content */
  .modalContent {
    position: absolute;
    background-color: #fefefe;
    // border: 1px solid #888;
    width: 328px;
    height: 100%;

    .modalHeader {
      display: flex;
      justify-content: flex-end;
      padding: 20px;
      box-shadow: 0 2px #e6e6e6;

      .closeIcon {
        width: 18px;
        height: 17px;
      }
    }

    .modalRow {
      padding: 20px;
      box-shadow: 0 2px #e6e6e6;
    }
  }
}
</style>
