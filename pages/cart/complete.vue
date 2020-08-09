<template>
  <div>
    <div class="cartHeader">
      <CartProgress class="cartProgress" currentProgress="3"></CartProgress>
    </div>
    <div class="rowContainer bottomLine">
      <div>
        <p class="completeText">感謝您的購買！</p>
        <p class="completeText">我們將盡快為您出貨！</p>
      </div>
    </div>
    <div class="rowContainer bottomLine">
      <div>
        <span class="orderText">訂單編號</span>
        <span class="orderText">{{ orderId }}</span>
      </div>
    </div>
    <div class="rowContainer">
      <p class="orderHint">*小提醒：記下訂單編號以便查詢出貨進度</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CartProgress from "~/components/CartProgress.vue";

export default Vue.extend({
  name: "CartComplete",
  components: {
    CartProgress,
  },
  data() {
    return {
      orderId: (null as unknown) as string,
      orderPrice: (null as unknown) as string,
      type: (null as unknown) as string,
    };
  },
  computed: {},
  mounted() {
    this.type = `${this.$route.query.type}`;
    if (this.type === "Auth") {
      const retcode = this.$route.query.retcode;
      if (retcode === "00") {
        this.orderId = `${this.$route.query.ordernumber}`;
        this.orderPrice = `${this.$route.query.amount}`;
      } else {
        alert("付款失敗");
      }
    } else {
      this.orderId = this.$store.getters["order/createdOrderId"];
      this.orderPrice = `${this.$store.getters["order/createdOrderPrice"]}`;
    }
  },
});
</script>

<style scoped lang="scss">
@media (min-width: 768px) {
  .cartHeader {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    height: 100px;

    .cartProgress {
      width: 768px;
    }
  }

  .rowContainer {
    display: flex;
    justify-content: center;
    max-width: 768px;
    padding: 55px 0;
    margin: 0 auto;

    .completeText {
      color: #333333;
      font-size: 28px;
      font-weight: 500;
      text-align: center;
    }

    .orderText {
      color: #333333;
      font-size: 23px;
      font-weight: 400;
    }

    .orderHint {
      color: #666666;
      font-size: 18px;
      font-weight: 400;
    }
  }
}

@media (max-width: 767px) {
  .cartHeader {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
    padding: 12px 24px;

    .cartProgress {
      width: 100%;
    }
  }

  .rowContainer {
    display: flex;
    justify-content: center;
    max-width: 768px;
    padding: 35px 0;
    margin: 0 auto;

    .completeText {
      color: #333333;
      font-size: 21px;
      font-weight: 500;
    }

    .orderText {
      color: #333333;
      font-size: 19px;
      font-weight: 400;
    }

    .orderHint {
      color: #666666;
      font-size: 18px;
      font-weight: 400;
    }
  }
}

.bottomLine {
  border-bottom: 1px solid #e6e6e6;
}
</style>
