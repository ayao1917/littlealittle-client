<template>
  <div class="progressContainer">
    <template v-for="(node, index) in nodes">
      <div
        v-if="index !== 0"
        :key="node.progress"
        class="progressConnectorContainer"
      >
        <div
          v-if="index !== 0"
          :key="node.progress"
          class="progressConnector"
          :class="{ nodeActive: node.progress <= currentProgress }"
        ></div>
      </div>
      <div :key="node.progress" class="progressNode">
        <div
          class="progressNodeCircle"
          :class="{ nodeActive: node.progress <= currentProgress }"
        >
          {{ node.progress }}
        </div>
        <p>{{ node.title }}</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CartProgress",
  props: {
    currentProgress: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      nodes: [
        {
          progress: 1,
          title: "購物車",
        },
        {
          progress: 2,
          title: "填寫資料",
        },
        {
          progress: 3,
          title: "訂單完成",
        },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
.progressContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .progressNode {
    .progressNodeCircle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      margin: 8px auto;
      background-color: #cccccc;
      border-radius: 12px;
      color: #ffffff;
    }

    .nodeActive {
      background-color: #4f9eac;
    }

    @media (min-width: 768px) {
      p {
        width: 100px;
        text-align: center;
        font-size: 23px;
        font-weight: 500;
      }
    }

    @media (max-width: 767px) {
      p {
        width: 80px;
        text-align: center;
        font-size: 19px;
        font-weight: 500;
      }
    }
  }

  .progressConnectorContainer {
    width: 100%;

    @media (min-width: 768px) {
      .progressConnector {
        position: relative;
        display: block;
        top: -10px;
        left: -15%;
        width: 130%;
        height: 2px;
        background-color: #cccccc;
      }
    }

    @media (max-width: 767px) {
      .progressConnector {
        position: relative;
        display: block;
        top: -10px;
        left: -30%;
        width: 160%;
        height: 2px;
        background-color: #cccccc;
      }
    }

    .nodeActive {
      background-color: #4f9eac;
    }
  }
}
</style>
