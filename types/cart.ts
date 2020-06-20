export interface CartPlan {
  id: number;
  type: 0 | 1;
  details: CartPlanDetail[];
  accessories: CartPlanDetail[];
}

export interface CartPlanDetail {
  goodsId: number;
  quantity: number;
}

export interface CartForm {
  memberId: string;
  name: string;
  title: number;
  mobile: string;
  country: string;
  address: string;
  email: string;
  deliveryType: number;
  paymentMethod: number;
  invoiceType: number;
  invoiceInfo: string;
  note: string;
  storeId: number;
  currencyId: number;
}

export interface SelectedPlan {
  id: number;
  selectedPrimary: CountGroup;
  selectedAccessory: CountGroup;
}

export interface SelectedPlans {
  [key: string]: SelectedPlan;
}

export interface CountGroup {
  [key: string]: number;
}
