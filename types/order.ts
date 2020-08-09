import { CartForm, CartPlan } from "~/types/cart";

export interface OrderForm extends CartForm {
  details: CartPlan[];
}

export interface ActionCreateOrderPayload {
  callback: () => void;
  data: OrderForm;
}

export interface ActionCreateOrderResponse {
  status: number;
  msg: string;
  result: {
    orderNo: string;
    price: number;
  };
}
