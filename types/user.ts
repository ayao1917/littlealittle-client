export interface User {
  id: string;
  name: string;
}

export interface ActionLoginPayload {
  provider: string;
  code: string;
  state: string;
}

export interface ActionLoginResponse {
  status: number;
  msg: string;
  result: {
    user: User;
    token: string;
  };
}
