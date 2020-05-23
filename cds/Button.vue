<template>
  <button
    :class="[$classObject, 'buttonContainer']"
    :disabled="disabled"
    :type="buttonType"
    @click="onButtonClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

type ButtonStyle =
  | "pure"
  | "containedTeal"
  | "containedUrbanGrey"
  | "outlineTeal"
  | "outlineUrbanGrey";
type ButtonType = "button" | "submit";

export default Vue.extend({
  name: "Button",
  props: {
    buttonStyle: {
      default: "pure",
      required: false,
      type: String as PropType<ButtonStyle>,
    },
    buttonType: {
      default: "button",
      required: false,
      type: String as PropType<ButtonType>,
    },
    disabled: {
      default: false,
      required: false,
      type: Boolean,
    },
    onClick: {
      required: true,
      type: Function as PropType<() => void>,
    },
  },
  computed: {
    $classObject(): Object {
      return {
        buttonContainedTeal: this.buttonStyle === "containedTeal",
        buttonContainedUrbanGrey: this.buttonStyle === "containedUrbanGrey",
        buttonOutlineTeal: this.buttonStyle === "outlineTeal",
        buttonOutlineUrbanGrey: this.buttonStyle === "outlineUrbanGrey",
        buttonPure: this.buttonStyle === "pure",
      };
    },
  },
  methods: {
    onButtonClick() {
      this.onClick();
    },
  },
});
</script>

<style scoped lang="scss">
.buttonContainer {
  border-radius: 4px;
  cursor: pointer;
}

.buttonContainer:focus {
  outline: none;
}

.buttonContainedTeal {
  background-color: #4f9eac;
  color: #e6e6e6;
}

.buttonContainedUrbanGrey {
  background-color: #e6e6e6;
  color: #808080;
}

.buttonOutlineTeal {
  border-color: #4f9eac;
  color: #e6e6e6;
}

.buttonOutlineUrbanGrey {
  border-color: #e6e6e6;
  color: #808080;
}

.buttonPure {
  background-color: #ffffff;
  border-style: none;
}
</style>
