import { CartPlan, CartProduct, CountGroup, SelectedPlan } from "~/types/cart";
import { Plan, PlanListDetail } from "~/types/plan";

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

export const primaryPlan = (plan: Plan): PlanListDetail[] => {
  return plan.planDetails.filter((planDetail) => planDetail.isPrimary);
};

export const accessoryPlan = (plan: Plan): PlanListDetail[] => {
  return plan.planDetails.filter((planDetail) => !planDetail.isPrimary);
};

export const totalPrimaryAmount = (selectedPrimary: CountGroup): number => {
  return Object.keys(selectedPrimary).reduce(
    (a, c) => a + selectedPrimary[c],
    0,
  );
};

export const totalAccessoryAmount = (selectedAccessory: CountGroup): number => {
  return Object.keys(selectedAccessory).reduce(
    (a, c) => a + selectedAccessory[c],
    0,
  );
};

export const targetPrimaryQuantity = (plan: Plan): number => {
  const { primaryItemQuantity } = plan;
  if (primaryItemQuantity > 1) {
    return primaryItemQuantity;
  } else {
    return 0;
  }
};

export const targetAccessoryQuantity = (
  plan: Plan,
  selectedPrimary: CountGroup,
): number => {
  const {
    accessoryQuantity,
    accessorySyncQuantity,
    primaryItemQuantity,
  } = plan;
  if (accessoryQuantity === -1) {
    return (
      (totalPrimaryAmount(selectedPrimary) / primaryItemQuantity) *
      accessorySyncQuantity
    );
  } else if (accessoryQuantity > 1) {
    return accessoryQuantity;
  } else {
    return 0;
  }
};

export const isValidPrimary = (
  plan: Plan,
  selectedPrimary: CountGroup,
): boolean => {
  const { primaryItemQuantity } = plan;
  if (primaryItemQuantity === 1) {
    return true;
  } else {
    return (
      totalPrimaryAmount(selectedPrimary) % targetPrimaryQuantity(plan) === 0
    );
  }
};

export const isValidAccessory = (
  plan: Plan,
  selectedPrimary: CountGroup,
  selectedAccessory: CountGroup,
): boolean => {
  const { accessoryQuantity } = plan;
  if (accessoryQuantity === -1 || accessoryQuantity === 1) {
    return (
      totalAccessoryAmount(selectedAccessory) %
        targetAccessoryQuantity(plan, selectedPrimary) ===
      0
    );
  } else {
    return true;
  }
};

export const isValidSelect = (
  plan: Plan,
  selectedPrimary: CountGroup,
  selectedAccessory: CountGroup,
): boolean => {
  return (
    isValidPrimary(plan, selectedPrimary) &&
    isValidAccessory(plan, selectedPrimary, selectedAccessory)
  );
};

export const totalPrimaryFee = (
  plan: Plan,
  selectedPrimary: CountGroup,
): number => {
  const { primaryItemPrice, primaryItemQuantity } = plan;
  const planDetails = primaryPlan(plan);
  const planDetailPrice = planDetails.length > 0 ? planDetails[0].price : 0;
  if (primaryItemQuantity === 1) {
    return planDetailPrice * totalPrimaryAmount(selectedPrimary);
  } else if (primaryItemQuantity > 1) {
    return (
      primaryItemPrice *
      (totalPrimaryAmount(selectedPrimary) / primaryItemQuantity)
    );
  } else {
    return 0;
  }
};

export const totalAccessoryFee = (
  plan: Plan,
  selectedPrimary: CountGroup,
  selectedAccessory: CountGroup,
): number => {
  const { accessoryPrice, accessoryQuantity } = plan;
  const planDetails = accessoryPlan(plan);
  const planDetailPrice = planDetails.length > 0 ? planDetails[0].price : 0;
  if (accessoryQuantity === -1) {
    return planDetailPrice * targetAccessoryQuantity(plan, selectedPrimary);
  } else if (accessoryQuantity === 0) {
    return 0;
  } else if (accessoryQuantity === 1) {
    return planDetailPrice * totalAccessoryAmount(selectedAccessory);
  } else {
    return (
      accessoryPrice *
      (totalAccessoryAmount(selectedAccessory) / accessoryQuantity)
    );
  }
};

