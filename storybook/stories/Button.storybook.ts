import { storiesOf } from "@storybook/vue";

import ActionButton from "../../cds/ActionButton.vue";

const actionsData = {
  onClick: () => {},
};

storiesOf("ActionButton", module).add("pure", () => ({
  components: { ActionButton },
  methods: actionsData,
  template:
    '<div><ActionButton :onClick="onClick">Button text</ActionButton></div>',
}));

storiesOf("ActionButton", module).add("containedTeal", () => ({
  components: { ActionButton },
  methods: actionsData,
  template:
    '<div><ActionButton :onClick="onClick" buttonStyle="containedTeal">Button text</ActionButton></div>',
}));

storiesOf("ActionButton", module).add("containedUrbanGrey", () => ({
  components: { ActionButton },
  methods: actionsData,
  template:
    '<div><ActionButton :onClick="onClick" buttonStyle="containedUrbanGrey">Button text</ActionButton></div>',
}));

storiesOf("ActionButton", module).add("outlineTeal", () => ({
  components: { ActionButton },
  methods: actionsData,
  template:
    '<div><ActionButton :onClick="onClick" buttonStyle="outlineTeal">Button text</ActionButton></div>',
}));

storiesOf("ActionButton", module).add("outlineUrbanGrey", () => ({
  components: { ActionButton },
  methods: actionsData,
  template:
    '<div><ActionButton :onClick="onClick" buttonStyle="outlineUrbanGrey">Button text</ActionButton></div>',
}));
