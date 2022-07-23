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
  price: number;
  discount: number;
  plans: Plan[];
}

export interface AddPurchase {
  id: number;
  name: string;
  picUrl: string;
  title: string;
  goodsId: string;
  price: number;
  salePicUrl: string;
  sort: number;
}

export interface ActionGetAddPurchasesResponse {
  status: number;
  msg: string;
  result: {
    addPurchases: AddPurchase[];
  };
}

export interface ActionGetSalePageResponse {
  status: number;
  msg: string;
  result: {
    salePage: SalePage;
  };
}

export interface ActionGetSalePagePayload {
  alias: string;
}

export interface ActionGetSalePagesResponse {
  status: number;
  msg: string;
  result: {
    salePages: SalePage[];
  };
}

export interface ActionGetSalePagesPayload {
  category: string | null;
  random: number | null;
  type?: "Default" | "NewItems" | "RecentPriceOff" | "TopTen";
}

export interface ActionGetFavoritesResponse {
  status: number;
  msg: string;
  result: {
    salePages: SalePage;
  };
}

export interface ActionPostFavoritesPayload {
  salePageId: number;
}

export interface ActionPostFavoritesResponse {
  status: number;
  msg: string;
  result: string;
}

export interface ActionDeleteFavoritesPayload {
  salePageId: number;
}
