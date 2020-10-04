export interface Info {
  about: string;
  shoppingTerms: string;
  policy: string;
}

export interface ActionGetInfoResponse {
  status: number;
  msg: string;
  result: Info;
}
