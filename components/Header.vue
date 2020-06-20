<template>
  <div>
    <div class="container">
      <div class="iconBox sideContainer">
        <img
          class="menuIcon"
          src="~assets/images/menu.svg"
          @click="onClickMenu"
        />
      </div>
      <div class="iconBox" @click="onClickLogo">
        <IconLogo size="s" />
      </div>
      <div class="rightContainer sideContainer">
        <div class="iconBox">
          <ActionButton @onClick="onClickCart">
            <img class="headerCartIcon" src="~assets/images/cart.svg" />
          </ActionButton>
        </div>
        <div class="iconBox">
          <ActionButton @onClick="onClickUser">
            <img class="userIcon" src="~assets/images/user.svg" />
          </ActionButton>
        </div>
      </div>
    </div>
    <HeaderMenuModal />
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
  computed: {},
  methods: {
    onClickCart() {},
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
.container {
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
