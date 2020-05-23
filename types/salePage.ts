import { Currency } from "~/types/currency";
import { Plan } from "~/types/plan";

export interface SalePage {
  id: number;
  name: string;
  picUrl: string;
  alias: string;
  metaDescription: string;
  metaKeywords: string;
  payments: string;
  content: string;
  currency: Currency;
  plans: Plan[];
}

export interface ActionGetFavoritesPayload {
  branchId: number;
}

export interface ActionGetFavoritesResponse {
  status: number;
  msg: string;
  result: {
    salePages: SalePage;
  };
}

export interface ActionPostFavoritesPayload {
  branchId: number;
  salePageId: number;
}

export interface ActionPostFavoritesResponse {
  status: number;
  msg: string;
  result: string;
}
