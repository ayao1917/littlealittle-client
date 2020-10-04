<template>
  <div v-if="banners.length > 0" ref="slider" class="outerSlider">
    <div
      ref="innerSlider"
      :style="{ width: `${$innerSliderWidth}` }"
      class="innerSlider"
    >
      <div
        v-for="banner in banners"
        :key="banner.id"
        :style="{
          backgroundImage: `url(${banner.picUrl})`,
          width: `${$sliderWidth}`,
        }"
        class="slideContent"
        @click="
          () => {
            onClickLink(banner.link);
          }
        "
      >
        <span class="sliderTitle">{{ banner.title }}</span>
      </div>
    </div>
    <div class="controlBar leftControl">
      <img
        class="arrowIconDesktop"
        src="../assets/images/circleLeft.svg"
        @click="onClickLeft"
      />
      <img
        class="arrowIconMobile"
        src="../assets/images/arrowLeft.svg"
        @click="onClickLeft"
      />
    </div>
    <div class="controlBar rightControl">
      <img
        class="arrowIconDesktop"
        src="../assets/images/circleRight.svg"
        @click="onClickRight"
      />
      <img
        class="arrowIconMobile"
        src="../assets/images/arrowRight.svg"
        @click="onClickRight"
      />
    </div>
    <div class="dotsWrapper">
      <li
        v-for="(_, index) in banners"
        :key="index"
        :class="{ active: index === position }"
        @click="
          () => {
            onClickSwitch(index);
          }
        "
      ></li>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Banner } from "~/types/banner";

export default Vue.extend({
  name: "Slider",
  props: {
    auto: {
      default: false,
      required: false,
      type: Boolean,
    },
    banners: {
      required: true,
      type: Array as PropType<Banner[]>,
    },
    reverse: {
      default: false,
      required: false,
      type: Boolean,
    },
    timer: {
      default: 1,
      required: false,
      type: Number,
    },
  },
  data() {
    return {
      position: 0,
      timerInstance: 0,
    };
  },
  computed: {
    $innerSliderWidth(): string {
      return this.banners.length > 0 ? `${100 * this.banners.length}%` : "100%";
    },
    $sliderWidth(): string {
      return this.banners.length > 0 ? `${100 / this.banners.length}%` : "100%";
    },
  },
  mounted(): void {
    if (this.auto) {
      this.timerInstance = window.setInterval(
        this.reverse ? this.onClickLeft : this.onClickRight,
        this.timer * 1000,
      );
    }
  },
  beforeDestroy(): void {
    clearInterval(this.timerInstance);
  },
  methods: {
    changeSlider(): void {
      const refSlider = this.$refs.slider as HTMLElement;
      const refInnerSlider = this.$refs.innerSlider as HTMLElement;
      refInnerSlider.style.left = `-${this.position * refSlider.clientWidth}px`;
    },
    onClickLeft(): void {
      this.position =
        this.position > 0 ? this.position - 1 : this.banners.length - 1;
      this.changeSlider();
    },
    onClickLink(link: string): void {
      window.open(link);
    },
    onClickRight(): void {
      this.position =
        this.position < this.banners.length - 1 ? this.position + 1 : 0;
      this.changeSlider();
    },
    onClickSwitch(index: number): void {
      this.position = index;
      this.changeSlider();
    },
  },
});
</script>

<style scoped lang="scss">
.outerSlider {
  position: relative;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  overflow: hidden;

  .innerSlider {
    position: absolute;
    left: 0;
    display: flex;
    transition: left 0.5s;
    height: 100%;

    .slideContent {
      float: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position-x: center;
      background-color: #e6e6e6;
      height: 100%;

      .sliderTitle {
        font-size: 20px;
        text-shadow: 2px 2px #e6e6e6;
      }
    }
  }

  .controlBar {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    z-index: 1;

    .arrowIconDesktop {
      width: 76px;
      height: 76px;
      cursor: pointer;
    }

    .arrowIconMobile {
      width: 10px;
      height: 21px;
      cursor: pointer;
      margin: 0 8px;
    }

    @media (min-width: 768px) {
      .arrowIconMobile {
        display: none;
      }
    }

    @media (max-width: 767px) {
      .arrowIconDesktop {
        display: none;
      }
    }
  }

  .leftControl {
    float: left;
    margin-left: 4px;
  }

  .rightControl {
    float: right;
  }

  .dotsWrapper {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;

    li {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-color: #808080;
      border-radius: 50%;
      margin: 0 4px;
      opacity: 0.5;
      cursor: pointer;
      transition: opacity 0.3s;

      &.active,
      &:hover {
        opacity: 1;
      }
    }

    @media (max-width: 767px) {
      li {
        background-color: #e6e6e6;

        &.active {
          background-color: #808080;
        }

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
