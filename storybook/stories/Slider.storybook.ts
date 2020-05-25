import { storiesOf } from "@storybook/vue";

import Slider from "../../components/Slider.vue";

const banners = [
  {
    createdAt: "",
    description: "Description1",
    id: 1,
    link: "",
    picUrl: "//i.huffpost.com/gen/2930708/images/o-GMO-ORANGES-facebook.jpg",
    sort: 1,
    title: "Tittle1",
    updatedAt: "",
  },
  {
    createdAt: "",
    description: "Description2",
    id: 2,
    link: "",
    picUrl:
      "//blogs.kcrw.com/goodfood/wp-content/uploads/2013/05/watermelon.jpeg",
    sort: 2,
    title: "Tittle2",
    updatedAt: "",
  },
  {
    createdAt: "",
    description: "Description3",
    id: 3,
    link: "",
    picUrl:
      "//lghttp.32478.nexcesscdn.net/80E972/organiclifestylemagazine/wp-content/uploads/2013/09/Blueberries-.jpg",
    sort: 3,
    title: "Tittle3",
    updatedAt: "",
  },
  {
    createdAt: "",
    description: "Description4",
    id: 4,
    link: "",
    picUrl:
      "//upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Limes.jpg/1200px-Limes.jpg",
    sort: 4,
    title: "Tittle4",
    updatedAt: "",
  },
];

storiesOf("Slider", module).add("Default", () => ({
  components: { Slider },
  props: {
    banners: {
      default: () => banners,
    },
  },
  template:
    '<div><Slider :banners="banners" style="width: 500px; height: 300px" /></div>',
}));

storiesOf("Slider", module).add("Timer", () => ({
  components: { Slider },
  props: {
    banners: {
      default: () => banners,
    },
  },
  template:
    '<div><Slider auto :banners="banners" style="width: 500px; height: 300px" /></div>',
}));
