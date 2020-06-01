export interface Banner {
  id: number;
  picUrl: string;
  link: string;
  title: string;
  description: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActionGetBannersResponse {
  status: number;
  msg: string;
  result: {
    count: number;
    sliders: Banner[];
  };
}
