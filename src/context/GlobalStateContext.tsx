import { MemberAccount } from "@/types";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

interface GlobalStateContextType {
  memberAccounts: MemberAccount[] | null;
  setMemberAccounts: React.Dispatch<
    React.SetStateAction<MemberAccount[] | null>
  >;
  currentMemberAccount: MemberAccount | null;
  setCurrentMemberAccount: React.Dispatch<
    React.SetStateAction<MemberAccount | null>
  >;
}
export const GlobalStateContext = createContext<GlobalStateContextType>({
  memberAccounts: null,
  setMemberAccounts: () => {},
  currentMemberAccount: null,
  setCurrentMemberAccount: () => {},
});

export const GlobalStateProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [memberAccounts, setMemberAccounts] = useState<MemberAccount[] | null>(
    null
  );
  const [currentMemberAccount, setCurrentMemberAccount] =
    useState<MemberAccount | null>(null);

  return (
    <GlobalStateContext.Provider
      value={{
        memberAccounts,
        setMemberAccounts,
        currentMemberAccount,
        setCurrentMemberAccount,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
