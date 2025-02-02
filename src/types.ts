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
  alias: string;
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
  BASIC = 0,
  GENERAL_PURPOSE = 1,
  ADVANCED = 2,
  CLAUDE_HAIKU = 3,
  CLAUDE_SONNET = 4,
  GPT_4O_MINI = 5,
  GPT_4O = 6,
}

export enum Plan {
  PLAYGROUND = "PLAYGROUND",
  STARTER = "STARTER",
  ELITE = "ELITE",
}

export interface Subscription {
  email: string;
  activated_at: string;
  created_at: string;
  hosted_page_id: string;
  item_price_id: string;
  payment_source_id: string;
  plan: "PLAYGROUND" | "STARTER" | "ELITE";
  subscription_id: string;
}
