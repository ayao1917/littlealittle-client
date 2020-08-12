<template>
  <div>
    <div class="cartHeaderRow bottomLine">
      <p>訂單編號 {{ $orderId }}</p>
      <p>訂單金額 4660元</p>
    </div>
    <div class="cartHeaderRow">
      <p>填寫信用卡資料</p>
    </div>
    <div class="formContainer">
      <iframe
        id="hitrustIframe"
        ref="hitrustIframe"
        class="hitrustIframe"
        :src="iframeSource"
      ></iframe>
      <ActionButton
        class="submitButton"
        buttonStyle="containedTeal"
        :diabled="submitDisabled"
        @onClick="onSubmitPayment"
      >
        確認付款
      </ActionButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";

interface FollowPayResponse {
  status: string;
  ordernumber: string;
  followPayToken: string;
}

interface FollowError {
  code: string;
}

interface FormObject {
  [key: string]: number | string;
}

export default Vue.extend({
  name: "CartPayment",
  components: {
    ActionButton,
  },
  data() {
    return {
      followPayToken: (null as unknown) as string,
      iframeSource: "",
      submitDisabled: false,
    };
  },
  computed: {
    $orderId(): string {
      return this.$store.getters["order/createdOrderId"];
    },
    $orderPrice(): string {
      return this.$store.getters["order/createdOrderPrice"];
    },
  },
  mounted(): void {
    window.addEventListener("message", this.handleMessage);
    this.doFolllowPay();
  },
  methods: {
    doFolllowPay() {
      const SERVER_URL = process.env.SERVER_URL;
      const SITE_URL = process.env.SITE_URL;
      const PAYMENT_CARD_STORE_ID = process.env.PAYMENT_CARD_STORE_ID;
      const params: FormObject = {
        Type: "FOLLOW_PAY",
        amount: `${this.$orderPrice}`,
        depositflag: "0",
        e03: "0",
        // e04: null,
        // e55: null,
        // e56: null,
        // e57: null,
        // e58: null,
        merUpdateURL: `${SERVER_URL}/admin/orders/${this.$orderId}/authResult`,
        orderdesc: `${this.$orderId}`,
        ordernumber: `${this.$orderId}`,
        queryflag: "1",
        returnURL: `${SITE_URL}/cart/complete`,
        storeid: `${PAYMENT_CARD_STORE_ID}`,
      };

      const formBody: string[] = [];
      Object.keys(params).forEach((key) => {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(`${params[key]}`);
        formBody.push(`${encodedKey}=${encodedValue}`);
      });

      fetch("https://testtrustlink.hitrust.com.tw/TrustLink/TrxReqForJava", {
        body: formBody.join("&"),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        method: "POST",
      })
        .then((response: Response) => response.json())
        .then((data) => {
          if (data.status === "success" && this.$orderId === data.ordernumber) {
            this.followPayToken = data.followPayToken;
            this.iframeSource = data.followPayToken;
          }
        })
        .catch((error: FollowError) => {
          console.log(error);
        });
    },
    handleMessage(event: MessageEvent) {
      if (event.data === "btn_open") {
        this.submitDisabled = false;
      } else if (event.data === "btn_close") {
        this.submitDisabled = true;
      }
    },
    onSubmitPayment() {
      const postData = {
        event: "hitrustpay",
        followPayToken: this.followPayToken,
      };
      const isIFrame = (
        input: HTMLElement | null,
      ): input is HTMLIFrameElement =>
        input !== null && input.tagName === "IFRAME";
      const iframeElement = document.getElementById("hitrustIframe");

      if (isIFrame(iframeElement) && iframeElement.contentWindow) {
        iframeElement.contentWindow.postMessage(JSON.stringify(postData), "*");
      }
    },
  },
});
</script>

<style scoped lang="scss">
.cartHeaderRow {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;

  p {
    font-size: 19px;
    font-weight: 400;
  }

  p:not(:last-child) {
    margin-bottom: 4px;
  }
}

.bottomLine {
  border-bottom: 1px solid #e6e6e6;
}

.formContainer {
  display: flex;
  flex-direction: column;
  max-width: 768px;
  padding: 0 12px;
  margin: 0 auto;

  .hitrustIframe {
    width: 100%;
  }

  .submitButton {
    max-width: 100%;
    width: 386px;
    margin: 12px auto;
    padding: 12px 0;
    font-size: 21px;
    font-weight: 500;
  }
}
</style>
