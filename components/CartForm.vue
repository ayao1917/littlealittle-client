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
            class="formField"
            placeholder="*收件人姓名 請填寫真實姓名"
            type="text"
          />
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm100">
          <select v-model="formData.title" class="formField">
            <option
              v-for="option in genderOptions"
              :key="option.key"
              :value="option.value"
            >
              {{ option.key }}
            </option>
          </select>
        </div>
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <input
            v-model="formData.mobile"
            class="formField"
            placeholder="*手機號碼"
            type="text"
          />
        </div>
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <input
            v-model="formData.email"
            class="formField"
            placeholder="電子信箱"
            type="text"
          />
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm50">
          <select
            v-model="formData.city"
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
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm50">
          <select v-model="formData.district" class="formField">
            <option
              v-for="option in districtOptions"
              :key="option.name"
              :value="option.name"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <input
            v-model="formData.address"
            class="formField"
            placeholder="*街道地址"
            type="text"
          />
        </div>
      </div>
      <div class="userInfoContainer">
        <span>送貨及付款方式</span>
      </div>
      <div class="gridRow">
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <select v-model="formData.deliveryType" class="formField">
            <option
              v-for="option in deliveryOptions"
              :key="option.key"
              :value="option.value"
            >
              {{ option.key }}
            </option>
          </select>
        </div>
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <select v-model="formData.paymentMethod" class="formField">
            <option
              v-for="option in paymentOptions"
              :key="option.key"
              :value="option.value"
            >
              {{ option.key }}
            </option>
          </select>
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm100">
          <div class="formCheck">
            <input
              v-model="donate"
              class="formCheckInput"
              type="radio"
              :value="0"
              @change="onChangeDonate"
            />
            <label class="formCheckLabel">
              捐贈發票
            </label>
          </div>
        </div>
        <div class="gridColumn gridColumnMd75 gridColumnSm100">
          <input
            v-model="donateValue"
            :disabled="donate === 1"
            class="formField"
            placeholder="指定單位(可不填)預設捐贈「流浪貓保護協會」"
            type="text"
          />
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm100">
          <div class="formCheck">
            <input
              v-model="donate"
              class="formCheckInput"
              type="radio"
              :value="1"
              @change="onChangeDonate"
            />
            <label class="formCheckLabel">
              不捐贈發票
            </label>
          </div>
        </div>
        <div class="gridColumn gridColumnMd25 gridColumnSm100">
          <select v-if="donate === 1" v-model="donateType" class="formField">
            <option
              v-for="option in invoiceOptions"
              :key="option.key"
              :value="option.value"
            >
              {{ option.key }}
            </option>
          </select>
        </div>
        <div class="gridColumn gridColumnMd50 gridColumnSm100">
          <input
            v-if="donate === 1 && donateType !== 1"
            v-model="donateValue"
            class="formField"
            placeholder="請輸入數值"
            type="text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  CITY_OPTIONS,
  DELIVERY_OPTIONS,
  GENDER_OPTIONS,
  INVOICE_OPTIONS,
  PAYMENT_OPTIONS,
} from "~/constants/form";

export default Vue.extend({
  name: "CartForm",
  data() {
    return {
      cityOptions: CITY_OPTIONS,
      deliveryOptions: DELIVERY_OPTIONS,
      districtOptions: CITY_OPTIONS[0].area,
      donate: 0,
      donateType: 1,
      donateValue: "",
      formData: {
        address: "",
        city: "",
        deliveryType: 1,
        district: "",
        email: "",
        mobile: "",
        name: "",
        paymentMethod: 1,
        title: 0,
      },
      genderOptions: GENDER_OPTIONS,
      invoiceOptions: INVOICE_OPTIONS,
      paymentOptions: PAYMENT_OPTIONS,
    };
  },
  mounted(): void {
    this.formData.city = this.cityOptions[0].name;
    this.formData.district = this.districtOptions[0].name;
  },
  methods: {
    onChangeDonate() {
      this.donateValue = "";
    },
    onSelectCity() {
      const selectedCityOption = CITY_OPTIONS.find(
        (option) => option.name === this.formData.city,
      );
      this.districtOptions = selectedCityOption ? selectedCityOption.area : [];
      this.formData.district = this.districtOptions[0].name;
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
</style>
