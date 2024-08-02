import { ConnectedAccount, ManagedMemberAccount } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isManagedMemberAccount(obj: any): obj is ManagedMemberAccount {
  return obj;
}

function isConnectedAccount(obj: any): obj is ConnectedAccount {
  return obj;
}
