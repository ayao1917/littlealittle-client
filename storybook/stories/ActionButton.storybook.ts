import { storiesOf } from "@storybook/vue";

import ActionButton from "../../components/ActionButton.vue";

const actionsData = {
  onClick: () => {},
};

storiesOf("ActionButton", module).add("Pure", () => ({
  components: { ActionButton },
  methods: actionsData,
  template:
    '<div><ActionButton @onClick="onClick">Button text</ActionButton></div>',
}));

storiesOf("ActionButton", module).add("ContainedTeal", () => ({
  components: { ActionButton },
  methods: actionsData,
  template:
    '<div><ActionButton @onClick="onClick" buttonStyle="containedTeal">Button text</ActionButton></div>',
}));

storiesOf("ActionButton", module).add("ContainedUrbanGrey", () => ({
  components: { ActionButton },
  methods: actionsData,
  template:
    '<div><ActionButton @onClick="onClick" buttonStyle="containedUrbanGrey">Button text</ActionButton></div>',
}));

storiesOf("ActionButton", module).add("OutlineTeal", () => ({
  components: { ActionButton },
  methods: actionsData,
  template:
    '<div><ActionButton @onClick="onClick" buttonStyle="outlineTeal">Button text</ActionButton></div>',
}));

storiesOf("ActionButton", module).add("OutlineUrbanGrey", () => ({
  components: { ActionButton },
  methods: actionsData,
  template:
    '<div><ActionButton @onClick="onClick" buttonStyle="outlineUrbanGrey">Button text</ActionButton></div>',
}));
