<template>
  <div>
    <div class="headerContainer">
      <div class="iconBox sideContainer">
        <img
          class="menuIcon"
          src="~assets/images/menu.svg"
          @click="onClickMenu"
        />
      </div>
      <div class="iconBox" @click="onClickLogo">
        <IconLogo class="logoIcon" size="s"></IconLogo>
      </div>
      <div class="rightContainer sideContainer">
        <div class="iconBox">
          <ActionButton class="cartButton" @onClick="onClickCart">
            <img class="headerCartIcon" src="~assets/images/cart.svg" />
            <div class="cartCount">{{ $cartCount }}</div>
          </ActionButton>
        </div>
        <div class="iconBox">
          <ActionButton @onClick="onClickUser">
            <img class="userIcon" src="~assets/images/user.svg" />
          </ActionButton>
        </div>
      </div>
    </div>
    <HeaderMenuModal></HeaderMenuModal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";
import HeaderMenuModal from "~/components/HeaderMenuModal.vue";
import IconLogo from "~/components/IconLogo.vue";

export default Vue.extend({
  name: "Header",
  components: {
    ActionButton,
    HeaderMenuModal,
    IconLogo,
  },
  computed: {
    $cartCount(): number {
      return this.$store.getters["cart/planCount"];
    },
  },
  methods: {
    onClickCart() {
      this.$router.push("/cart");
    },
    onClickLogo() {
      this.$router.push("/");
    },
    onClickMenu() {
      this.$store.commit("modal/openModal", "HEADER_MENU");
    },
    onClickUser() {},
  },
});
</script>

<style scoped lang="scss">
.headerContainer {
  height: 60px;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;

  .sideContainer {
    width: 84px;
  }

  .iconBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .cartButton {
    position: relative;

    .cartCount {
      position: absolute;
      top: -7px;
      right: -7px;
      color: white;
      font-size: 6px;
      display: inline-block;
      text-align: center;
      width: 18px;
      height: 18px;
      line-height: 13px;
      background: #4f9dac;
      border: 2px solid #f7f7f7;
      border-radius: 50%;
      box-sizing: border-box;
      padding-top: 1px;
    }
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
    cursor: pointer;
  }

  .headerCartIcon {
    width: 33px;
    height: 29px;
  }

  .userIcon {
    width: 24px;
    height: 25px;
  }

  @media (min-width: 768px) {
    .menuIcon {
      display: none;
    }
  }
}
</style>
