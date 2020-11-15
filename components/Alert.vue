<template>
  <div class="alertContainer" :class="$alertType">
    <div class="alertBox">
      <span class="alertTitle">{{ $alertTitle }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Alert",
  computed: {
    $alertTitle(): string {
      return this.$store.getters["alert/alertTitle"];
    },
    $alertType(): { [key: string]: boolean } {
      const alertType = this.$store.getters["alert/alertType"];
      const isShowAlert = this.$store.getters["alert/isShowAlert"];
      return {
        active: isShowAlert,
        backgroundError: alertType === "error",
        backgroundInfo: alertType === "info",
        backgroundSuccess: alertType === "success",
        backgroundWarning: alertType === "warning",
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.alertContainer {
  position: fixed;
  top: 0;
  width: 100%;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  border-radius: 8px;
  box-sizing: border-box;
  z-index: 1;
  animation-name: fadeOut;
  animation-duration: 2s;
}

.active {
  display: flex;
  animation-name: fadeIn;
  animation-duration: 2s;
}

.alertBox {
  display: flex;
  padding-right: 16px;
  margin: 8px 0;
}

.alertTitle {
  margin-bottom: 4px;
}

.backgroundError {
  background: #ffd4d7;
}

.backgroundInfo {
  background: #d2e4f7;
}

.backgroundSuccess {
  background: #cce9e4;
}

.backgroundWarning {
  background: #edcaec;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(startYposition);
  }
  100% {
    opacity: 1;
    transform: translateY(endYposition);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(startYposition);
  }
  100% {
    opacity: 0;
    transform: translateY(endYposition);
  }
}
</style>
