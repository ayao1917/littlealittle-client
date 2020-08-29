<template>
  <div>
    <div class="userInfoContainer">
      <span>填寫訂購人資料</span>
    </div>
    <div class="cartForm">
      <div class="gridRow">
        <div class="gridColumn gridColumnMd75 gridColumnSm100">
          <input
            v-model="formData.name"
            :class="{ isInvalid: !!errors.name }"
            class="formField"
            placeholder="*收件人姓名 請填寫真實姓名"
            type="text"
          />
          <div v-if="errors.name" class="invalidFeedback">
            {{ errors.name }}
          </div>
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm100">
          <select
            v-model="formData.title"
            :class="{ isInvalid: !!errors.title }"
            class="formField"
          >
            <option
              v-for="option in genderOptions"
              :key="option.key"
              :value="option.value"
            >
              {{ option.key }}
            </option>
          </select>
          <div v-if="errors.title" class="invalidFeedback">
            {{ errors.title }}
          </div>
        </div>
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <input
            v-model="formData.mobile"
            :class="{ isInvalid: !!errors.mobile }"
            class="formField"
            placeholder="*手機號碼"
            type="text"
          />
          <div v-if="errors.mobile" class="invalidFeedback">
            {{ errors.mobile }}
          </div>
        </div>
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <input
            v-model="formData.email"
            :class="{ isInvalid: !!errors.email }"
            class="formField"
            placeholder="電子信箱"
            type="text"
          />
          <div v-if="errors.email" class="invalidFeedback">
            {{ errors.email }}
          </div>
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm50">
          <select
            v-model="formData.city"
            :class="{ isInvalid: !!errors.city }"
            class="formField"
            @change="onSelectCity"
          >
            <option
              v-for="option in cityOptions"
              :key="option.name"
              :value="option.name"
            >
              {{ option.name }}
            </option>
          </select>
          <div v-if="errors.city" class="invalidFeedback">
            {{ errors.city }}
          </div>
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm50">
          <select
            v-model="formData.district"
            :class="{ isInvalid: !!errors.district }"
            class="formField"
          >
            <option
              v-for="option in districtOptions"
              :key="option.name"
              :value="option.name"
            >
              {{ option.name }}
            </option>
          </select>
          <div v-if="errors.district" class="invalidFeedback">
            {{ errors.district }}
          </div>
        </div>
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <input
            v-model="formData.address"
            :class="{ isInvalid: !!errors.address }"
            class="formField"
            placeholder="*街道地址"
            type="text"
          />
          <div v-if="errors.address" class="invalidFeedback">
            {{ errors.address }}
          </div>
        </div>
      </div>
      <div class="userInfoContainer">
        <span>送貨及付款方式</span>
      </div>
      <div class="gridRow">
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <select
            v-model="formData.deliveryType"
            :class="{ isInvalid: !!errors.deliveryType }"
            class="formField"
          >
            <option
              v-for="option in deliveryOptions"
              :key="option.key"
              :value="option.value"
            >
              {{ option.key }}
            </option>
          </select>
          <div v-if="errors.deliveryType" class="invalidFeedback">
            {{ errors.deliveryType }}
          </div>
        </div>
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <select
            v-model="formData.paymentMethod"
            :class="{ isInvalid: !!errors.paymentMethod }"
            class="formField"
          >
            <option
              v-for="option in paymentOptions"
              :key="option.key"
              :value="option.value"
            >
              {{ option.key }}
            </option>
          </select>
          <div v-if="errors.paymentMethod" class="invalidFeedback">
            {{ errors.paymentMethod }}
          </div>
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm100">
          <div class="formCheck">
            <input
              v-model="formData.isDonate"
              class="formCheckInput"
              type="radio"
              :value="1"
              @change="onChangeDonate"
            />
            <label class="formCheckLabel">
              捐贈發票
            </label>
          </div>
        </div>
        <div class="gridColumn gridColumnMd75 gridColumnSm100">
          <input
            v-model="formData.donateValue"
            :disabled="formData.isDonate === 0"
            :class="{ isInvalid: !!errors.donateValue }"
            class="formField"
            placeholder="指定單位(可不填)預設捐贈「流浪貓保護協會」"
            type="text"
          />
          <div v-if="errors.donateValue" class="invalidFeedback">
            {{ errors.donateValue }}
          </div>
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm100">
          <div class="formCheck">
            <input
              v-model="formData.isDonate"
              class="formCheckInput"
              type="radio"
              :value="0"
              @change="onChangeDonate"
            />
            <label class="formCheckLabel">
              不捐贈發票
            </label>
          </div>
        </div>
        <div
          v-if="formData.isDonate === 0"
          class="gridColumn gridColumnMd25 gridColumnSm100"
        >
          <select
            v-model="formData.invoiceType"
            :class="{ isInvalid: !!errors.invoiceType }"
            class="formField"
          >
            <option
              v-for="option in invoiceOptions"
              :key="option.key"
              :value="option.value"
            >
              {{ option.key }}
            </option>
          </select>
          <div v-if="errors.invoiceType" class="invalidFeedback">
            {{ errors.invoiceType }}
          </div>
        </div>
        <div
          v-if="formData.isDonate === 0 && formData.invoiceType !== 1"
          class="gridColumn gridColumnMd50 gridColumnSm100"
        >
          <input
            v-model="formData.invoiceValue"
            :class="{ isInvalid: !!errors.invoiceValue }"
            class="formField"
            placeholder="請輸入數值"
            type="text"
          />
          <div v-if="errors.invoiceValue" class="invalidFeedback">
            {{ errors.invoiceValue }}
          </div>
        </div>
        <div class="gridColumn gridColumnMd100 gridColumnSm100">
          <textarea
            v-model="formData.note"
            class="formField"
            placeholder="備註"
            rows="3"
          ></textarea>
        </div>
      </div>
      <CartFeeSummary></CartFeeSummary>
      <div class="userTerms">
        <div class="formCheck">
          <input
            v-model="userTermsCheck"
            class="formCheckInput"
            type="checkbox"
          />
          <label class="formCheckLabel">
            同意遵守使用者條款
          </label>
        </div>
        <div
          v-if="errors.userTermsCheck"
          class="invalidFeedback userTermsCheckError"
        >
          {{ errors.userTermsCheck }}
        </div>
      </div>
      <ActionButton
        class="submitButton"
        buttonStyle="containedTeal"
        :disabled="$canSubmit"
        @onClick="onSubmitForm"
      >
        送出訂單
      </ActionButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ActionButton from "~/components/ActionButton.vue";
