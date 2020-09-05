export interface Category {
  id: number;
  name: string;
  sort: number;
  alias: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface ActionGetCategoriesResponse {
  status: number;
  msg: string;
  result: {
    categories: Category[];
  };
}

export interface ActionGetCategoryPayload {
  categoryId: number;
}

export interface ActionGetCategoryResponse {
  status: number;
  msg: string;
  result: {
    category: Category;
  };
}
