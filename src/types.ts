// TODO: update later
export interface MemberAccount {
  email: string;
  firstName: string;
  lastName: string;
  account_status: string;
  account_id: string;
  timestamp: string;
}

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

export enum Model {
  BASE = 0,
  MULTI_AGENT = 1,
  ADVANCED = 2,
  BASE_CLAUDE = 3,
}
