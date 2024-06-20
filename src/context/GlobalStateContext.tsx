import { MemberAccount } from "@/types";
import {
  FetchUserAttributesOutput,
  fetchUserAttributes,
} from "aws-amplify/auth";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
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
  userAttributes: FetchUserAttributesOutput | null;
}
export const GlobalStateContext = createContext<GlobalStateContextType>({
  memberAccounts: null,
  setMemberAccounts: () => {},
  currentMemberAccount: null,
  setCurrentMemberAccount: () => {},
  userAttributes: null,
});

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      "useGlobalState must be used within an GlobalStateProvider"
    );
  }
  return context;
};

export const GlobalStateProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [memberAccounts, setMemberAccounts] = useState<MemberAccount[] | null>(
    null
  );
  const [currentMemberAccount, setCurrentMemberAccount] =
    useState<MemberAccount | null>(null);
  const [userAttributes, setUserAttributes] =
    useState<FetchUserAttributesOutput | null>(null);

  useEffect(() => {
    console.log("FETCH USER ATTRIBUTES");
    // TODO: add error if no email
    fetchUserAttributes()
      .then((res) => {
        console.log(res);
        setUserAttributes(res);
      })
      .catch((err) => {
        console.error(err);
      });

    // // just testing
    // fetchAuthSession()
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        memberAccounts,
        setMemberAccounts,
        currentMemberAccount,
        setCurrentMemberAccount,
        userAttributes,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
