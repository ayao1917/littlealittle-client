import { CartForm, CartPlan } from "~/types/cart";

export interface OrderForm extends CartForm {
  details: CartPlan[];
}

export interface ActionCreateOrderPayload {
  callback: () => void;
  data: OrderForm;
}
