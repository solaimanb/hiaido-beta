import { MemberAccount } from "@/types";
import {
  FetchUserAttributesOutput,
  fetchAuthSession,
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
  const [error, setError] = useState<string | null>(null);

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

  const fetchMemberAccounts: () => Promise<MemberAccount[]> = async () => {
    // console.log("FETCHING MEMBER ACCOUNTS");

    try {
      let url =
        "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/member-accounts";
      const result = await fetchAuthSession();
      // TODO: does not work for google and facebook
      // TODO: fix
      const idToken = result.tokens?.idToken?.toString();
      // console.log(result);
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const response_json = await response.json();
      // console.log(response_json);
      if (response.ok) {
        return response_json;
      } else {
        throw response_json;
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchMemberAccounts()
      .then((res) => {
        setMemberAccounts(res);
        let cma = localStorage.getItem("current_member_account");
        if (cma) {
          let cmaObj: MemberAccount = JSON.parse(cma);
          if (
            res?.length > 0 &&
            res.some((val) => val.email === cmaObj.email)
          ) {
            setCurrentMemberAccount(cmaObj);
          } else {
            setCurrentMemberAccount(res?.length > 0 ? res[0] : null);
          }
        } else {
          setCurrentMemberAccount(res?.length > 0 ? res[0] : null);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
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