import CartFeeSummary from "~/components/CartFeeSummary.vue";
import { INVOICE_TYPE } from "~/constants";
import {
  CITY_OPTIONS,
  DELIVERY_OPTIONS,
  GENDER_OPTIONS,
  INVOICE_OPTIONS,
  PAYMENT_OPTIONS,
} from "~/constants/form";
import { FormError } from "~/types/cart";
import { OrderForm } from "~/types/order";

export default Vue.extend({
  name: "CartForm",
  components: {
    ActionButton,
    CartFeeSummary,
  },
  data() {
    return {
      cityOptions: CITY_OPTIONS,
      deliveryOptions: DELIVERY_OPTIONS,
      districtOptions: CITY_OPTIONS[0].area,
      errors: {
        address: null,
        city: null,
        deliveryType: null,
        district: null,
        donateValue: null,
        email: null,
        invoiceType: null,
        invoiceValue: null,
        mobile: null,
        name: null,
        paymentMethod: null,
        title: null,
      } as FormError,
      formData: {
        address: "",
        city: "",
        deliveryType: 1,
        district: "",
        donateValue: "",
        email: "",
        invoiceType: 1,
        invoiceValue: "",
        isDonate: 1,
        mobile: "",
        name: "",
        note: "",
        paymentMethod: 1,
        title: 0,
      },
      genderOptions: GENDER_OPTIONS,
      invoiceOptions: INVOICE_OPTIONS,
      paymentOptions: PAYMENT_OPTIONS,
      userTermsCheck: false,
    };
  },
  computed: {
    $canSubmit(): boolean {
      return this.$store.getters["order/orderCreatePending"];
    },
  },
  mounted(): void {
    this.formData.city = this.cityOptions[0].name;
    this.formData.district = this.districtOptions[0].name;
  },
  methods: {
    onChangeDonate() {
      this.formData.invoiceValue = "";
    },
    onSelectCity() {
      const selectedCityOption = CITY_OPTIONS.find(
        (option) => option.name === this.formData.city,
      );
      this.districtOptions = selectedCityOption ? selectedCityOption.area : [];
      this.formData.district = this.districtOptions[0].name;
    },
    onSubmitForm() {
      const STORE = process.env.STORE;
      this.validateForm();
      const hasError = Object.values(this.errors).some(Boolean);
      if (hasError || !STORE) {
        return null;
      }
      const currencyId = this.$store.getters["cart/cartCurrency"];
      const cartPlans = this.$store.getters["cart/planFrom"];
      const cartAddPurchase = this.$store.getters["cart/addPurchaseForm"];

      const {
        address,
        city,
        deliveryType,
        district,
        email,
        invoiceType,
        invoiceValue,
        isDonate,
        mobile,
        name,
        note,
        paymentMethod,
        title,
      } = this.formData;
      const cartForm: OrderForm = {
        address: `${district}${address}`,
        area: city,
        country: "TWN",
        currencyId,
        deliveryType,
        details: [...cartPlans, ...cartAddPurchase],
        email,
        invoiceInfo: invoiceValue,
        invoiceType: isDonate === 1 ? 0 : invoiceType,
        mobile,
        name,
        note,
        paymentMethod,
        storeId: parseInt(STORE),
        title,
      };
      this.$emit("onSubmitForm", cartForm);
    },
    validateForm() {
      const {
        address,
        city,
        deliveryType,
        district,
        donateValue,
        invoiceType,
        invoiceValue,
        isDonate,
        mobile,
        name,
        paymentMethod,
        title,
      } = this.formData;
      const namePattern = new RegExp("[%~=!?]");
      const phonePattern = new RegExp("^09[0-9]{8}$");
      const addressPattern = new RegExp("[%~=!?]");
      const mobilePattern = /^\/([0-9]|[A-Z]|\+|-){7,8}$/;
      const naturePattern = /^[A-Z]{2}[0-9]{14}$/;
      const unitPattern = /^[X]?\d{3,9}$/;
      this.errors = {
        address: null,
        city: null,
        deliveryType: null,
        district: null,
        donateValue: null,
        email: null,
        invoiceType: null,
        invoiceValue: null,
        mobile: null,
        name: null,
        paymentMethod: null,
        title: null,
        userTermsCheck: null,
      };

      if (!address) {
        this.errors.address = "請輸入地址";
      } else if (addressPattern.test(address)) {
        this.errors.address = "地址不得含特殊字元%~=!?";
      }

      if (!city) {
        this.errors.city = "請選擇縣市";
      }

      if (!deliveryType) {
        this.errors.deliveryType = "請選擇送貨方式";
      }

      if (!district) {
        this.errors.district = "請選擇縣市區";
      }

      if (!mobile) {
        this.errors.mobile = "請輸入電話";
      } else if (!phonePattern.test(mobile)) {
        this.errors.mobile = "電話需為09開頭，並為10個數字所組成";
      }

      if (!name) {
        this.errors.name = "請輸入姓名";
      } else if (namePattern.test(name)) {
        this.errors.name = "名字不得含特殊字元%~=!?";
      }

      if (!paymentMethod) {
        this.errors.paymentMethod = "請選擇付款方式";
      }

      if (title == null) {
        this.errors.title = "請選擇稱謂";
      }

      if (isDonate === 1 && donateValue && !unitPattern.test(donateValue)) {
        this.errors.donateValue = "捐贈發票格式錯誤";
      }

      if (isDonate === 0 && !invoiceType) {
        this.errors.invoiceType = "請選擇發票類型";
      }

      if (isDonate === 0) {
        if (invoiceType !== INVOICE_TYPE.EMAIL.key && !invoiceValue) {
          this.errors.invoiceValue = "請輸入數值";
        }

        if (
          invoiceType === INVOICE_TYPE.MOBILE.key &&
          !mobilePattern.test(invoiceValue)
        ) {
          this.errors.invoiceValue = "手機條碼格式錯誤";
        } else if (
          invoiceType === INVOICE_TYPE.NATURE.key &&
          !naturePattern.test(invoiceValue)
        ) {
          this.errors.invoiceValue = "自然人憑證格式錯誤";
        } else if (invoiceType === INVOICE_TYPE.UNIFORM.key) {
          this.errors.invoiceValue = this.validateUniform(invoiceValue);
        }
      }

      if (!this.userTermsCheck) {
        this.errors.userTermsCheck = "尚未同意使用者條款";
      }
    },
    validateUniform(input: string): null | string {
      const cc = (n: number) => {
        if (n > 9) {
          const s: string = `${n}`;
          const n1: number = parseInt(s.substring(0, 1));
          const n2: number = parseInt(s.substring(1, 2));
          n = n1 + n2;
        }
        return n;
      };

      const cx = [1, 2, 1, 2, 1, 2, 4, 1];
      let sum = 0;
      if (input.length !== 8) {
        return "統編錯誤，要有 8 個數字";
      }
      const cNum = input.split("");
      for (let i = 0; i <= 7; i++) {
        if (input.charCodeAt(0) < 48 || input.charCodeAt(0) > 57) {
          return "統編錯誤，要有 8 個 0-9 數字組合";
        }
        sum += cc(parseInt(cNum[i]) * cx[i]);
      }
      if (sum % 10 === 0) {
        return null;
      } else if (cNum[6] === "7" && (sum + 1) % 10 === 0) {
        return `統一編號：${input} 正確!`;
      } else {
        return `統一編號：${input} 錯誤!`;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .userInfoContainer {
    display: flex;
    justify-content: center;
    padding: 32px;

    span {
      font-size: 21px;
      font-weight: 500;
    }
  }

  .cartForm {
    margin-bottom: 20px;

    .userTerms {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .submitButton {
      width: 100%;
      margin: 12px 0;
      padding: 12px 0;
      font-size: 21px;
      font-weight: 500;
    }
  }
}

@media (max-width: 767px) {
  .userInfoContainer {
    display: flex;
    justify-content: center;
    padding: 13px;

    span {
      font-size: 21px;
      font-weight: 500;
    }
  }

  .cartForm {
    margin-bottom: 20px;

    .userTerms {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .submitButton {
      width: 100%;
      margin: 12px 0;
      padding: 12px 0;
      font-size: 21px;
      font-weight: 500;
    }
  }
}

.gridRow {
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;

  .gridColumn {
    flex-basis: 0;
    flex-grow: 1;
    min-width: 0;
    max-width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  @media (min-width: 768px) {
    .gridColumnMd100 {
      flex: 0 0 100%;
      max-width: 100%;
    }

    .gridColumnMd75 {
      flex: 0 0 75%;
      max-width: 75%;
    }

    .gridColumnMd50 {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .gridColumnMd25 {
      flex: 0 0 25%;
      max-width: 25%;
    }
  }

  @media (max-width: 767px) {
    .gridColumnSm100 {
      flex: 0 0 100%;
      max-width: 100%;
    }

    .gridColumnSm75 {
      flex: 0 0 75%;
      max-width: 75%;
    }

    .gridColumnSm50 {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .gridColumnSm25 {
      flex: 0 0 25%;
      max-width: 25%;
    }
  }
}

.formField {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-sizing: border-box;
}

.formCheck {
  position: relative;
  display: block;
  padding: 0.375rem 1.25rem;

  .formCheckInput {
    position: absolute;
    margin-top: 0.3rem;
    margin-left: -1.25rem;
  }

  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  .formCheckLabel {
    margin-bottom: 0;
  }
}

.isInvalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("../assets/images/invalid.svg");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.invalidFeedback {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

.userTermsCheckError {
  text-align: center;
}
</style>
