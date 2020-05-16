<template>
  <div>
    <div class="container">
      <div class="iconBox">
        <Button :onClick="onClickMenu">
          <img class="menuIcon" src="~assets/images/menu.svg" />
        </Button>
      </div>
      <div class="iconBox">
        <img class="logoIcon" src="~assets/images/logo.png" />
      </div>
      <div class="rightContainer">
        <div class="iconBox">
          <Button :onClick="onClickCart">
            <img class="cartIcon" src="~assets/images/cart.svg" />
          </Button>
        </div>
        <div class="iconBox">
          <Button :onClick="onClickUser">
            <img class="userIcon" src="~assets/images/user.svg" />
          </Button>
        </div>
      </div>
    </div>
    <HeaderMenuModal />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Button from "~/cds/Button.vue";
import HeaderMenuModal from "~/components/HeaderMenuModal.vue";

export default Vue.extend({
  name: "Header",
  components: {
    Button,
    HeaderMenuModal,
  },
  methods: {
    onClickCart() {},
    onClickMenu() {
      this.$store.commit("modal/openModal", "HEADER_MENU");
    },
    onClickUser() {},
  },
});
</script>

<style scoped lang="scss">
.container {
  height: 60px;
  padding: 0 20px;
  background-color: #ffffff;
  box-shadow: 0 2px #e6e6e6;
  display: flex;
  justify-content: space-between;

  .iconBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .rightContainer {
    display: flex;
  }

  .menuIcon {
    width: 24px;
    height: 19px;
  }

  .logoIcon {
    width: 102px;
    height: 31px;
  }

  .cartIcon {
    width: 33px;
    height: 29px;
  }

  .userIcon {
    width: 24px;
    height: 25px;
  }
}
</style>
