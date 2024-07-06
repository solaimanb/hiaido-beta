// TODO: update later
export interface ManagedMemberAccount {
  email: string;
  firstName: string;
  lastName: string;
  account_status: string;
  account_id: string;
  timestamp: string;
}

export interface ConnectedAccount {
  role_arn: string;
  owner: string;
  externalId: string;
  account_id: string;
  owner_id: string;
  timestamp: string;
}

export interface MemberAccounts {
  memberAccounts: ManagedMemberAccount[];
  connectedAccounts: ConnectedAccount[];
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
  // BASE = 0,
  // MULTI_AGENT = 1,
  // ADVANCED = 2,
  CLAUDE_HAIKU = 3,
  CLAUDE_SONNET = 4,
}
