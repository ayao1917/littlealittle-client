<template>
  <div class="footerContainer">
    <div class="footerContent">
      <div class="footerRow">
        <p class="blackHeader">關於我們</p>
        <nuxt-link class="blackContent" to="/about">關於一點</nuxt-link>
        <nuxt-link class="blackContent" to="/policy">隱私權政策</nuxt-link>
        <nuxt-link class="blackContent" to="/shoppingTerms">服務條款</nuxt-link>
      </div>
      <div class="footerRow">
        <p class="blackHeader">聯絡我們</p>
        <p class="blackContent">(02)2578-1285</p>
        <p class="blackContent">台北市松山區八德路三段186-1號2F</p>
      </div>
      <!--
      <div class="footerRow">
        <p class="blackHeader">自助查詢</p>
        <p class="blackContent">訂單查詢</p>
        <p class="blackContent">配送進度查詢</p>
      </div>
      <div class="footerRow">
        <p class="blackHeader">顧客服務</p>
        <p class="blackContent">退換貨說明</p>
        <p class="blackContent">客服中心</p>
      </div>
      -->
    </div>
    <div class="copyrightContainer">
      <span>
        Copyright © 2016 - 2020, Littlealittle Co. Ltd., All Rights Reserved
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer",
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .footerContainer {
    position: relative;
    background-color: #e6e6e6;
    width: 100%;
    padding: 40px 0;

    .footerContent {
      display: flex;
      justify-content: space-between;
      max-width: 768px;
      margin: 0 auto;
      padding-bottom: 40px;

      .footerRow {
        display: flex;
        flex-direction: column;

        .blackHeader {
          color: #333333;
          font-size: 23px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .blackContent {
          color: #808080;
          font-size: 19px;
          font-weight: 400;
          margin-bottom: 8px;
          text-decoration: none;
        }
      }
    }

    .copyrightContainer {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: solid 1px #e2e2e2;
      display: flex;
      justify-content: center;
      padding: 24px 0 12px;
    }
  }
}
</style>
