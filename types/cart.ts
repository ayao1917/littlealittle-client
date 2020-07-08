import { Plan } from "~/types/plan";
import { SalePage } from "~/types/salePage";

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
  area: string;
  email: string;
  deliveryType: number;
  paymentMethod: number;
  invoiceType: number;
  invoiceInfo: string;
  note: string;
  storeId: number;
  currencyId: number;
}

export interface FormData {
  address: string;
  city: string;
  deliveryType: number;
  district: string;
  donateType: number;
  donateValue: string;
  email: string;
  isDonate: number;
  mobile: string;
  name: string;
  paymentMethod: number;
  title: number;
}

export interface FormError {
  address: string | null;
  city: string | null;
  deliveryType: string | null;
  district: string | null;
  donateValue: string | null;
  email: string | null;
  invoiceType: string | null;
  invoiceValue: string | null;
  mobile: string | null;
  name: string | null;
  paymentMethod: string | null;
  title: string | null;
}

export interface CountGroup {
  [key: string]: number;
}

export interface SelectedPlan {
  plan: Plan;
  selectedPrimary: CountGroup;
  selectedAccessory: CountGroup;
}

export interface CartProduct {
  salePage: SalePage;
  selectedPlans: {
    [key: string]: SelectedPlan;
  };
}
