<template>
  <div>
    <MenuBarDesktop class="menuBar" />
    <div class="breadcrumb">
      <nuxt-link to="/">首頁</nuxt-link>
      <div class="breadcrumbLevel">></div>
      <nuxt-link to="about">
        關於一點
      </nuxt-link>
    </div>
    <div class="infoContainer">
      <h2>關於一點</h2>
      <div v-if="$info && $info.about" v-html="$info.about" />
      <div v-if="!$info || !$info.about" class="emptyContainer">
        <p class="emptyText">尚無內容</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MenuBarDesktop from "~/components/MenuBarDesktop.vue";
import { Info } from "~/types/info";

export default Vue.extend({
  name: "About",
  components: {
    MenuBarDesktop,
  },
  computed: {
    $info(): Info {
      return this.$store.getters["info/info"];
    },
  },
  mounted(): void {
    this.$store.dispatch("info/getInfo");
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .categoryMobile {
    display: none;
  }

  .breadcrumb {
    display: flex;
    max-width: 768px;
    border-bottom: 1px solid #e6e6e6;
    padding: 27px 0 26px;
    margin: 0 auto;

    a {
      color: #333333;
      text-decoration: none;
      font-size: 23px;
      font-weight: 600;
    }

    .breadcrumbLevel {
      margin: 0 8px;
    }
  }

  .infoContainer {
    max-width: 768px;
    margin: 48px auto;

    .emptyContainer {
      padding: 40px 8px;

      .emptyText {
        font-size: 23px;
        font-weight: 500;
      }
    }

    h2 {
      display: none;
    }
  }
}

@media (max-width: 767px) {
  .menuBar {
    display: none;
  }

  .breadcrumb {
    display: none;
  }

  .infoContainer {
    padding: 8px 20px;

    .emptyContainer {
      .emptyText {
        color: #808080;
        font-size: 17px;
        font-weight: 500;
      }
    }

    h2 {
      margin-bottom: 12px;
      text-align: center;
      color: #808080;
      font-size: 21px;
      font-weight: 500;
    }

    div {
      padding: 40px 8px;
      background-color: #f2f2f2;
    }
  }
}
</style>