export const selectedAmount = (
  plan: Plan,
  selectedPrimary: CountGroup,
): number => {
  const { primaryItemQuantity } = plan;
  if (primaryItemQuantity === 1) {
    return totalPrimaryAmount(selectedPrimary);
  } else if (primaryItemQuantity > 1) {
    return totalPrimaryAmount(selectedPrimary) / primaryItemQuantity;
  } else {
    return 0;
  }
};

export const totalPlanFee = (
  plan: Plan,
  selectedPrimary: CountGroup,
  selectedAccessory: CountGroup,
): number => {
  return (
    totalPrimaryFee(plan, selectedPrimary) +
    totalAccessoryFee(plan, selectedPrimary, selectedAccessory)
  );
};

export const totalProductFee = (cartProduct: CartProduct): number => {
  return Object.keys(cartProduct.selectedPlans).reduce((acc, key) => {
    const selectedPlan = cartProduct.selectedPlans[key];
    const { plan, selectedPrimary, selectedAccessory } = selectedPlan;
    return acc + totalPlanFee(plan, selectedPrimary, selectedAccessory);
  }, 0);
};

export const createCartPlanData = (
  cartProducts: Record<string, CartProduct>,
) => {
  // TODO: simplify this logic
  let plans: CartPlan[] = [];
  Object.keys(cartProducts).forEach((salePageId) => {
    Object.keys(cartProducts[salePageId].selectedPlans).forEach((id) => {
      const { selectedAccessory, selectedPrimary } = cartProducts[
        salePageId
      ].selectedPlans[id];
      const details = Object.keys(selectedPrimary)
        .filter((goodsId) => selectedPrimary[goodsId] > 0)
        .map((goodsId) => {
          return {
            goodsId: parseInt(goodsId, 10),
            quantity: selectedPrimary[goodsId],
          };
        });
      const accessories = Object.keys(selectedAccessory)
        .filter((goodsId) => selectedAccessory[goodsId] > 0)
        .map((goodsId) => {
          return {
            goodsId: parseInt(goodsId, 10),
            quantity: selectedAccessory[goodsId],
          };
        });

      if (accessories.length > 0 || details.length > 0) {
        plans = [
          ...plans,
          {
            accessories,
            details,
            id: parseInt(id, 10),
            type: 0,
          },
        ];
      }
    });
  });

  return plans;
};

export const mergeCartProduct = (
  products: Record<string, CartProduct>,
  cartProducts: Record<string, CartProduct>,
) => {
  // TODO: simplify this logic
  Object.keys(cartProducts).forEach((salePageId) => {
    if (!products[salePageId]) {
      products[salePageId] = cartProducts[salePageId];
    } else {
      Object.keys(cartProducts[salePageId].selectedPlans).forEach((id) => {
        if (!products[salePageId].selectedPlans[id]) {
          products[salePageId].selectedPlans[id] =
            cartProducts[salePageId].selectedPlans[id];
        } else {
          Object.keys(
            cartProducts[salePageId].selectedPlans[id].selectedAccessory,
          ).forEach((key) => {
            if (
              !products[salePageId].selectedPlans[id].selectedAccessory[key]
            ) {
              products[salePageId].selectedPlans[id].selectedAccessory[key] = 0;
            }

            products[salePageId].selectedPlans[id].selectedAccessory[key] +=
              cartProducts[salePageId].selectedPlans[id].selectedAccessory[key];
          });
          Object.keys(
            cartProducts[salePageId].selectedPlans[id].selectedPrimary,
          ).forEach((key) => {
            if (!products[salePageId].selectedPlans[id].selectedPrimary[key]) {
              products[salePageId].selectedPlans[id].selectedPrimary[key] = 0;
            }

            products[salePageId].selectedPlans[id].selectedPrimary[key] +=
              cartProducts[salePageId].selectedPlans[id].selectedPrimary[key];
          });
        }
      });
    }
  });
  return products;
};
