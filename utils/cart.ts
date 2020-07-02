import { SelectedPlan } from "~/types/cart";
import { Plan } from "~/types/plan";

interface Coordinate {
  x: number;
  y: number;
}

export const addToCartAnimate = (
  picUrl: string,
  position: Coordinate,
  callback?: Function,
) => {
  const cart = document.querySelectorAll("img.headerCartIcon")[0];
  const node = document.createElement("img");
  node.src = picUrl;
  const styles = {
    /* eslint-disable vue/sort-keys */
    opacity: "0.5",
    position: "fixed",
    top: `${position.y}px`,
    left: `${position.x}px`,
    height: "120px",
    width: "120px",
    "z-index": "10000",
    /* eslint-enable vue/sort-keys */
  };
  Object.assign(node.style, styles);
  document.body.appendChild(node);

  const posCart = cart.getBoundingClientRect() as ClientRect;
  const posNode = node.getBoundingClientRect() as ClientRect;
  const moveX = posCart.left - posNode.left;
  const moveY = posCart.top - posNode.top;
  const animate = node.animate(
    [
      { transform: "translate(0, 0)" },
      {
        transform: `translate(${moveX - 40}px, ${moveY - 40}px) scale(0.1)`,
      },
    ],
    {
      duration: 1000,
      easing: "ease-in-out",
    },
  );
  animate.onfinish = () => {
    document.body.removeChild(node);
    if (callback) {
      callback();
    }
  };
};

export const initSelectedPlans = (plan: Plan): SelectedPlan => {
  const primary = plan.planDetails.filter((planDetail) => planDetail.isPrimary);
  const accessory = plan.planDetails.filter(
    (planDetail) => !planDetail.isPrimary,
  );
  const selectedPrimary: { [key: string]: number } = {};
  const selectedAccessory: { [key: string]: number } = {};
  primary.forEach((planDetail) => {
    selectedPrimary[planDetail.goodsId] = 0;
  });
  accessory.forEach((planDetail) => {
    selectedAccessory[planDetail.goodsId] = 0;
  });
  return {
    plan,
    selectedAccessory,
    selectedPrimary,
  };
};
