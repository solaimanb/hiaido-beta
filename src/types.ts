// TODO: update later
export interface MemberAccount {
  email: string;
  firstName: string;
  lastName: string;
  account_status: string;
  account_id: string;
  timestamp: string;
}

export type Model = 0 | 1;

export type Query = string;

export interface Chat {
  query: string;
  response: string;
  loading: boolean;
  error?: string;
}

export interface IDBchats {
  email: string;
  chats: Chat[];
}
