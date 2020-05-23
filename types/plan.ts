export interface Plan {
  id: number;
  name: string;
  saleGroupId: number;
  freeShipping: boolean;
  extraPlan: number;
  primaryItemName: string;
  primaryItemQuantity: number;
  primaryItemPrice: number;
  accessoryName: string;
  accessorySyncQuantity: number;
  accessoryQuantity: number;
  accessoryPrice: number;
  createdAt: string;
  updatedAt: string;
  planDetails: PlanListDetail[];
  extraPlans: Plan[];
  primaryPlans: Plan[];
}

export interface PlanDetail {
  isPrimary: boolean;
  goodsNumber: string;
  price: number;
}

export interface PlanListDetailGood {
  id: number;
  goodsNumber: string;
  name: string;
}

export interface PlanListDetail {
  isPrimary: boolean;
  price: number;
  Good: PlanListDetailGood;
}
