// TODO: update later
export interface MemberAccount {
  email: string;
}

export type Model = 0 | 1;

export type Query = string;

export interface Chat {
  query: string;
  response: string;
  loading: boolean;
  error?: string;
}
