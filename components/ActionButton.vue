<template>
  <button
    :class="[$classObject, 'buttonContainer']"
    class="buttonDefault"
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
  name: "ActionButton",
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
    onButtonClick(event: MouseEvent) {
      this.$emit("onClick", event);
    },
  },
});
</script>

<style scoped lang="scss">
.buttonDefault {
  outline: none;
}

.buttonContainer {
  border-radius: 10px;
  cursor: pointer;
}

.buttonContainer:focus {
  outline: none;
}

.buttonContainedTeal {
  background-color: #4f9eac;
  border-style: none;
  color: #e6e6e6;
}

.buttonContainedTeal:disabled {
  background-color: #dbdada;
  color: #ffffff;
}

.buttonContainedUrbanGrey {
  background-color: #e6e6e6;
  border-style: none;
  color: #808080;
}

.buttonContainedUrbanGrey:disabled {
  background-color: #dbdada;
  color: #ffffff;
}

.buttonOutlineTeal {
  background-color: #ffffff;
  border: solid 1px #4f9eac;
  color: #4f9eac;
}

.buttonOutlineTeal:disabled {
  background-color: #dbdada;
  color: #ffffff;
}

.buttonOutlineUrbanGrey {
  border: solid 1px #e6e6e6;
  color: #808080;
}

.buttonOutlineUrbanGrey:disabled {
  background-color: #dbdada;
  color: #ffffff;
}

.buttonPure {
  background-color: #ffffff;
  border-style: none;
}
</style>
